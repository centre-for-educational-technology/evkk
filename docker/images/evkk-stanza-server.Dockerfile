FROM evkk-stanza
RUN apt-get update && apt-get install -y swig3.0
RUN pip install numpy
RUN pip install pandas
RUN pip install jamspell
RUN pip install Flask
RUN pip install gdown

#todo: temp solution until bin file is hosted in some better location & stanza & jamspell are split up
RUN mkdir -p /app/
RUN python -c "import gdown; gdown.download(\"https://drive.google.com/uc?id=1AVO7H1v6SaQ9Eom50ZmFZoW6Q17SUzm2\", output=\"/app/jamspell_estonian_2021_05_13.bin\")"

#RUN apt-get update
#RUN apt-get -y install cmake protobuf-compiler
#RUN git clone https://github.com/bakwc/JamSpell.git
#WORKDIR JamSpell
#RUN mkdir build
#WORKDIR build
#RUN cmake ..
#RUN make
RUN apt-get -y install locales
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
#CMD ["web_server/web_server",  "/app/JamSpell/build/model_sherlock.bin", "localhost", "5000"]

COPY ./stanza-server/ /app/
CMD ["python", "/app/server.py"]
