FROM evkk-stanza

RUN pip install numpy
RUN pip install pandas
RUN pip install Flask
RUN pip install estnltk
RUN pip install nltk
RUN pip install --no-cache-dir scikit-learn

COPY ./stanza-server/ /app/
CMD ["python", "/app/server.py"]
