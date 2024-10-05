FROM evkk-stanza

RUN pip install numpy \
&& pip install pandas \
&& pip install Flask \
&& pip install estnltk \
&& pip install nltk \
&& pip install --no-cache-dir scikit-learn

COPY ./stanza-server/ /app/
CMD ["taskset -c $((CPU_CORE))", "python", "/app/server.py"]
