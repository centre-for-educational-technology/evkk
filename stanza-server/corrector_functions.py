import re

punctuations = ['.', ',', '!', '?', '"']
punctuations_array = ["punctuationOrder", "extraPunctuation", "missingPunctuation", "wrongPunctuation"]


def remove_punctuation_from_end(text):
    return re.sub(r'[.,?!"]$', '', text)


def check_if_one_or_two_words(error_word, corrected_word):
    error_no_punct = remove_punctuation_from_end(error_word)
    corrected_no_punct = remove_punctuation_from_end(corrected_word)

    error_trimmed_is_same_as_corrected = error_no_punct.replace(' ', '') == corrected_no_punct
    corrected_trimmed_is_same_as_corrected = error_no_punct == corrected_no_punct.replace(' ', '')
    error_or_corrected_is_two_words = len(error_word.split()) > 1 or len(corrected_word.split()) > 1

    return (
        error_trimmed_is_same_as_corrected or corrected_trimmed_is_same_as_corrected) and error_or_corrected_is_two_words


def check_if_spelling_error(error_word, corrected_word):
    error_words = remove_punctuation_from_end(error_word)
    corrected_words = remove_punctuation_from_end(corrected_word)

    if error_words.count(',') != corrected_words.count(','):
        return False

    split_error_words = sorted(error_words.split())
    split_corrected_words = sorted(corrected_words.split())

    if len(split_error_words) != len(split_corrected_words):
        return False

    return not all(e == c for e, c in zip(split_error_words, split_corrected_words))


def check_for_extra_punctuation_error(error_word, corrected_word):
    if len(error_word.split()) != len(corrected_word.split()):
        return False

    error_last_char = error_word[-1] if error_word else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''

    return error_last_char in punctuations and corrected_last_char not in punctuations


def check_for_missing_punctuation_error(error_word, corrected_word):
    error_last_char = error_word[-1] if error_word else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''

    return corrected_last_char in punctuations and error_last_char not in punctuations


def check_for_wrong_punctuation_error(error_word, corrected_word):
    error_last_char = error_word[-1] if error_word else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''

    return (error_last_char in punctuations and
            corrected_last_char in punctuations and
            error_last_char != corrected_last_char)


def check_for_punctuation_order_error(error_word, corrected_word):
    error_last_char = error_word[-1] if error_word else ''
    error_pre_last_char = error_word[-2] if len(error_word) > 1 else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''
    corrected_pre_last_char = corrected_word[-2] if len(corrected_word) > 1 else ''

    if not (
        error_last_char in punctuations and corrected_last_char in punctuations and error_pre_last_char in punctuations and corrected_pre_last_char in punctuations):
        return False

    return error_last_char == corrected_pre_last_char and error_pre_last_char == corrected_last_char


def check_for_word_order_error(error_word, corrected_word):
    error_words = remove_punctuation_from_end(error_word).lower().split()
    corrected_words = remove_punctuation_from_end(corrected_word).lower().split()

    if len(error_words) != len(corrected_words) or len(error_words) == 1:
        return False

    sorted_error_words = sorted(error_words)
    sorted_corrected_words = sorted(corrected_words)

    return (sorted_error_words == sorted_corrected_words and
            error_words != corrected_words)


def check_for_extra_word_error(error_word, corrected_word):
    error_words = remove_punctuation_from_end(error_word).split()
    corrected_words = remove_punctuation_from_end(corrected_word).split()

    if len(error_words) <= len(corrected_words):
        return False

    return all(word in error_words for word in corrected_words)


def check_for_missing_word_error(error_word, corrected_word):
    error_words = error_word.split()
    corrected_words = corrected_word.split()

    if len(error_words) >= len(corrected_words):
        return False

    return all(word in corrected_words for word in error_words)


def run_check_punctuations(error_word, corrected_word):
    missing_punctuation_error = check_for_missing_punctuation_error(error_word, corrected_word)
    extra_punctuation_error = check_for_extra_punctuation_error(error_word, corrected_word)
    wrong_punctuation_error = check_for_wrong_punctuation_error(error_word, corrected_word)
    punctuation_order_error = check_for_punctuation_order_error(error_word, corrected_word)

    if punctuation_order_error:
        return "punctuationOrder"
    elif extra_punctuation_error:
        return "extraPunctuation"
    elif wrong_punctuation_error:
        return "wrongPunctuation"
    elif missing_punctuation_error:
        return "missingPunctuation"
    else:
        return "noError"


def run_other_error_checker(error_word, corrected_word):
    one_or_two_words_error = check_if_one_or_two_words(error_word, corrected_word)
    spelling_error = check_if_spelling_error(error_word, corrected_word)
    word_order_error = check_for_word_order_error(error_word, corrected_word)
    extra_word_error = check_for_extra_word_error(error_word, corrected_word)
    missing_word_error = check_for_missing_word_error(error_word, corrected_word)

    if one_or_two_words_error:
        return "wordCountError"
    elif spelling_error:
        return "spellingError"
    elif word_order_error:
        return "wordOrderError"
    elif extra_word_error:
        return "extraWordError"
    elif missing_word_error:
        return "missingWordError"
    else:
        return "noError"


