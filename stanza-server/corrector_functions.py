import re

punctuations = ['.', ',', '!', '?', '"']
punctuation_order = "punctuationOrder"
extra_punctuation = "extraPunctuation"
missing_punctuation = "missingPunctuation"
wrong_punctuation = "wrongPunctuation"
punctuations_array = [punctuation_order, extra_punctuation, missing_punctuation, wrong_punctuation]

no_error = "noError"
multiple_errors = "multipleErrors"
word_count_error = "wordCountError"
spelling_error = "spellingError"
word_order_error = "wordOrderError"
extra_word_error = "extraWordError"
missing_word_error = "missingWordError"


def remove_punctuation_from_end(text):
    return re.sub(r'[.,?!"]$', '', text)


def check_if_one_or_two_words(error_word, corrected_word):
    error_no_punct = remove_punctuation_from_end(error_word)
    corrected_no_punct = remove_punctuation_from_end(corrected_word)

    error_trimmed_is_same_as_corrected = error_no_punct.replace(' ', '') == corrected_no_punct
    corrected_trimmed_is_same_as_corrected = error_no_punct == corrected_no_punct.replace(' ', '')
    error_or_corrected_is_two_words = len(error_word.split()) > 1 or len(corrected_word.split()) > 1

    return ((error_trimmed_is_same_as_corrected or corrected_trimmed_is_same_as_corrected)
            and error_or_corrected_is_two_words)


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

    if not (error_last_char in punctuations
            and corrected_last_char in punctuations
            and error_pre_last_char in punctuations
            and corrected_pre_last_char in punctuations):
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
        return punctuation_order
    elif extra_punctuation_error:
        return extra_punctuation
    elif wrong_punctuation_error:
        return wrong_punctuation
    elif missing_punctuation_error:
        return missing_punctuation
    else:
        return no_error


def run_other_error_checker(error_word, corrected_word):
    one_or_two_words_error_check = check_if_one_or_two_words(error_word, corrected_word)
    spelling_error_check = check_if_spelling_error(error_word, corrected_word)
    word_order_error_check = check_for_word_order_error(error_word, corrected_word)
    extra_word_error_check = check_for_extra_word_error(error_word, corrected_word)
    missing_word_error_check = check_for_missing_word_error(error_word, corrected_word)

    if one_or_two_words_error_check:
        return word_count_error
    elif spelling_error_check:
        return spelling_error
    elif word_order_error_check:
        return word_order_error
    elif extra_word_error_check:
        return extra_word_error
    elif missing_word_error_check:
        return missing_word_error
    else:
        return no_error


def run_correction_checkers(error_word, corrected_word):
    punct_error = run_check_punctuations(error_word, corrected_word)
    other_error = run_other_error_checker(error_word, corrected_word)

    if punct_error != no_error and other_error != no_error:
        return f"{other_error}+{punct_error}"
    elif punct_error != no_error:
        return punct_error
    elif other_error != no_error:
        return other_error
    else:
        return multiple_errors


def generate_error_data(error_word, corrected_word, correction_type, start, end):
    return {'initial_text': error_word, 'corrected_text': corrected_word,
            'correction_type': correction_type, 'start': start, 'end': end}


def calculate_punctuation_separation(correction_type, error_word, corrected_word):
    punct_mark_length = 1
    punct_mark_extension = 0
    if correction_type == punctuation_order:
        punct_mark_length = 2

    if correction_type == missing_punctuation:
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

    if correction_type == punctuation_order:
        corrected_word_punct = " "
        if multi_word:
            corrected_word_word = corrected_word

    if correction_type == missing_punctuation:
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
        is_index_shifted = False

        if current_position < start:
            input_unmarked_text = input_text[current_position:start]
            string_match = re.search(r"\s([a-zA-Z])$", input_unmarked_text)
            if string_match and string_match.group(1) == correction['initial_text'][0]:
                is_index_shifted = True
                start = start - 1

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

        if is_index_shifted:
            current_position = end - 1
        else:
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
