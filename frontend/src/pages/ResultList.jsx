import React, { useEffect, useState } from "react";
import {
  ResultClipTray,
  ResultForm,
  DrawLots,
  RepresentativeQ,
  ResponseList,
} from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/ResultList.scss";
import { CloseCircleFilled } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { findFormByIdForOwnerQuery } from "../API/findFormByIdForOwnerQuery";

const FIND_FORM_BY_ID_FOR_OWNER_QUERY = findFormByIdForOwnerQuery;

let listItem_temp = [
  {
    key: "1",
    answer: "사나",
    order: 1,
    favorite: true,
  },
  {
    key: "2",
    answer: "지효",
    order: 2,
    favorite: true,
  },
  {
    key: "3",
    answer: "나연",
    order: 3,
    favorite: false,
  },
  {
    key: "4",
    answer: "모모",
    order: 4,
    favorite: true,
  },
];

function ResultList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState("");
  const [selectedRespNo, setSelectedResp] = useState(-1);
  const [repQ, setRepQ] = useState("");
  const [repQCandi, setRepQCandi] = useState({});
  const [ansList, setAnsList] = useState([]); // [ {id1:ans1, id2:ans2, ...} ]
  const [repList, setRepList] = useState([]); // [ {key: order(str), answer: ans_of_repQ(str), order: order(num), favorite: isFav(bool)} ]
  const [secList, setSecList] = useState([]);
  const { loading, data, error } = useQuery(FIND_FORM_BY_ID_FOR_OWNER_QUERY, {
    variables: { formId: formId },
    onCompleted: (data) => {
      // when error occured
      if (!data.findFormByIdForOwner.ok) {
        alert(data.findFormByIdForOwner.error);
        // navigate("/my-survey");
        return;
      }

      // make data from DB data
      let formData = data.findFormByIdForOwner.form;

      // sections
      let sec = formData.sections;
      setSecList(sec);

      // representative question
      let repq = formData.representativeQuestion;
      setRepQ(repq ? repq : "");

      // representative question candidates dictionary <string, string>: <id, question content>
      let repQCandi_temp = {};
      for (let i = 0; i < sec.length; i++) {
        let que = sec[i].questions;
        for (let j = 0; j < que.length; j++) {
          if (que[j].kind !== "Opened") continue;
          repQCandi_temp[que[j]._id] = que[j].content;
        }
      }
      setRepQCandi(repQCandi_temp);

      // submissions-> ansList, respList
      // ansList: to show the answers of an submission in the right panel
      // respList: to show the list of submissions in the left panel
      let subm_orig = formData.submissions;
      let ansl = [];
      let repl = [];
      for (let i = 0; i < subm_orig.length; i++) {
        let ans = {};
        let rep = {};
        let ans_orig = subm_orig[i].answers;
        let repq_ans_str = "";
        for (let j = 0; j < ans_orig.length; j++) {
          ans[ans_orig[j]["question"]] = { ...ans_orig[j] };
          if (ans_orig[j]["question"] === repq) {
            repq_ans_str = ans_orig[j].openedAnswer;
          }
        }
        rep = {
          key: i + 1,
          answer: repq_ans_str ? repq_ans_str : "",
          order: i + 1,
          favorite: false, // TODO
        };
        ansl.push(ans);
        repl.push(rep);
      }
      setAnsList(ansl);
      setRepList(repl);
    },
  });

  const [drawLotsEnabled, setDrawLotsEnabled] = useState(false);
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const onSaveClick = () => {
    // save
  };

  const onFavChange = (respId) => () => {
    // do change the fav state (backend api?)
    if (!repList) return;
    let temp = repList.map((v) =>
      v.key !== respId
        ? v
        : {
            ...v,
            favorite: !v["favorite"],
          }
    );

    setRepList(temp);
  };
  if (loading) {
    return null;
  }
  return (
    <div className="result-list-con">
      <ResultClipTray type="list" formId={formId} />
      <div className="result-list-white-panel">
        <div className="result-list-left-con">
          <div className="result-list-con-title">
            <div>답변 목록</div>
            <div
              className="shuffle-btn"
              onClick={() => setDrawLotsEnabled(!drawLotsEnabled)}
            >
              답변 추첨 {drawLotsEnabled ? <CloseCircleFilled /> : null}
            </div>
          </div>
          {drawLotsEnabled ? (
            <DrawLots answers={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
          ) : null}
          <div className="repq-fav-save-btn" onClick={onSaveClick}>
            즐겨찾기 저장
          </div>
          <RepresentativeQ
            questions={repQCandi}
            // questions={{ 1: "asdf", 2: "qwer", 3: "aaaa" }}
            representative={repQ}
            setRepresentative={setRepQ}
          />
          {/* list */}
          <div className="result-list-list">
            <ResponseList
              listItems={repList}
              selected={selectedRespNo}
              onSelect={setSelectedResp}
              onFavChange={onFavChange}
            />
          </div>
        </div>

        {/* detail */}
        <div className="result-list-right-con">
          {selectedRespNo > 0 ? (
            <ResultForm
              sections={secList}
              answers={ansList[selectedRespNo - 1]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ResultList;
