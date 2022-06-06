import React, { useState, useEffect, useCallback } from "react";
import "../styles/ContactList.scss";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@mui/material";
import {
  findRepsQueByFormId,
  findRepsAnsByQueId,
} from "../API/findRepresentativeQuery";
import { findQueById } from "../API/findQuestionByIdQuery";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ContentCutOutlined } from "@mui/icons-material";

const FIND_REPS_QUE_BY_FORM_ID = findRepsQueByFormId;
const FIND_REPS_ANS_BY_QUE_ID = findRepsAnsByQueId;
const FIND_QUE_BY_ID = findQueById;

TableItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checkedItemHandler: PropTypes.func,
  isAllChecked: PropTypes.bool,
  isFavoriteChecked: PropTypes.bool,
  isFavoriteCheckedList: PropTypes.array,
  bAllChecked: PropTypes.bool,
  setAllChecked: PropTypes.func,
  order: PropTypes.number,
};

function TableItem({
  id,
  name,
  checkedItemHandler,
  isAllChecked,
  isFavoriteChecked,
  isFavoriteCheckedList,
  bAllChecked,
  setAllChecked,
  order,
}) {
  //각 item 체크 여부
  const [bChecked, setChecked] = useState(false);

  //체크박스 눌렀을 때 해당 아이템을 체크리스트에 넣기/빼기
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    if (bAllChecked && bChecked) {
      setAllChecked(!bAllChecked);
    }
    checkedItemHandler(id, target.checked);
  };

  //isAllChecked가 true(전체체크박스에 체크되면)면 이 체크박스도 체크
  const allCheckHandler = useCallback(() => {
    setChecked(isAllChecked);
  }, [isAllChecked]);

  //isFavoriteCheckedList[order] 가 true면 이 체크박스도 체크
  const favoriteCheckHandler = useCallback(() => {
    if (isFavoriteCheckedList[order]) {
      setChecked(isFavoriteChecked);
    }
  }, [isFavoriteCheckedList, order, isFavoriteChecked]);

  //isAllChecked 값이 변하면 allCheckHandler 호출
  useEffect(() => allCheckHandler(), [isAllChecked, allCheckHandler]);

  //isFavoriteChecked 값이 변하면 favoriteCheckHandler 호출
  //isFavoriteChecked가 변경될 때 = 즐겨찾기 버튼 클릭시
  useEffect(
    () => favoriteCheckHandler(),
    [isFavoriteChecked, favoriteCheckHandler]
  );

  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
        className="item-check"
      />
      <label className="item-order">{order + 1}</label>
      <label className="item-name">{name}</label>
    </div>
  );
}

ContactList.propTypes = {
  forms: PropTypes.array,
  selectedForm: PropTypes.object,
  repsQuestionContent: PropTypes.string,
  checkedItems: PropTypes.object,
  phoneQueId: PropTypes.string,
  setPhoneQueId: PropTypes.func,
  emailQueId: PropTypes.string,
  setEmailQueId: PropTypes.func,
  setSelectedForm: PropTypes.func,
  setRepsQuestionContent: PropTypes.func,
  setCheckedItems: PropTypes.func,
};

/**
 * ContactList
 */
