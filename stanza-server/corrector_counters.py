from text_abstraction_analyse import get_lemma_freq_dict

COMMON_LEMMAS = get_lemma_freq_dict("estonian")
NUM = 'NUM'


def calculate_uncommon_words(lemmad, sonaliigid):
    uncommon_count = 0
    for index, lemma in enumerate(lemmad):
        if sonaliigid[index] != NUM and lemma not in COMMON_LEMMAS:
            uncommon_count += 1
    return uncommon_count
