FROM python:3.8.5
RUN pip install stanza
RUN python -c "import stanza; stanza.download('et');"
