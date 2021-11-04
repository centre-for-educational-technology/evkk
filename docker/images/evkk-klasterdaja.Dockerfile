FROM evkk-estnltk141
SHELL ["conda", "run", "-n", "py35", "/bin/bash", "-c"]
COPY ./klasterdaja/ /app/
RUN conda install -c anaconda flask
