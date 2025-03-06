import json
import re
from collections import defaultdict
from os.path import split

error_type_mapping = {
    "õigekiri": "spellingErrorTest",
    "käändevorm": "caseError",
    "algustäht": "capitalizationError",
    "tegusõna vorm": "verbFormError",
    "sõnavalik": "wordChoiceError",
    "liigne kirjavahemärk": "extraPunctuation",
    "puuduv kirjavahemärk": "missingPunctuation",
    "vale kirjavahemärk": "wrongPunctuation",
    "liigne sõna": "extraWordError",
    "puuduv sõna": "missingWordError",
    "kokku-lahkukirjutus": "wordCountError",
    "sõnajärg": "wordOrderError",
}


def find_error_indexes(input, original):
    error_array = input["corrections"]
    index_size = 0
    errors = []

    for error in error_array:
        corrected = error["corrected"]
        original_val = error["original"]
        explanations = re.split(r"\n\n", re.sub(r"Selgitus \d+:\s*", "", error["explanations"]))

        if explanations[0] == "Parandused puuduvad":
            index_size = index_size + len(original_val)
            continue

        correction_log = re.split(r"\n\d+\.", error["correction_log"].replace("Parandused:\n", ""))
        correction_log[0] = re.sub(r"^\d+\.\s*", "", correction_log[0])

        original_working = original[index_size:]
        corrected_working = corrected
        current_offset = 0

        for explanation in explanations:
            split_explanations = explanation.split('\n')

            if len(split_explanations) > 1 and ' -> ' in split_explanations[0]:
                error_type = ""
                long_explanation = ""
                short_explanation = ""
                split_explanation = split_explanations[0].split(' -> ')
                wrong_word = split_explanation[0].strip()
                correct_word = split_explanation[1].strip()

                for line in split_explanations[1:]:
                    if line.startswith("Pikk:"):
                        long_explanation = line.split('Pikk: ', 1)[1].strip() if len(
                            line.split('Pikk: ', 1)) > 1 else ""
                    elif line.startswith("Lühike:"):
                        short_explanation = line.split('Lühike: ', 1)[1].strip() if len(
                            line.split('Lühike: ', 1)) > 1 else ""
                    elif line.startswith("Vealiik:"):
                        error_type = line.split('Vealiik: ', 1)[1].strip() if len(
                            line.split('Vealiik: ', 1)) > 1 else ""

                if wrong_word == '"' or not wrong_word:
                    continue

                error_position = find_best_match_position(original_working, corrected_working, wrong_word, correct_word)

                if error_position is not None:
                    start_pos = error_position + index_size + current_offset
                    end_pos = start_pos + len(wrong_word)
                    errors.append(
                        (start_pos, end_pos, wrong_word, correct_word, error_type, long_explanation, short_explanation))

                    current_offset += error_position + len(wrong_word)
                    original_working = original_working[error_position + len(wrong_word):]

        index_size += len(original_val)

    return errors


def find_best_match_position(original_text, corrected_text, wrong_word, correct_word):
    matches_wrong = [m.start() for m in re.finditer(re.escape(wrong_word), original_text)]
    matches_correct = [m.start() for m in re.finditer(re.escape(correct_word), corrected_text)]

    if not matches_wrong and not matches_correct:
        return None

    if len(matches_wrong) == 1:
        return matches_wrong[0]

    if matches_wrong:
        context_size = 10
        for pos in matches_wrong:
            start_context = max(0, pos - context_size)
            end_context = min(len(original_text), pos + len(wrong_word) + context_size)
            context = original_text[start_context:end_context]

            if correct_word in corrected_text:
                for corr_pos in matches_correct:
                    corr_start = max(0, corr_pos - context_size)
                    corr_end = min(len(corrected_text), corr_pos + len(correct_word) + context_size)
                    corr_context = corrected_text[corr_start:corr_end]

                    similarity = calculate_similarity(context, corr_context)
                    if similarity > 0.7:
                        return pos

        return matches_wrong[0] if matches_wrong else None

    return None


def calculate_similarity(text1, text2):
    set1 = set(text1)
    set2 = set(text2)

    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))

    if union == 0:
        return 0
    return intersection / union


def populate_error_list(data):
    grouped_corrections = defaultdict(list)

    for correction in data:
        if correction.get("corrected", False):
            correction_type = correction.get("correction_type", "unknown")
            grouped_corrections[correction_type].append(correction)

    return dict(grouped_corrections)


def generate_test_grammar_output(json_data, full_text):
    data = json.loads(json_data)
    results = []

    error_positions = find_error_indexes(data, full_text)
    error_positions.sort()

    last_pos = 0
    for error in error_positions:
        start, end, wrong_word, correct_word, correction_type, long_explanation, short_explanation = error

        if last_pos < start:
            results.append({
                "error_id": f"{last_pos}_unmarked",
                "text": full_text[last_pos:start],
                "corrected": False
            })

        results.append({
            "error_id": f"{start}_marked",
            "text": wrong_word,
            "corrected": True,
            "corrected_text": correct_word,
            "correction_type": error_type_mapping.get(correction_type, "multipleErrors"),
            "correction_value": correction_type,
            "long_explanation": long_explanation,
            "short_explanation": short_explanation
        })

        last_pos = end

    if last_pos < len(full_text):
        results.append({
            "error_id": f"{last_pos}_unmarked",
            "text": full_text[last_pos:],
            "corrected": False
        })

    return {"error_input": results, "error_list": populate_error_list(results)}
