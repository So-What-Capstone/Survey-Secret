FROM python:3

ENV JAVA_HOME /usr/lib/jvm/java-1.7-openjdk/jre
RUN apt-get update && apt-get install -y g++ default-jdk
RUN pip install konlpy

RUN pip install flask
RUN pip install scikit-learn
RUN pip install pandas