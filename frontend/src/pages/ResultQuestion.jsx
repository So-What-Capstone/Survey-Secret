import React, { useEffect, useState } from "react";
import { ResultClipTray, ResultDescribe } from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/ResultQuestion.css";

import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { getDescribeQuery, findFormByIdForOwnerQuery } from "../API";
import { BarGraph, StringTokens, Line, GridTable } from "../modules";

function ResultQuestion() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formId, setFormId] = useState(searchParams.get("id"));
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
        console.log(data.findFormByIdForOwner.form.sections);
        setSec(data.findFormByIdForOwner.form.sections);
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
        <div className="result-q-form-title">폼 타이틀!</div>
        <ResultDescribe sections={secList} describe={describe} />
      </div>
    </div>
  );
}

export default ResultQuestion;
