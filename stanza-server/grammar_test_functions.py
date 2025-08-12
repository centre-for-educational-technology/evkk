import re
from collections import defaultdict
from typing import Dict, List, Tuple, Any

ERROR_TYPE_MAP = {
    "õigekiri": "spellingError",
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

SENTENCE_ENDS = (".", "!", "?")

LOG_LINE_RE = re.compile(
    r"^\s*(?P<etype>[^:]+):\s*#(?P<start>\d+)\s+#(?P<end>\d+)\s+(?P<wrong>.*?)\s*->\s*(?P<correct>.*)\s*$"
)

# --- NEW: explanation parsing helpers ---
EXPLAIN_BLOCK_SPLIT = re.compile(r"(?:^|\n)Selgitus\s+\d+\.\s*#\d+\s+#\d+.*?(?=\nSelgitus\s+\d+\.|\Z)", re.S)
LINE_LONG  = re.compile(r"^Pikk:\s*(.*)$", re.M)
LINE_SHORT = re.compile(r"^Lühike:\s*(.*)$", re.M)
LINE_TYPE  = re.compile(r"^Vealiik:\s*(.*)$", re.M)

def parse_explanations_blob(blob: str) -> List[Dict[str, str]]:
    """
    Returns a list of dicts (one per 'Selgitus i.') with:
    {'long': ..., 'short': ..., 'etype_src': ...}
    Order matches the order of items in correction_log.
    """
    if not blob:
        return []
    blocks = EXPLAIN_BLOCK_SPLIT.findall(blob.strip() + "\n")
    out = []
    for block in blocks:
        long_  = (LINE_LONG.search(block).group(1).strip()
                  if LINE_LONG.search(block) else "")
        short_ = (LINE_SHORT.search(block).group(1).strip()
                  if LINE_SHORT.search(block) else "")
        etype_src = (LINE_TYPE.search(block).group(1).strip()
                     if LINE_TYPE.search(block) else "")
        out.append({"long": long_, "short": short_, "etype_src": etype_src})
    return out
# ----------------------------------------

def tokenize_with_spans(s: str) -> List[Tuple[int, int, str, str]]:
    spans = []
    i = 0
    n = len(s)
    while i < n:
        while i < n and s[i].isspace():
            i += 1
        if i >= n:
            break
        start = i
        while i < n and not s[i].isspace():
            i += 1
        end = i
        raw = s[start:end]
        clean = raw.strip(",.;:!?\"“”‘’()[]{}")
        spans.append((start, end, raw, clean))
    return spans

def parse_correction_log(correction_log: str) -> List[Dict[str, Any]]:
    log = correction_log.strip()
    if log.startswith("Parandused:"):
        log = log[len("Parandused:"):].strip()

    items = []
    for line in log.splitlines():
        line = line.strip()
        if not line:
            continue
        m = LOG_LINE_RE.match(line)
        if not m:
            line2 = re.sub(r"^\d+\.\s*", "", line)  # handle "1. ..."
            m = LOG_LINE_RE.match(line2)
        if not m:
            continue
        etype = m.group("etype").strip()
        sidx = int(m.group("start"))
        eidx = int(m.group("end"))
        wrong = m.group("wrong").strip().strip('"')
        correct = m.group("correct").strip().strip('"')
        items.append({
            "etype_src": etype,
            "etype": ERROR_TYPE_MAP.get(etype, "multipleErrors"),
            "start_idx": sidx,
            "end_idx": eidx,
            "wrong": wrong,
            "correct": correct,
        })
    return items

def token_range_to_char_span(tokens: List[Tuple[int,int,str,str]],
                             start_idx: int, end_idx: int,
                             wrong_text: str, sentence: str) -> Tuple[int,int]:
    if start_idx < 0 or end_idx <= start_idx or end_idx > len(tokens):
        pos = sentence.find(wrong_text)
        if pos >= 0:
            return pos, pos + len(wrong_text)
        return 0, len(sentence)

    start_char = tokens[start_idx][0]
    end_char = tokens[end_idx - 1][1]

    region = sentence[start_char:end_char]
    inner = region.find(wrong_text)
    if inner >= 0:
        return start_char + inner, start_char + inner + len(wrong_text)

    if end_idx == start_idx + 1:
        tstart, _, raw, clean = tokens[start_idx]
        if clean == wrong_text:
            inner2 = raw.find(clean)
            if inner2 >= 0:
                return tstart + inner2, tstart + inner2 + len(clean)

    return start_char, end_char

def generate_test_grammar_output(api_response: Dict[str, Any]) -> Dict[str, Any]:
    corrections = api_response.get("corrections", [])
    originals = [c["original"] for c in corrections]
    full_text = " ".join(originals)

    sentence_offsets = []
    offset = 0
    for i, s in enumerate(originals):
        sentence_offsets.append(offset)
        offset += len(s) + (1 if i < len(originals) - 1 else 0)

    spans = []
    # --- collect spans, now with explanations aligned by index ---
    for si, corr in enumerate(corrections):
        sent = corr["original"]
        toks = tokenize_with_spans(sent)
        items = parse_correction_log(corr.get("correction_log", ""))
        expls = parse_explanations_blob(corr.get("explanations", ""))

        for idx, it in enumerate(items):
            s_char, e_char = token_range_to_char_span(
                toks, it["start_idx"], it["end_idx"], it["wrong"], sent
            )
            abs_s = sentence_offsets[si] + s_char
            abs_e = sentence_offsets[si] + e_char

            # attach explanations by order when available
            long_expl = short_expl = ""
            etype_src_from_expl = ""
            if idx < len(expls):
                long_expl = expls[idx]["long"]
                short_expl = expls[idx]["short"]
                etype_src_from_expl = expls[idx]["etype_src"] or it["etype_src"]

            spans.append({
                "abs_s": abs_s,
                "abs_e": abs_e,
                "wrong": it["wrong"],
                "correct": it["correct"],
                "etype": it["etype"],
                "etype_src": etype_src_from_expl or it["etype_src"],
                "long_explanation": long_expl,
                "short_explanation": short_expl,
            })

    spans.sort(key=lambda x: (x["abs_s"], x["abs_e"]))

    grammatika = []
    last = 0
    unmarked_id = 0
    for sp in spans:
        s, e = sp["abs_s"], sp["abs_e"]
        if last < s:
            chunk = full_text[last:s]
            if chunk.endswith(SENTENCE_ENDS):
                chunk = chunk[:-1]
                s -= 1
            grammatika.append({
                "corrected": False,
                "text": chunk,
                "error_id": f"{unmarked_id}_unmarked"
            })
            unmarked_id += 1

        grammatika.append({
            "corrected": True,
            "text": full_text[s:e],
            "corrected_text": sp["correct"],
            "correction_type": sp["etype"],
            "correction_value": sp["etype_src"],        # keep original label
            "long_explanation": sp["long_explanation"],
            "short_explanation": sp["short_explanation"],
            "error_id": f"{s}_marked",
        })
        last = e

    if last < len(full_text):
        grammatika.append({
            "corrected": False,
            "text": full_text[last:],
            "error_id": f"{unmarked_id}_unmarked"
        })

    grouped = defaultdict(list)
    for g in grammatika:
        if g.get("corrected"):
            grouped[g["correction_type"]].append(g)

    grammatika_vead = dict(sorted(grouped.items(), key=lambda kv: len(kv[1]), reverse=True))

    return {
        "full_text": full_text,
        "corrector_results": grammatika,
        "error_list": grammatika_vead,
        "error_count": len(grammatika),
    }
