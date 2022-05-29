# 통계 전용 Python API Backend

본 API는 GraphQL API에서 파이썬의 자연어 처리 라이브러리와 통계 기능을 이용하기 위해 개발되었습니다.

## 도커로 실행하는 방법(추천)

아래 명령어대로 `docker-compose`를 실행하면, 4000포트에 Flask 서버가 열립니다. 코드를 수정할때마다 서버가 재시작되므로 편리하게 개발할 수 있습니다.

Note: 최신 도커에서는 `docker-compose`가 아니라 `docker compose`로 실행해야 할 수도 있으나, 모든 과정은 같습니다.

```bash
sudo docker-compose build
sudo docker-compose up -d
```

## Python으로 직접 실행하는 방법

Python으로 서버를 로컬에 직접 실행하려면 `Dockerfile`에 명시된 모든 패키지를 설치하고 `api.py`를 직접 실행합니다.