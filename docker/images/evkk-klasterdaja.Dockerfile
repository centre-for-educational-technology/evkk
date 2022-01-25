FROM evkk-estnltk141
WORKDIR /app
ENV FLASK_ENV=development
RUN apt-get update && apt-get install vislcg3 -y && apt-get clean
RUN conda install -n py35 -c anaconda flask
COPY ./klasterdaja/ /app/
CMD ["python3", "server.py"]
