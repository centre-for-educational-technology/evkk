package ee.tlu.evkk.core.service.maps;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class TranslationMappings {

  public static Map<String, String> wordTypesEt = new HashMap<>();
  public static Set<String> firstType = new HashSet<>();
  public static Set<String> secondType = new HashSet<>();
  public static Map<String, String> numberTranslationsEt = new HashMap<>();
  public static Map<String, String> caseTranslationsEt = new HashMap<>();
  public static Map<String, String> degreeTranslationsEt = new HashMap<>();
  public static Map<String, String> moodTranslationsEt = new HashMap<>();
  public static Map<String, String> personTranslationsEt = new HashMap<>();
  public static Map<String, String> verbFormTranslationsEt = new HashMap<>();

  public static Map<String, String> wordTypesEn = new HashMap<>();
  public static Map<String, String> numberTranslationsEn = new HashMap<>();
  public static Map<String, String> caseTranslationsEn = new HashMap<>();
  public static Map<String, String> degreeTranslationsEn = new HashMap<>();
  public static Map<String, String> moodTranslationsEn = new HashMap<>();
  public static Map<String, String> personTranslationsEn = new HashMap<>();
  public static Map<String, String> verbFormTranslationsEn = new HashMap<>();


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

    firstType.add("NOUN");
    firstType.add("PROPN");
    firstType.add("ADJ");
    firstType.add("DET");
    firstType.add("PRON");
    firstType.add("NUM");

    secondType.add("AUX");
    secondType.add("VERB");

    numberTranslationsEt.put("Sing", "ainsuse");
    numberTranslationsEt.put("Plur", "mitmuse");

    caseTranslationsEt.put("Nom", "nimetav kääne");
    caseTranslationsEt.put("Gen", "omastav kääne");
    caseTranslationsEt.put("Par", "osastav kääne");
    caseTranslationsEt.put("Add", "lühike sisseütlev kääne");
    caseTranslationsEt.put("Ill", "sisseütlev kääne");
    caseTranslationsEt.put("Ine", "seesütlev kääne");
    caseTranslationsEt.put("Ela", "seestütlev kääne");
    caseTranslationsEt.put("All", "alaleütlev kääne");
    caseTranslationsEt.put("Ade", "alalütlev kääne");
    caseTranslationsEt.put("Abl", "alaltütlev kääne");
    caseTranslationsEt.put("Tra", "saav kääne");
    caseTranslationsEt.put("Ter", "rajav kääne");
    caseTranslationsEt.put("Ess", "olev kääne");
    caseTranslationsEt.put("Abe", "ilmaütlev kääne");
    caseTranslationsEt.put("Com", "kaasaütlev kääne");

    degreeTranslationsEt.put("Pos", "algvõrre");
    degreeTranslationsEt.put("Cmp", "keskvõrre");
    degreeTranslationsEt.put("Sup", "ülivõrre");

    moodTranslationsEt.put("Ind", "kindla kõneviisi");
    moodTranslationsEt.put("Cnd", "tingiva kõneviisi");
    moodTranslationsEt.put("Imp", "käskiv kõneviis,");
    moodTranslationsEt.put("Qot", "kaudse kõneviisi");

    personTranslationsEt.put("1", "1. pööre");
    personTranslationsEt.put("2", "2. pööre");
    personTranslationsEt.put("3", "3. pööre");

    verbFormTranslationsEt.put("Inf", "da-tegevusnimi");
    verbFormTranslationsEt.put("Sup", "ma-tegevusnimi");
    verbFormTranslationsEt.put("Conv", "des-vorm");


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

    numberTranslationsEn.put("Sing", "singular");
    numberTranslationsEn.put("Plur", "plural");

    caseTranslationsEn.put("Nom", "nominative");
    caseTranslationsEn.put("Gen", "genitive");
    caseTranslationsEn.put("Par", "partitive");
    caseTranslationsEn.put("Add", "additive");
    caseTranslationsEn.put("Ill", "illative");
    caseTranslationsEn.put("Ine", "inessive");
    caseTranslationsEn.put("Ela", "elative");
    caseTranslationsEn.put("All", "allative");
    caseTranslationsEn.put("Ade", "adessive");
    caseTranslationsEn.put("Abl", "ablative");
    caseTranslationsEn.put("Tra", "translative");
    caseTranslationsEn.put("Ter", "terminative");
    caseTranslationsEn.put("Ess", "essive");
    caseTranslationsEn.put("Abe", "abessive");
    caseTranslationsEn.put("Com", "comitative");

    degreeTranslationsEn.put("Pos", "positive");
    degreeTranslationsEn.put("Cmp", "comparative");
    degreeTranslationsEn.put("Sup", "superlative");

    moodTranslationsEn.put("Ind", "indicative");
    moodTranslationsEn.put("Cnd", "conditional");
    moodTranslationsEn.put("Imp", "imperative");
    moodTranslationsEn.put("Qot", "quotative");

    personTranslationsEn.put("1", "1st person");
    personTranslationsEn.put("2", "2nd person");
    personTranslationsEn.put("3", "3rd person");

    verbFormTranslationsEn.put("Inf", "-da infinitive");
    verbFormTranslationsEn.put("Sup", "-ma infinitive");
    verbFormTranslationsEn.put("Conv", "gerund (-des form)");
  }

}
