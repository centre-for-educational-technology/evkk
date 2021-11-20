FROM evkk-stanza
COPY ./stanza-server/ /app/
RUN pip install Flask
CMD ["python", "/app/server.py"]
