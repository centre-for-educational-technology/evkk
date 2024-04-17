FROM python:3.8.18

RUN apt-get update \
    && apt-get install -y libpcre3 locales \
    && apt-get clean

RUN wget http://ftp.hr.debian.org/debian/pool/main/s/swig/swig3.0_3.0.12-2_amd64.deb -O swig3.deb \
    && dpkg -i swig3.deb

RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN pip install jamspell
RUN pip install Flask

RUN mkdir -p /app/ && curl -o /app/jamspell.et.bin https://www.cs.tlu.ee/keelemudelid/jamspell_estonian_2021_05_13.bin
RUN python -c "import jamspell; corrector=jamspell.TSpellCorrector(); corrector.LoadLangModel(\"/app/jamspell.et.bin\");"

COPY ./corrector-server/ /app/
CMD ["python", "/app/server.py"]
