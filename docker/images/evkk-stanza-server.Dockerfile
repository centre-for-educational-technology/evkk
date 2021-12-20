FROM evkk-stanza
COPY ./stanza-server/ /app/
RUN pip install Flask
RUN pip install pandas
RUN pip install numpy
CMD ["python", "/app/server.py"]
