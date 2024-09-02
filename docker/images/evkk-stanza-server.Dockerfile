FROM evkk-stanza

RUN pip install numpy
RUN pip install pandas
RUN pip install Flask
RUN pip install estnltk
RUN pip install nltk

COPY ./stanza-server/ /app/
CMD ["python", "/app/server.py"]
