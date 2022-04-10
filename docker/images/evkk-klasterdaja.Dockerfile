FROM evkk-estnltk141
WORKDIR /app
ENV FLASK_ENV=development
RUN apt-get update && apt-get install vislcg3 -y && apt-get clean
RUN apt-get -y install locales
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
RUN conda install -n py35 -c anaconda flask
COPY ./klasterdaja/ /app/
CMD ["python3", "server.py"]