def run_correction_checkers(error_word, corrected_word):
    punct_error = run_check_punctuations(error_word, corrected_word)
    other_error = run_other_error_checker(error_word, corrected_word)

    if punct_error != "noError" and other_error != "noError":
        return f"{other_error}+{punct_error}"
    elif punct_error != "noError":
        return punct_error
    elif other_error != "noError":
        return other_error
    else:
        return "multipleErrors"


def generate_error_data(error_word, corrected_word, correction_type, start, end):
    return {'initial_text': error_word, 'corrected_text': corrected_word,
            'correction_type': correction_type, 'start': start, 'end': end}


def calculate_punctuation_separation(correction_type, error_word, corrected_word):
    punct_mark_length = 1
    punct_mark_extension = 0
    if correction_type == "punctuationOrder":
        punct_mark_length = 2

    if correction_type == "missingPunctuation":
        punct_mark_extension = 1

    punct_separation_initial = len(error_word) - punct_mark_length
    punct_separation_corrected = len(corrected_word) - punct_mark_length

    return punct_mark_length, punct_mark_extension, punct_separation_initial, punct_separation_corrected


def process_punct_values(correction_type, error_word, corrected_word, punct_separation_corrected,
                         punct_separation_initial, multi_word=True):
    corrected_word_punct = corrected_word[punct_separation_corrected:]
    initial_word_punct = error_word[punct_separation_initial:]
    initial_word_word = error_word[0:punct_separation_initial]
    corrected_word_word = corrected_word[0:punct_separation_corrected]

    if correction_type == "punctuationOrder":
        corrected_word_punct = " "
        if multi_word:
            corrected_word_word = corrected_word

    if correction_type == 'missingPunctuation':
        initial_word_punct = " "
        if multi_word:
            initial_word_word = error_word
        corrected_word_punct = corrected_word_punct + " "

    if multi_word:
        return initial_word_punct, corrected_word_punct, initial_word_word, corrected_word_word
    else:
        return initial_word_punct, corrected_word_punct


def process_corrections(corrections):
    processed_corrections = []

    for correction in corrections:
        error_word = correction['span']['value'] or ''
        corrected_word = correction['replacements'][0]['value'] or ''
        correction_start = correction['span']['start']
        correction_end = correction['span']['end']
        correction_types = run_correction_checkers(error_word, corrected_word).split('+')

        if len(correction_types) > 1:
            punct_mark_length, punct_mark_extension, punct_separation_initial, punct_separation_corrected = calculate_punctuation_separation(
                correction_types[1], error_word, corrected_word)

            initial_word_punct, corrected_word_punct, initial_word_word, corrected_word_word = process_punct_values(
                correction_types[1], error_word, corrected_word, punct_separation_corrected, punct_separation_initial)

            other_error = generate_error_data(initial_word_word,
                                              corrected_word_word, correction_types[0],
                                              correction_start, correction_end - punct_mark_length)
            punct_error = generate_error_data(initial_word_punct,
                                              corrected_word_punct, correction_types[1],
                                              correction_end - punct_mark_length + punct_mark_extension,
                                              correction_end + punct_mark_extension)

            processed_corrections.extend([other_error, punct_error])

        else:
            if correction_types[0] in punctuations_array:
                punct_mark_length, punct_mark_extension, punct_separation_initial, punct_separation_corrected = calculate_punctuation_separation(
                    correction_types[0], error_word, corrected_word)

                initial_word_punct, corrected_word_punct = process_punct_values(
                    correction_types[0], error_word, corrected_word, punct_separation_corrected,
                    punct_separation_initial, False)

                processed_corrections.extend([generate_error_data(initial_word_punct,
                                                                  corrected_word_punct,
                                                                  correction_types[0],
                                                                  correction_end - punct_mark_length + punct_mark_extension,
                                                                  correction_end + punct_mark_extension)])
            else:
                processed_corrections.extend([generate_error_data(error_word, corrected_word, correction_types[0],
                                                                  correction_start, correction_end)])

    return processed_corrections


def generate_grammar_output(input_text, corrections):
    processed_corrections = process_corrections(corrections['corrections'])
    sorted_corrections = sorted(processed_corrections, key=lambda x: x['start'])

    result = []
    error_list = {}
    current_position = 0

    for index, correction in enumerate(sorted_corrections):
        start = correction['start']
        end = correction['end']

        if current_position < start:
            result.append({
                'corrected': False,
                'text': input_text[current_position:start],
                'error_id': f"{index}_unmarked"
            })

        error_data = {
            'corrected': True,
            'corrected_text': correction["corrected_text"],
            'text': correction['initial_text'],
            'correction_type': correction['correction_type'],
            'error_id': f"{start}_marked"
        }

        result.append(error_data)

        current_position = end

        if correction['correction_type'] not in error_list:
            error_list[correction['correction_type']] = []

        error_list[correction['correction_type']].append(error_data)

    if current_position < len(input_text):
        result.append({
            'corrected': False,
            'text': input_text[current_position:],
            'error_id': f"{len(sorted_corrections)}_unmarked"
        })

    return {"corrector_results": result, "error_list": error_list}
