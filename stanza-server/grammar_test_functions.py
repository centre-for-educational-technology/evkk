import json
import re
from collections import defaultdict
from typing import List, Dict, Tuple, Any

EMPTY_MARKERS = {"''", '""', '``', '„”', '“”', '’’'}
PUNCT_TYPES = {"missingPunctuation", "wrongPunctuation"}
EXTRA_TYPES = {"extraPunctuation", "extraWordError"}
QUOTE_MARKERS = {'"', "''"}
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

WORD_OR_PUNCT = re.compile(r"\w+|[^\w\s]", re.UNICODE)

def starts_with_punct_regex(s: str) -> bool:
    return bool(re.match(r'^\s*[^\w\s]', s, flags=re.UNICODE))

def _norm_corrected_text(it) -> str:
    if not it.get("corrected"):
        return ""
    ctype = it.get("correction_type")
    ctext = str(it.get("corrected_text", ""))
    if ctext.strip() in EMPTY_MARKERS or ctype in EXTRA_TYPES:
        return ""
    return ctext

def next_visible_piece(grammatika, i):
    j = i + 1
    n = len(grammatika)
    while j < n:
        it = grammatika[j]
        if it.get("corrected"):
            txt = _norm_corrected_text(it)
            if txt:
                return ("corrected", txt, it.get("correction_type"), j)
        else:
            txt = str(it.get("text", ""))
            if txt:
                return ("unmarked", txt, None, j)
        j += 1
    return (None, "", None, None)

def add_spaces_around_unmarked(grammatika):
    n = len(grammatika)
    for i, item in enumerate(grammatika):
        if not item.get("corrected"):
            text = str(item.get("text", "")).strip()

            add_leading = False
            if i > 0:
                prev = grammatika[i - 1]
                if prev.get("corrected"):
                    prev_ct = str(prev.get("corrected_text", "")).strip()
                    prev_type = prev.get("correction_type")
                    if (
                        prev_ct not in {'"', "''"}
                        and prev_type not in EXTRA_TYPES
                        and not starts_with_punct_regex(text)
                        and not text.startswith(" ")
                    ):
                        add_leading = True
            if add_leading:
                text = " " + text

            add_trailing = True
            if i == n - 1:
                add_trailing = False
            else:
                kind, nxt_txt, nxt_ctype, _ = next_visible_piece(grammatika, i)
                if not kind:
                    add_trailing = False
                else:
                    if starts_with_punct_regex(nxt_txt):
                        add_trailing = False
                    elif kind == "corrected" and nxt_ctype in PUNCT_TYPES and nxt_txt:
                        add_trailing = False

            if add_trailing and not text.endswith(" "):
                text = text + " "

            item["text"] = text
    return grammatika

def tokenize_with_spans(s: str) -> List[Tuple[int, int, str, str]]:
    spans: List[Tuple[int, int, str, str]] = []
    for m in WORD_OR_PUNCT.finditer(s):
        start, end = m.start(), m.end()
        tok = s[start:end]
        spans.append((start, end, tok, tok))
    return spans

def parse_correction_log(correction_log: str) -> List[Dict[str, Any]]:
    log = (correction_log or "").strip()
    log = re.sub(r'^Parandused:\s*', '', log)
    key_alt = "|".join(re.escape(k) for k in ERROR_TYPE_MAP.keys())
    log = re.sub(
        rf'(?<!^)\s+(?=(?:{key_alt})\s*:\s*#\d+\s+#\d+\b)',
        '\n',
        log,
        flags=re.UNICODE
    )

    items: List[Dict[str, Any]] = []
    for raw in log.splitlines():
        line = raw.strip()
        if not line:
            continue
        m = LOG_LINE_RE.match(line) or LOG_LINE_RE.match(re.sub(r'^\d+\.\s*', '', line))
        if not m:
            continue

        etype_src = m.group("etype").strip()
        sidx = int(m.group("start"))
        eidx = int(m.group("end"))
        wrong = m.group("wrong").strip().strip('"„“«»')
        correct = m.group("correct").strip().strip('"„“«»')

        if eidx < sidx:
            eidx = sidx + 1

        items.append({
            "etype_src": etype_src,
            "etype": ERROR_TYPE_MAP.get(etype_src, "multipleErrors"),
            "start_idx": sidx,
            "end_idx": eidx,
            "wrong": wrong,
            "correct": correct,
        })

    if not items:
        item_re = re.compile(
            rf'(?P<etype>{key_alt})\s*:\s*#(?P<start>\d+)\s+#(?P<end>\d+)\s+'
            rf'(?P<wrong>.*?)\s*->\s*(?P<correct>.*?)'
            rf'(?=(?:\s+(?:{key_alt})\s*:\s*#\d+\s+#\d+)|\s*$)',
            re.UNICODE | re.DOTALL
        )
        for m in item_re.finditer(log):
            etype_src = m.group("etype").strip()
            sidx = int(m.group("start"))
            eidx = int(m.group("end"))
            wrong = m.group("wrong").strip().strip('"„“«»')
            correct = m.group("correct").strip().strip('"„“«»')
            if eidx < sidx:
                eidx = sidx + 1
            items.append({
                "etype_src": etype_src,
                "etype": ERROR_TYPE_MAP.get(etype_src, "multipleErrors"),
                "start_idx": sidx,
                "end_idx": eidx,
                "wrong": wrong,
                "correct": correct,
            })

    return items

