FROM evkk-stanza
COPY ./stanza-server/ /app/
RUN apt-get update && apt-get install -y swig3.0
RUN pip install numpy
RUN pip install pandas
RUN pip install jamspell
RUN pip install Flask
RUN pip install gdown

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

CMD ["python", "/app/server.py"]
