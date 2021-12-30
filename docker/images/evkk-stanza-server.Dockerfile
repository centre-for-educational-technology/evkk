FROM evkk-stanza
COPY ./stanza-server/ /app/
RUN apt-get update && apt-get install -y swig3.0
RUN pip install numpy
RUN pip install pandas
RUN pip install jamspell
RUN pip install Flask
CMD ["python", "/app/server.py"]
