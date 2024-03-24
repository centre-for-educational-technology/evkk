# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Clone the repository
RUN apt-get update -y && \
    pip install swig==3.0.12 && \
    git clone https://github.com/TartuNLP/grammar-worker.git /app && \
    cd /app && \
    git checkout nelb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*



# Set the LANG environment variable to a valid locale
RUN apt-get update -y && \
    apt-get -y install locales && \
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen &&\
    apt-get clean

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN pip install -r /app/requirements.txt && \
    python -c "import nltk; nltk.download('punkt')"

RUN pip install -U Flask

# Install Git LFS
RUN apt-get update && \
    apt-get install -y git-lfs && \
    git lfs install

# Clone GEC models
RUN git clone https://huggingface.co/tartuNLP/en-et-de-cs-nelb /app/models/tartuNLP/en-et-de-cs-nelb
    #git clone https://huggingface.co/tartuNLP/GEC-noisy-nmt-ut /app/models/tartuNLP/GEC-noisy-nmt-ut && \
    #git clone https://huggingface.co/tartuNLP/GEC-synthetic-pretrain-ut-ft /app/models/tartuNLP/GEC-synthetic-pretrain-ut-ft

# Clone Spell models
RUN git clone https://huggingface.co/Jaagup/etnc19_reference_corpus_6000000_web_2019_600000 /app/models/Jaagup/etnc19_reference_corpus_6000000_web_2019_600000

    #git clone https://huggingface.co/Jaagup/etnc19_reference_corpus_model_6000000_lines /app/models/Jaagup/etnc19_reference_corpus_model_6000000_lines && \
    #git clone https://huggingface.co/Jaagup/etnc19_web_2019 /app/models/Jaagup/etnc19_web_2019 && \

# Expose the necessary port (if needed)
EXPOSE 4000

# Copy the current directory contents into the container at /app
COPY ./grammar-worker /app/

# Run the command when the container launches
CMD ["python", "/app/grammar-worker-server.py"]
