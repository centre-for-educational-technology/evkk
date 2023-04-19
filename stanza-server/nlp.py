import stanza

nlp_all = stanza.Pipeline(lang='et')
nlp_tpl = stanza.Pipeline(lang='et', processors='tokenize,pos,lemma')
nlp_tp = stanza.Pipeline(lang='et', processors='tokenize,pos')
nlp_t = stanza.Pipeline(lang='et', processors='tokenize')

nlp_ru_all = stanza.Pipeline(lang='ru')
nlp_ru_tpl = stanza.Pipeline(lang='ru', processors='tokenize,pos,lemma')
nlp_ru_tp = stanza.Pipeline(lang='ru', processors='tokenize,pos')
nlp_ru_t = stanza.Pipeline(lang='ru', processors='tokenize')