function ContactList({
  forms,
  selectedForm,
  repsQuestionContent,
  checkedItems,
  phoneQueId,
  setPhoneQueId,
  emailQueId,
  setEmailQueId,
  setSelectedForm,
  setRepsQuestionContent,
  setCheckedItems,
}) {
  const [findRepsQueByFormId, { data, loading, error }] = useLazyQuery(
    FIND_REPS_QUE_BY_FORM_ID
  );
  const [findQueById] = useLazyQuery(FIND_QUE_BY_ID);
  const [findRepsAnsByQueId] = useLazyQuery(FIND_REPS_ANS_BY_QUE_ID);

  const handleFormChange = async (event) => {
    const selectedId = event.target.value;
    let newForm = forms.find((form) => form.id === selectedId); //selectedForm 가 될 것(현재 id, title만 있음)

    console.log("form id:" + newForm.id);

    let repsQueId; //대표문항 id
    let repsQueType; //대표문항 type //Closed, Grid, Linear, Opened, Personal
    let repsQueContent; //대표문항 질문내용
    let receiverList; //submission id, isFavorite, answer(string)
    let answersArray; //submission id, isFavorite, answer(no)
    let questionDetailsArray; //

    //formId -> 대표문항 id, submission id+isFavorite
    await findRepsQueByFormId({
      variables: { formId: newForm.id },
      onCompleted: (data) => {
        //대표문항 id, 개인정보질문 id+type
        if (data?.findFormById?.form?.representativeQuestion !== null) {
          repsQueId = data?.findFormById?.form?.representativeQuestion?._id;
        } else {
          //대표문항이 없으면
          repsQueId = null;
        }
        console.log("repsQueId: " + repsQueId);

        //개인정보질문 있어야 ok -> 개인정보질문id
        let isPrivacyQueExist = false;
        data?.findFormById?.form?.sections?.map((s) => {
          s.questions.map((q, index) => {
            if (index > 0) {
              isPrivacyQueExist = true;

              //개인정보 파기기한 체크
              const yearMonDate = [
                data?.findFormById?.form?.privacyExpiredAt.substring(0, 4),
                data?.findFormById?.form?.privacyExpiredAt.substring(5, 7),
                data?.findFormById?.form?.privacyExpiredAt.substring(8, 10),
              ];

              const time = [
                data?.findFormById?.form?.privacyExpiredAt.substring(11, 13),
                data?.findFormById?.form?.privacyExpiredAt.substring(14, 16),
                data?.findFormById?.form?.privacyExpiredAt.substring(17, 19),
              ];

              let canContact = false;
              let today = new Date();
              let year = today.getFullYear();
              let month = ("0" + (today.getMonth() + 1)).slice(-2);
              let date = ("0" + today.getDate()).slice(-2);
              let hours = ("0" + today.getHours()).slice(-2);
              var minutes = ("0" + today.getMinutes()).slice(-2);
              var seconds = ("0" + today.getSeconds()).slice(-2);

              if (Number(year) < Number(yearMonDate[0])) {
                canContact = true;
              } else if (Number(month) < Number(yearMonDate[1])) {
                canContact = true;
                console.log(canContact);
              } else if (Number(date) < Number(yearMonDate[2])) {
                canContact = true;
                console.log(canContact);
              } else if (Number(hours) < Number(time[0])) {
                canContact = true;
                console.log(canContact);
              } else if (Number(minutes) < Number(time[1])) {
                canContact = true;
                console.log(canContact);
              } else if (Number(seconds) < Number(time[2])) {
                canContact = true;
                console.log(canContact);
              } else {
                //
              }

              if (!canContact) {
                alert("개인정보 파기기한이 지난 설문입니다.");
                console.log("개인정보 파기기한 지남");
              } else {
                if (q.personalType === "Phone") {
                  console.log("Phone");
                  setPhoneQueId(q._id);
                } else if (q.personalType === "Email") {
                  console.log("Email");
                  setEmailQueId(q._id);
                } else {
                  console.log("Address");
                }
              }
            }
          });
        });

        if (!isPrivacyQueExist) {
          console.log("개인정보 질문이 없다");
          setPhoneQueId("");
          setEmailQueId("");
        }
      },
    });

    //대표문항 id -> 대표문항 type, content
    //대표문항이 있으면
    if (repsQueId !== null) {
      console.log("대표문항이 있다"); //ok

      //때때로 실행이 안됨...
      await findQueById({
        variables: {
          formId: newForm.id,
          queId: repsQueId,
        },
        onCompleted: (data) => {
          console.log("대표문항 정보 가져오는 query completed");
          repsQueType = data?.findQuestionById?.question?.__typename;
          repsQueContent = data?.findQuestionById?.question?.content;

          console.log("대표문항 id: " + repsQueId);
          console.log("대표문항 type: " + repsQueType);
          console.log("대표문항 content: " + repsQueContent);
        },
      });

      setRepsQuestionContent(repsQueContent);

      //form id, 질문 id -> answers : {submission id, isFavorite, answer객체}, question
      switch (repsQueType) {
        case "ClosedQuestion":
          console.log("객관식");

          await findRepsAnsByQueId({
            variables: {
              formId: newForm.id,
              questionId: repsQueId,
            },
            onCompleted: (data) => {
              console.log("ans 가져오는 쿼리 completed");
              /* answersArray =
            [
              {
                submissionId
                isFavorite
                answer : {
                  closedAnswer: []
                }
              }
            ]
             */
              answersArray = data?.findAnswerByQuestionId?.answers;

              /* questionDetailsArray = question의 모든 선택지 내용
            [
              {
                "no": 1,
                "choice": "A"
              },
              {
                "no": 2,
                "choice": "B"
              }
            ] */
              questionDetailsArray =
                data?.findAnswerByQuestionId?.question.choices;
            },
          });

          /* receiverList =
        [
          {
            submissionId
            isFavorite
            answer : "선지내용, 선지내용"
            answerObject : answersArray의 answer객체
          }
        ]
        */

          receiverList = answersArray.map((a) => {
            let obj = {};
            obj["submissionId"] = a.submissionId;
            obj["isFavorite"] = a.isFavorite;
            obj["answer"] = "";
            a.answer.closedAnswer.map((f, index) => {
              //no가 f인 요소를 찾는다 -> 선지내용(string)
              if (index === 0) {
                obj["answer"] = questionDetailsArray.find(
                  (e) => e.no === f
                ).choice;
              } else {
                obj["answer"] =
                  obj["answer"] +
                  ", " +
                  questionDetailsArray.find((e) => e.no === f).choice;
              }
            });
            return obj;
          });

          break;
        case "OpenedQuestion":
          console.log("주관식");
          console.log(newForm.id);
          console.log(repsQueId);

          await findRepsAnsByQueId({
            variables: {
              formId: newForm.id,
              questionId: repsQueId,
            },
            onCompleted: (data) => {
              /* answersArray =
            [
              {
                submissionId
                isFavorite
                answer : {
                  openedAnswer: ""
                }
              }
            ]
             */
              console.log("ans 가져오는 쿼리 completed");
              answersArray = data?.findAnswerByQuestionId?.answers;
            },
          });

          /* receiverList =
        [
          {
            submissionId
            isFavorite
            answer : "주관식답안"
          }
        ]
        */

          receiverList = answersArray.map((a) => {
            let obj = {};
            obj["submissionId"] = a.submissionId;
            obj["isFavorite"] = a.isFavorite;
            obj["answer"] = a.answer.openedAnswer;
            return obj;
          });
          break;
        case "LinearQuestion":
          console.log("선형배율");

          await findRepsAnsByQueId({
            variables: {
              formId: newForm.id,
              questionId: repsQueId,
            },
            onCompleted: (data) => {
              console.log("ans 가져오는 쿼리 completed");
              /* answersArray =
            [
              {
                submissionId
                isFavorite
                answer : {
                  linearAnswer: float
                }
              }
            ]
             */
              answersArray = data?.findAnswerByQuestionId?.answers;

              /* questionDetailsArray = question의 모든 선택지 내용
            {
              leftLabel : string,
              rightLabel : string
            } */
              questionDetailsArray = {
                leftLabel: data?.findAnswerByQuestionId?.question.leftLabel,
                rightLabel: data?.findAnswerByQuestionId?.question.rightLabel,
              };
            },
          });

          /* receiverList =
        [
          {
            submissionId
            isFavorite
            answer
          }
        ]
        */

          receiverList = answersArray.map((a) => {
            let obj = {};
            obj["submissionId"] = a.submissionId;
            obj["isFavorite"] = a.isFavorite;
            obj["answer"] =
              questionDetailsArray.leftLabel +
              " -- " +
              a.answer.linearAnswer +
              " -- " +
              questionDetailsArray.rightLabel;
            return obj;
          });
          break;
        case "GridQuestion":
          console.log("그리드");

          await findRepsAnsByQueId({
            variables: {
              formId: newForm.id,
              questionId: repsQueId,
            },
            onCompleted: (data) => {
              console.log("ans 가져오는 쿼리 completed");
              /* answersArray =
            [
              {
                submissionId
                isFavorite
                answer : {
                  gridAnswer: [
                    {
                      rowNo
                      colNo
                    }
                  ]
                }
              }
            ]
             */
              answersArray = data?.findAnswerByQuestionId?.answers;

              /* questionDetailsArray
              {
                rowContent: [ "dfd", "sdf"],
                colContent: [ "sdf", "sdf"]
              }
             */
              questionDetailsArray = {
                rowContent: data?.findAnswerByQuestionId?.question.rowContent, //배열
                colContent: data?.findAnswerByQuestionId?.question.colContent,
              };
            },
          });

          /* receiverList =
        [
          {
            submissionId
            isFavorite
            answer : "(그리드1, 그리드2), (그리드2,그리드3)"
          }
        ]
        */

          receiverList = answersArray.map((a) => {
            let obj = {};
            obj["submissionId"] = a.submissionId;
            obj["isFavorite"] = a.isFavorite;
            obj["answer"] = "";
            a.answer.gridAnswer.map((f, index) => {
              //f: {rowNo, colNo}
              //no가 f인 요소를 찾는다 -> 선지내용(string)

              if (index === 0) {
                obj["answer"] =
                  "(" +
                  questionDetailsArray.rowContent[f.rowNo] +
                  ", " +
                  questionDetailsArray.colContent[f.colNo] +
                  ")";
              } else {
                obj["answer"] =
                  obj["answer"] +
                  ", (" +
                  questionDetailsArray.rowContent[f.rowNo] +
                  ", " +
                  questionDetailsArray.colContent[f.colNo] +
                  ")";
              }
            });
            return obj;
          });

          break;
        case "PersonalQuestion":
          console.log("개인정보");
          receiverList = [
            {
              submissionId: "1",
              isFavorite: false,
              answer: "개인정보 답변이므로 조회할 수 없습니다.",
            },
          ];
          break;
        default:
          break;
      }
    } else {
      receiverList = [];
      setRepsQuestionContent("");
      alert("대표문항이 없습니다.");
    }

    newForm = {
      id: newForm.id,
      title: newForm.title,
      receivers: receiverList,
    };

    setSelectedForm(newForm); //id, title, receivers
    checkedItems.clear();
    setIsAllChecked(false);
    setAllChecked(false);
    setIsFavoriteChecked(false);

    //isFavoriteCheckedList 초기화
    let newFavoriteArray = new Array();
    newForm.receivers &&
      newForm.receivers.map((receiver) => {
        newFavoriteArray.push(receiver.isFavorite);
      });
    setIsFavoriteCheckedList(newFavoriteArray);
  };

  //전체 체크 여부
  const [isAllChecked, setIsAllChecked] = useState(false);

  //즐겨찾기 버튼 클릭 여부
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(false);

  //즐겨찾기 등록 여부 리스트
  const [isFavoriteCheckedList, setIsFavoriteCheckedList] = useState([]);

  //체크박스 단일 선택
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      //체크 해제
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  //전체체크 체크박스 눌렀을 때 체크리스트에 넣기/빼기
  const allCheckedHandler = (isChecked) => {
    if (isChecked) {
      let allSet = new Set();
      selectedForm.receivers.map((receiver) =>
        allSet.add(receiver.submissionId)
      );
      setCheckedItems(allSet);
      setIsAllChecked(true);
    } else {
      checkedItems.clear();
      setIsAllChecked(false);
    }
  };

  //전체체크 체크박스 여부
  const [bAllChecked, setAllChecked] = useState(false);

  //전체체크 체크박스 눌렀을 때의 행동
  const checkHandler = ({ target }) => {
    setAllChecked(!bAllChecked);
    allCheckedHandler(target.checked);
  };

  //즐겨찾기 선택 버튼 눌렀을 때
  const favoriteHandler = (e) => {
    setIsFavoriteChecked(true); //반영이 이상하게 됨

    //id 중복 없게 기존 checkedItems에 추가
    let newSet = checkedItems;
    selectedForm.receivers.map((receiver) => {
      if (receiver.isFavorite) {
        newSet.add(receiver.submissionId);
      }
    });
    setCheckedItems(newSet);
  };

  return (
    <div className="list-panel">
      <div className="panel-row">
        <label htmlFor="formSelect">설문 선택</label>
        <Select
          value={selectedForm.id}
          label="설문 선택"
          onChange={handleFormChange}
          className="row-select"
        >
          {forms.map((form) => (
            <MenuItem key={form.id} value={form.id}>
              {form.title}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="panel-row">
        <label>대표문항</label>
        <input value={repsQuestionContent} className="content-box" disabled />
      </div>
      <div className="panel-row">
        <label>수신인 선택</label>
        <div className="row-list">
          <div className="row-list-head">
            <input
              type="checkbox"
              checked={bAllChecked}
              onChange={(e) => checkHandler(e)}
              className="all-check"
            />
            <span></span>
            <input
              type="button"
              value="즐겨찾기 선택"
              onClick={favoriteHandler}
              className="star-btn"
            />
          </div>
          <div className="list-con">
            {selectedForm.receivers.map((receiver, index) => (
              <TableItem
                id={receiver.submissionId}
                name={receiver.answer}
                isAllChecked={isAllChecked}
                isFavoriteChecked={isFavoriteChecked}
                isFavoriteCheckedList={isFavoriteCheckedList}
                checkedItemHandler={checkedItemHandler}
                bAllChecked={bAllChecked}
                setAllChecked={setAllChecked}
                key={receiver.submissionId}
                order={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
