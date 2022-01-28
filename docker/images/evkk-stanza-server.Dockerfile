FROM evkk-stanza

RUN pip install numpy
RUN pip install pandas
RUN pip install Flask

COPY ./stanza-server/ /app/
CMD ["python", "/app/server.py"]
