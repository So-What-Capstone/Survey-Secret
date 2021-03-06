import React, { useEffect, useState } from "react";
import {
  ResultClipTray,
  ResultForm,
  DrawLots,
  RepresentativeQ,
  ResponseList,
} from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CloseCircleFilled } from "@ant-design/icons";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  editFormMutation,
  findFormByIdForOwnerQuery,
  setFavoriteSubmissionsMutation,
  findAnswerByQuestionIdQuery,
} from "../API";
import "../styles/ResultList.scss";
import { message, Spin } from "antd";

message.config({
  // 3 messages can be shown at once
  maxCount: 3,
});

function cutLongStr(str) {
  // cut the long string
  if (str.length > 20) return str.substr(0, 20);
  return str;
}

function getAnsItem(ans, kind) {
  let ansStr = "";
  if (kind === "Opened")
    ansStr = cutLongStr(String(ans?.openedAnswer ? ans?.openedAnswer : "-"));
  else if (kind === "Linear")
    ansStr = cutLongStr(String(ans?.linearAnswer ? ans?.linearAnswer : "-"));
  else if (kind === "Closed") {
    ansStr = ans?.closedAnswer;
    ansStr = ansStr ? ansStr : [];
    ansStr = ansStr.map((v) => v + 1);
  }
  ansStr = ansStr ? ansStr : "-";
  return ansStr;
}
function ResultList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState("");
  const [selectedRespNo, setSelectedResp] = useState(-1); // index of list
  const [repQ, setRepQ] = useState(""); // representataive question id
  const [repQCandi, setRepQCandi] = useState({}); //{questionId: content(str)}
  const [ansList, setAnsList] = useState([]); // [ {id1:ans1, id2:ans2, ...} ]
  const [repList, setRepList] = useState([]); // [ {key: order(str), answer: ans_of_repQ(str), order: order(num), favorite: isFav(bool), id: submission_id(str)} ]
  const [secList, setSecList] = useState([]);
  const { loading, data, error } = useQuery(findFormByIdForOwnerQuery, {
    variables: { formId: formId },
    onCompleted: (data) => {
      // when error occured
      if (!data.findFormByIdForOwner.ok || data.findFormByIdForOwner.error) {
        alert(data.findFormByIdForOwner.error);
        navigate("/my-survey");
        return;
      }

      // make data from DB data
      let formData = data.findFormByIdForOwner.form;

      // sections
      let sec = formData.sections;
      setSecList(sec);

      // representative question
      let repq = formData.representativeQuestion?._id;
      setRepQ(repq ? repq : "");

      // representative question candidates dictionary <string, string>: <id, question content>
      let repQCandi_temp = {};
      for (let i = 0; i < sec.length; i++) {
        let que = sec[i].questions;
        for (let j = 0; j < que.length; j++) {
          switch (que[j].kind) {
            case "Opened":
            case "Closed":
            case "Linear":
              repQCandi_temp[que[j]._id] = {
                content: que[j].content,
                kind: que[j].kind,
              };
              break;
          }
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
        let repq_ans_str = "-";
        for (let j = 0; j < ans_orig.length; j++) {
          ans[ans_orig[j]["question"]] = { ...ans_orig[j] };
          if (ans_orig[j]["question"] === repq) {
            repq_ans_str = getAnsItem(ans_orig[j], ans_orig[j].kind);
          }
        }
        rep = {
          key: i + 1,
          answer: repq_ans_str,
          order: i + 1,
          favorite: subm_orig[i].isFavorite,
          id: subm_orig[i]._id,
        };
        ansl.push(ans);
        repl.push(rep);
      }
      setAnsList(ansl);
      setRepList(repl);
    },
  });
  const [findAnswer] = useLazyQuery(findAnswerByQuestionIdQuery);
  const [editForm] = useMutation(editFormMutation);
  const [setFavSubm] = useMutation(setFavoriteSubmissionsMutation);

  const [drawLotsEnabled, setDrawLotsEnabled] = useState(false);
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const setFavForDrawing = async (favSubmissions) => {
    let input = {
      formId: formId,
      favoriteSubmissions: favSubmissions,
    };

    // send mutation
    let ret = await setFavSubm({ variables: input });
    const {
      setFavoriteSubmissions: { ok, error },
    } = ret.data;

    // if not ok, alert and return
    if (!ok || error) {
      message.error("???????????? ??????/?????? ??????????????????.");
      return false;
    }

    // else: ok, then change the change the repList
    message.success("???????????? ??????/?????? ??????????????????.");
    let temp = repList.slice();
    for (let i = 0; i < temp.length; i++) {
      temp[i].favorite = favSubmissions[i].isFavorite;
    }
    setRepList(temp);

    return true;
  };
  const onFavChange = (respIdx) => async () => {
    // do change the fav state (backend api?)
    if (!repList) return;
    let temp = repList.map((v) =>
      v.key !== respIdx
        ? v
        : {
            ...v,
            favorite: !v["favorite"],
          }
    );

    // get submission id
    const sub_id = temp[respIdx - 1].id;
    const fav_value = temp[respIdx - 1].favorite;

    let favSubmList = [{ submissionId: sub_id, isFavorite: fav_value }];

    // mutation to set favorite
    let ret = await setFavSubm({
      variables: {
        formId: formId,
        favoriteSubmissions: favSubmList,
      },
    });
    const {
      setFavoriteSubmissions: { ok, error },
    } = ret.data;

    if (!ok || error) {
      message.error("???????????? ??????/?????? ??????????????????.");
    } else {
      message.success("???????????? ??????/?????? ??????????????????.");
      setRepList(temp);
    }
  };
  const RepQChange = async (v) => {
    let mut_input = {
      formId: formId,
      representativeQuestionId: v,
    };
    let edit_ret = await editForm({
      variables: {
        request: mut_input,
      },
    });

    const {
      editForm: { ok, error },
    } = edit_ret.data;
    if (!ok || error) {
      alert("??????????????? ????????? ??? ????????????.");
      return;
    }
    setRepQ(v);
    let ans_ret = await findAnswer({
      variables: {
        formId: formId,
        questionId: v,
      },
    });

    let repQkind = repQCandi[v].kind;
    let temp = repList.slice();
    for (let i = 0; i < temp.length; i++) {
      let ansStr = getAnsItem(ansList[i][v], repQkind);

      temp[i] = {
        ...temp[i],
        answer: ansStr,
      };
    }
    setRepList(temp);
  };

  return (
    <div className="result-list-con">
      <ResultClipTray type="list" formId={formId} />
      <div className="result-list-white-panel">
        {!loading ? (
          <>
            <div className="result-list-left-con">
              <div className="result-list-con-title">
                <div>?????? ??????</div>
                <div
                  className="shuffle-btn"
                  onClick={() => setDrawLotsEnabled(!drawLotsEnabled)}
                >
                  ?????? ?????? {drawLotsEnabled ? <CloseCircleFilled /> : null}
                </div>
              </div>
              {drawLotsEnabled ? (
                <DrawLots answers={repList} setFav={setFavForDrawing} />
              ) : null}

              <RepresentativeQ
                questions={repQCandi}
                representative={repQ}
                setRepresentative={RepQChange}
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
          </>
        ) : (
          <div className="result-list-loading">
            <Spin size="large" tip="?????? ???????????? ???????????? ????????????!"></Spin>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultList;
