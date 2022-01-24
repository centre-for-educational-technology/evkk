import stanza
nlp_tpl = stanza.Pipeline(lang='et', processors='tokenize,pos,lemma')
nlp_t = stanza.Pipeline(lang='et', processors='tokenize')
nlp_tp = stanza.Pipeline(lang='et', processors='tokenize,pos')
