package ee.tlu.evkk.core.service.maps;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor(access = PRIVATE)
public class FeatTranslationMappings {

  @Getter
  private static final Map<String, String> wordTypesEt = new HashMap<>();
  @Getter
  private static final Set<String> firstType = new HashSet<>();
  @Getter
  private static final Set<String> secondType = new HashSet<>();
  @Getter
  private static final Map<String, String> numberEt = new HashMap<>();
  @Getter
  private static final Map<String, String> caseEt = new HashMap<>();
  @Getter
  private static final Map<String, String> degreeEt = new HashMap<>();
  @Getter
  private static final Map<String, String> moodEt = new HashMap<>();
  @Getter
  private static final Map<String, String> personEt = new HashMap<>();
  @Getter
  private static final Map<String, String> verbEt = new HashMap<>();

  @Getter
  private static final Map<String, String> wordTypesEn = new HashMap<>();
  @Getter
  private static final Map<String, String> numberEn = new HashMap<>();
  @Getter
  private static final Map<String, String> caseEn = new HashMap<>();
  @Getter
  private static final Map<String, String> degreeEn = new HashMap<>();
  @Getter
  private static final Map<String, String> moodEn = new HashMap<>();
  @Getter
  private static final Map<String, String> personEn = new HashMap<>();
  @Getter
  private static final Map<String, String> verbFormEn = new HashMap<>();


  static {
    wordTypesEt.put("ADJ", "omadussõna");
    wordTypesEt.put("ADP", "kaassõna");
    wordTypesEt.put("ADV", "määrsõna");
    wordTypesEt.put("AUX", "tegusõna (abitegusõna)");
    wordTypesEt.put("CCONJ", "sidesõna (rinnastav)");
    wordTypesEt.put("DET", "asesõna");
    wordTypesEt.put("INTJ", "hüüdsõna");
    wordTypesEt.put("NOUN", "nimisõna");
    wordTypesEt.put("NUM", "arvsõna");
    wordTypesEt.put("PRON", "asesõna");
    wordTypesEt.put("PROPN", "nimisõna (pärisnimi)");
    wordTypesEt.put("SCONJ", "sidesõna (alistav)");
    wordTypesEt.put("VERB", "tegusõna");
    wordTypesEt.put("X", "tundmatu");
    wordTypesEt.put("SYM", "–");
    wordTypesEt.put("PUNCT", "–");
    wordTypesEt.put("PART", "–");
    wordTypesEt.put("–", "–");

    firstType.add("NOUN");
    firstType.add("PROPN");
    firstType.add("ADJ");
    firstType.add("DET");
    firstType.add("PRON");
    firstType.add("NUM");

    secondType.add("AUX");
    secondType.add("VERB");

    numberEt.put("Sing", "ainsuse");
    numberEt.put("Plur", "mitmuse");

    caseEt.put("Nom", "nimetav kääne");
    caseEt.put("Gen", "omastav kääne");
    caseEt.put("Par", "osastav kääne");
    caseEt.put("Add", "lühike sisseütlev kääne");
    caseEt.put("Ill", "sisseütlev kääne");
    caseEt.put("Ine", "seesütlev kääne");
    caseEt.put("Ela", "seestütlev kääne");
    caseEt.put("All", "alaleütlev kääne");
    caseEt.put("Ade", "alalütlev kääne");
    caseEt.put("Abl", "alaltütlev kääne");
    caseEt.put("Tra", "saav kääne");
    caseEt.put("Ter", "rajav kääne");
    caseEt.put("Ess", "olev kääne");
    caseEt.put("Abe", "ilmaütlev kääne");
    caseEt.put("Com", "kaasaütlev kääne");

    degreeEt.put("Pos", "algvõrre");
    degreeEt.put("Cmp", "keskvõrre");
    degreeEt.put("Sup", "ülivõrre");

    moodEt.put("Ind", "kindla kõneviisi");
    moodEt.put("Cnd", "tingiva kõneviisi");
    moodEt.put("Imp", "käskiv kõneviis,");
    moodEt.put("Qot", "kaudse kõneviisi");

    personEt.put("1", "1. pööre");
    personEt.put("2", "2. pööre");
    personEt.put("3", "3. pööre");

    verbEt.put("Inf", "da-tegevusnimi");
    verbEt.put("Sup", "ma-tegevusnimi");
    verbEt.put("Conv", "des-vorm");


    wordTypesEn.put("ADJ", "adjective");
    wordTypesEn.put("ADP", "adposition");
    wordTypesEn.put("ADV", "adverb");
    wordTypesEn.put("AUX", "verb (auxiliary)");
    wordTypesEn.put("CCONJ", "conjunction (coordinating)");
    wordTypesEn.put("DET", "pronoun");
    wordTypesEn.put("INTJ", "interjection");
    wordTypesEn.put("NOUN", "noun");
    wordTypesEn.put("NUM", "numeral");
    wordTypesEn.put("PRON", "pronoun");
    wordTypesEn.put("PROPN", "noun (proper)");
    wordTypesEn.put("SCONJ", "conjunction (subordinating)");
    wordTypesEn.put("VERB", "verb");
    wordTypesEn.put("X", "unknown");
    wordTypesEn.put("SYM", "–");
    wordTypesEn.put("PUNCT", "–");
    wordTypesEn.put("PART", "–");
    wordTypesEn.put("–", "–");

    numberEn.put("Sing", "singular");
    numberEn.put("Plur", "plural");

    caseEn.put("Nom", "nominative");
    caseEn.put("Gen", "genitive");
    caseEn.put("Par", "partitive");
    caseEn.put("Add", "additive");
    caseEn.put("Ill", "illative");
    caseEn.put("Ine", "inessive");
    caseEn.put("Ela", "elative");
    caseEn.put("All", "allative");
    caseEn.put("Ade", "adessive");
    caseEn.put("Abl", "ablative");
    caseEn.put("Tra", "translative");
    caseEn.put("Ter", "terminative");
    caseEn.put("Ess", "essive");
    caseEn.put("Abe", "abessive");
    caseEn.put("Com", "comitative");

    degreeEn.put("Pos", "positive");
    degreeEn.put("Cmp", "comparative");
    degreeEn.put("Sup", "superlative");

    moodEn.put("Ind", "indicative");
    moodEn.put("Cnd", "conditional");
    moodEn.put("Imp", "imperative");
    moodEn.put("Qot", "quotative");

    personEn.put("1", "1st person");
    personEn.put("2", "2nd person");
    personEn.put("3", "3rd person");

    verbFormEn.put("Inf", "-da infinitive");
    verbFormEn.put("Sup", "-ma infinitive");
    verbFormEn.put("Conv", "gerund (-des form)");
  }

}