def token_range_to_char_span(tokens: List[Tuple[int,int,str,str]],
                             start_idx: int, end_idx: int,
                             wrong_text: str, sentence: str) -> Tuple[int,int]:
    n = len(tokens)

    if 0 <= start_idx == end_idx <= n:
        if start_idx < n:
            pos = tokens[start_idx][0]
        else:
            pos = tokens[-1][1] if n > 0 else 0
        return pos, pos

    if 0 <= start_idx < end_idx <= n:
        s = tokens[start_idx][0]
        e = tokens[end_idx - 1][1]
        if wrong_text and wrong_text not in sentence[s:e]:
            pos = sentence.find(wrong_text)
            if pos != -1:
                return pos, pos + len(wrong_text)
        return s, e

    if wrong_text:
        pos = sentence.find(wrong_text)
        if pos != -1:
            return pos, pos + len(wrong_text)
    return (0, 0)

def generate_test_grammar_output(full_text, api_response: Dict[str, Any]) -> Dict[str, Any]:
    corrections = api_response.get("corrections", [])
    originals = [c["original"] for c in corrections]

    WORD_RE = re.compile(r"^\w+$", re.UNICODE)
    FULL_TOKENS = [(m.start(), m.end(), full_text[m.start():m.end()]) for m in WORD_OR_PUNCT.finditer(full_text)]
    END_TO_IDX = {end: i for i, (start, end, txt) in enumerate(FULL_TOKENS)}

    def find_prev_word_ending_at(pos: int):
        idx = END_TO_IDX.get(pos, None)
        while idx is not None and idx >= 0:
            s_tok, e_tok, txt = FULL_TOKENS[idx]
            if WORD_RE.match(txt):
                return (s_tok, e_tok, txt, idx)
            idx -= 1
        return None

    TOK_BY_END = {end: (start, end, txt) for (start, end, txt) in FULL_TOKENS}

    sentence_offsets = []
    offset = 0
    for i, s in enumerate(originals):
        sentence_offsets.append(offset)
        offset += len(s) + (1 if i < len(originals) - 1 else 0)

    spans = []
    for si in range(len(corrections) - 1, -1, -1):
        corr = corrections[si]
        sent = corr["original"]
        toks = tokenize_with_spans(sent)
        items = parse_correction_log(corr.get("correction_log", ""))

        def _sort_key(it):
            return (it.get("start_idx", 0), it.get("end_idx", 0))
        items.sort(key=_sort_key, reverse=True)

        for it in items:
            s_char, e_char = token_range_to_char_span(
                toks, it["start_idx"], it["end_idx"], it["wrong"], sent
            )
            abs_s = sentence_offsets[si] + s_char
            abs_e = sentence_offsets[si] + e_char
            spans.append({
                "abs_s": abs_s,
                "abs_e": abs_e,
                "wrong": it["wrong"],
                "correct": it["correct"],
                "etype": it["etype"],
                "etype_src": it["etype_src"],
            })

    spans.sort(key=lambda x: (x["abs_s"], x["abs_e"]), reverse=True)

    grammatika_rev = []
    next_right = len(full_text)
    unmarked_id = 0

    for sp in spans:
      s, e = sp["abs_s"], sp["abs_e"]
      corr_txt = sp.get("correct", "")

      if sp.get("etype") in {"extraPunctuation", "extraWordError"}:
          corr_txt = ""

      if e < next_right:
          tail_chunk = full_text[e:next_right]
          if tail_chunk:
              grammatika_rev.append({
                  "corrected": False,
                  "text": tail_chunk.strip(),
                  "error_id": f"{unmarked_id}_unmarked"
              })
              unmarked_id += 1

      is_insertion = (s == e)
      is_missing_punct = (sp.get("etype") == "missingPunctuation")

      if is_insertion and is_missing_punct:
          grammatika_rev.append({
              "corrected": True,
              "text": "",
              "corrected_text": corr_txt.strip(),
              "correction_type": sp["etype"],
              "error_id": f"{s}_marked",
          })

          prev_word = find_prev_word_ending_at(s)
          if prev_word:
              pstart, pend, ptxt, _ = prev_word
              grammatika_rev.append({
                  "corrected": False,
                  "text": full_text[pstart:pend].strip(),
                  "error_id": f"{unmarked_id}_unmarked"
              })
              unmarked_id += 1
              next_right = pstart
          else:
              next_right = s

      else:
          grammatika_rev.append({
              "corrected": True,
              "text": full_text[s:e],
              "corrected_text": corr_txt.strip(),
              "correction_type": sp["etype"],
              "error_id": f"{s}_marked",
          })
          next_right = s

    if 0 < next_right:
        grammatika_rev.append({
            "corrected": False,
            "text": full_text[0:next_right].strip(),
            "error_id": f"{unmarked_id}_unmarked"
        })

    grammatika = list(reversed(grammatika_rev))
    grouped = defaultdict(list)

    for g in grammatika:
        if g.get("corrected"):
            grouped[g["correction_type"]].append(g)

    grammatika_vead = dict(sorted(grouped.items(), key=lambda kv: len(kv[1]), reverse=True))

    return {
        "full_text": full_text,
        "corrector_results": add_spaces_around_unmarked(grammatika),
        "error_list": grammatika_vead,
        "error_count": sum(len(v) for v in grammatika_vead.values())
    }
