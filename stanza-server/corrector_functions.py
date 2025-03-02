import re

punctuations = ['.', ',', '!', '?', '"']


def remove_punctuation_from_end(text):
    """Remove punctuation from the end of a string."""
    return re.sub(r'[.,?!"]$', '', text)


def check_if_one_or_two_words(error_word, corrected_word):
    """Check if the word should be one or two words."""
    error_no_punct = remove_punctuation_from_end(error_word)
    corrected_no_punct = remove_punctuation_from_end(corrected_word)

    condition1 = error_no_punct.replace(' ', '') == corrected_no_punct
    condition2 = error_no_punct == corrected_no_punct.replace(' ', '')
    condition3 = len(error_word.split()) > 1 or len(corrected_word.split()) > 1

    return (condition1 or condition2) and condition3


def check_if_spelling_error(error_word, corrected_word):
    """Check for spelling errors."""
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
    """Check for extra punctuation errors."""
    if len(error_word.split()) != len(corrected_word.split()):
        return False

    error_last_char = error_word[-1] if error_word else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''

    return error_last_char in punctuations and corrected_last_char not in punctuations


def check_for_missing_punctuation_error(error_word, corrected_word):
    """Check for missing punctuation errors."""
    error_last_char = error_word[-1] if error_word else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''

    return corrected_last_char in punctuations and error_last_char not in punctuations


def check_for_wrong_punctuation_error(error_word, corrected_word):
    """Check for wrong punctuation errors."""
    error_last_char = error_word[-1] if error_word else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''

    return (error_last_char in punctuations and
            corrected_last_char in punctuations and
            error_last_char != corrected_last_char)


def check_for_punctuation_order_error(error_word, corrected_word):
    """Check for punctuation order errors."""
    error_last_char = error_word[-1] if error_word else ''
    error_pre_last_char = error_word[-2] if len(error_word) > 1 else ''
    corrected_last_char = corrected_word[-1] if corrected_word else ''
    corrected_pre_last_char = corrected_word[-2] if len(corrected_word) > 1 else ''

    if not (
        error_last_char in punctuations and corrected_last_char in punctuations and error_pre_last_char in punctuations and corrected_pre_last_char in punctuations):
        return False

    return error_last_char == corrected_pre_last_char and error_pre_last_char == corrected_last_char


def check_for_word_order_error(error_word, corrected_word):
    """Check for word order errors."""
    error_words = remove_punctuation_from_end(error_word).lower().split()
    corrected_words = remove_punctuation_from_end(corrected_word).lower().split()

    if len(error_words) != len(corrected_words) or len(error_words) == 1:
        return False

    sorted_error_words = sorted(error_words)
    sorted_corrected_words = sorted(corrected_words)

    return (sorted_error_words == sorted_corrected_words and
            error_words != corrected_words)


def check_for_extra_word_error(error_word, corrected_word):
    """Check for extra word errors."""
    error_words = remove_punctuation_from_end(error_word).split()
    corrected_words = remove_punctuation_from_end(corrected_word).split()

    if len(error_words) <= len(corrected_words):
        return False

    return all(word in error_words for word in corrected_words)


def check_for_missing_word_error(error_word, corrected_word):
    """Check for missing word errors."""
    error_words = error_word.split()
    corrected_words = corrected_word.split()

    if len(error_words) >= len(corrected_words):
        return False

    return all(word in corrected_words for word in error_words)


def run_check_punctuations(error_word, corrected_word):
    """Check if the punctuation is correct."""
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
        return "no_error"


def run_other_error_checker(error_word, corrected_word):
    """Check if the error is not a punctuation error."""
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
        return "no_error"


def run_correction_checkers(error_word, corrected_word):
    """Run all correction checkers."""
    punct_error = run_check_punctuations(error_word, corrected_word)
    other_error = run_other_error_checker(error_word, corrected_word)

    if punct_error != "no_error" and other_error != "no_error":
        return f"{other_error}+{punct_error}"
    elif punct_error != "no_error":
        return punct_error
    elif other_error != "no_error":
        return other_error
    else:
        return "multipleErrors"


def process_corrections(corrections):
    """Process the corrections."""
    processed_corrections = []
    punctuations_array = ["punctuationOrder", "extraPunctuation", "missingPunctuation", "wrongPunctuation"]

    def generate_error_data(error_word, corrected_word, correction_type, start, end):
        return {'initial_text': error_word, 'corrected_text': corrected_word,
                'correction_type': correction_type, 'start': start, 'end': end}

    def calculate_punctuation_separation(correction_type):
        punct_mark_length = 1
        punct_mark_extension = 0
        if correction_type == "punctuationOrder":
            punct_mark_length = 2

        if correction_type == "missingPunctuation":
            punct_mark_extension = 1

        punct_separation_initial = len(error_word) - punct_mark_length
        punct_separation_corrected = len(corrected_word) - punct_mark_length

        return punct_mark_length, punct_mark_extension, punct_separation_initial, punct_separation_corrected

    for correction in corrections:
        error_word = correction['span']['value']
        corrected_word = correction['replacements'][0]['value']
        correction_start = correction['span']['start']
        correction_end = correction['span']['end']

        correction_types = run_correction_checkers(error_word, corrected_word).split('+')

        if len(correction_types) > 1:
            punct_mark_length, punct_mark_extension, punct_separation_initial, punct_separation_corrected = calculate_punctuation_separation(
                correction_types[1])

            corrected_word_punct = corrected_word[punct_separation_corrected:]
            initial_word_punct = error_word[punct_separation_initial:]
            initial_word_word = error_word[0:punct_separation_initial]
            corrected_word_word = corrected_word[0:punct_separation_corrected]

            if correction_types[1] == 'extraPunctuation':
                corrected_word_punct = " "
                corrected_word_word = corrected_word

            if correction_types[1] == 'missingPunctuation':
                initial_word_punct = " "
                initial_word_word = error_word
                corrected_word_punct = corrected_word_punct + " "

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
                    correction_types[0])

                corrected_word_punct = corrected_word[punct_separation_corrected:]
                initial_word_punct = error_word[punct_separation_initial:]

                if correction_types[0] == 'extraPunctuation':
                    corrected_word_punct = " "

                if correction_types[0] == 'missingPunctuation':
                    initial_word_punct = " "
                    corrected_word_punct = corrected_word_punct + " "

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
    """Generate the grammar output."""
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
