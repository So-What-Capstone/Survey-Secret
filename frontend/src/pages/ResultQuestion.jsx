import React, { useEffect, useState } from "react";
import { ResultClipTray, ResultDescribe } from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getDescribeQuery, findFormByIdForOwnerQuery } from "../API";
import "../styles/ResultQuestion.css";

function ResultQuestion() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formId, setFormId] = useState(searchParams.get("id"));
  const [formData, setForm] = useState({});
  const [secList, setSec] = useState();
  const [describe, setDescribe] = useState();

  const { loading, data, error } = useQuery(getDescribeQuery, {
    variables: { formId: formId },
    onCompleted: (data) => {
      const {
        getDescribe: { ok, error, result },
      } = data;
      console.log("describe query complete", result);
      if (!ok || error) {
        alert(error);
        return;
      }
      setDescribe(result);
    },
    onError: (error) => {
      console.error(JSON.stringify(error, null, 2));
    },
  });
  const { loadingForm, dataForm, errorForm } = useQuery(
    findFormByIdForOwnerQuery,
    {
      variables: { formId: formId },
      onCompleted: (data) => {
        let formData = data.findFormByIdForOwner.form;
        setForm({
          title: formData.title,
          description: formData.description,
        });
        setSec(formData.sections);
      },
    }
  );
  if (!(secList && describe)) {
    return null;
  }

  return (
    <div className="result-q-con">
      <ResultClipTray type="question" formId={formId} />
      <div className="result-q-white-panel">
        <div className="result-q-form-title">{formData.title}</div>
        <div className="result-q-form-desc">{formData.description}</div>
        <ResultDescribe sections={secList} describe={describe} />
      </div>
    </div>
  );
}

export default ResultQuestion;
