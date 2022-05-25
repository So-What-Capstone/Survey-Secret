from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer, TfidfTransformer
from flask import Flask, request, Response
from konlpy.tag import Okt
import json, re
import numpy as np

app = Flask(__name__)


class Tokenizer:
    def __init__(self, app):
        # 불용어 사전(stopwords.txt) 로드
        with app.open_resource("static/stopwords.txt") as f:
            self.stopwords = f.readlines()
        self.okt = Okt()
    
    def __call__(self, text):
        # 불용어 제거
        trimed = re.sub(r'[^ ㄱ-ㅣ가-힣A-Za-z]', '', text)
        return [token for token in self.okt.nouns(trimed)
                if len(token) > 1 and token not in self.stopwords]


@app.route("/stats/keywords", methods=["POST"])
def stats_keywords():
    params = json.loads(request.get_data())
    if len(params) == 0 or "answers" not in params.keys() or len(params["answers"]) == 0:
        return Response(json.dumps({"error":"Given arguments are not valid."}), status=400)

    answers = params["answers"]
    vectorizer = TfidfVectorizer(tokenizer=Tokenizer(app))
    matrix = vectorizer.fit_transform(answers)
    matrix = matrix.mean(axis=0)

    vocabulary_word_id = {}
    for idx, token in enumerate(vectorizer.get_feature_names()):
        vocabulary_word_id[token] = idx
    
    result = {}
    for token in vectorizer.get_feature_names():
        result[token] = matrix[0, vocabulary_word_id[token]]

    result = sorted(result.items(), key = lambda item: item[1], reverse = True)
    
    return Response(json.dumps({"result":result}), status=200)


@app.route("/stats/corr", methods=["POST"])
def stats_corr():
    params = json.loads(request.get_data())
    if len(params) == 0 or "answers" not in params.keys() or len(params["answers"]) == 0:
        return Response(json.dumps({"error":"Given arguments are not valid."}), status=400)

    answers = params["answers"]
    observs = defaultdict(list)
    for sub_id in answers.keys():
        for que_id, user_ans in answers[sub_id].items():
            observs[que_id].append(float(user_ans))
    
    input_matrix = []
    index_key_map = {}
    for key, obs in observs.items():
        index_key_map[len(input_matrix)] = key
        input_matrix.append(obs)
    
    result = {}
    corr_matrix = np.corrcoef(input_matrix)
    for r in range(len(input_matrix)):
        result[index_key_map[r]] = {}
        for c in range(len(input_matrix)):
            result[index_key_map[r]][index_key_map[c]] = corr_matrix[r, c]

    return Response(json.dumps({"result":result}), status=200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)