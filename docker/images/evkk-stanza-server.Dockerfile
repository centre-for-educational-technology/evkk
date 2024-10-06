FROM evkk-stanza

RUN pip install numpy \
&& pip install pandas \
&& pip install Flask \
&& pip install estnltk \
&& pip install nltk \
&& pip install --no-cache-dir scikit-learn

COPY ./stanza-server/ /app/
CMD echo "TASK SLOT!"
CMD echo $((CPU_CORE))
ENTRYPOINT taskset -c $((CPU_CORE+1)) python /app/server.py
