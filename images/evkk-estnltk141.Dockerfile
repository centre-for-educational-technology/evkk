# How to use in container: conda run -n py35 python3 -c "import estnltk; print( estnltk.Text('Tere estnltk').lemmas )"

FROM ubuntu:16.04
RUN apt-get update && apt-get install openjdk-8-jdk wget -y && apt-get clean
RUN wget --no-verbose https://repo.anaconda.com/archive/Anaconda3-2021.05-Linux-x86_64.sh && sh Anaconda3-2021.05-Linux-x86_64.sh -b && rm Anaconda3-2021.05-Linux-x86_64.sh
RUN export PATH="/root/anaconda3/bin:$PATH"
ENV PATH="/root/anaconda3/bin:$PATH"
RUN conda create -n py35 python=3.5
SHELL ["conda", "run", "-n", "py35", "/bin/bash", "-c"]
RUN conda install -c estnltk -c conda-forge nltk=3.4.4 estnltk=1.4.1
#RUN conda run -n py35 python3 -m estnltk.run_tests
