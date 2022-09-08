package ee.tlu.evkk.core.service.maps;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class TranslationMappings {

  public static Map<String, String> wordTypes = new HashMap<>();
  public static Set<String> firstType = new HashSet<>();
  public static Set<String> secondType = new HashSet<>();
  public static Map<String, String> numberTranslations = new HashMap<>();
  public static Map<String, String> caseTranslations = new HashMap<>();
  public static Map<String, String> degreeTranslations = new HashMap<>();
  public static Map<String, String> moodTranslations = new HashMap<>();
  public static Map<String, String> personTranslations = new HashMap<>();
  public static Map<String, String> verbFormTranslations = new HashMap<>();


  static {
    wordTypes.put("ADJ", "omadussõna");
    wordTypes.put("ADP", "kaassõna");
    wordTypes.put("ADV", "määrsõna");
    wordTypes.put("AUX", "tegusõna (abitegusõna)");
    wordTypes.put("CCONJ", "sidesõna (rinnastav)");
    wordTypes.put("DET", "asesõna");
    wordTypes.put("INTJ", "hüüdsõna");
    wordTypes.put("NOUN", "nimisõna");
    wordTypes.put("NUM", "arvsõna");
    wordTypes.put("PRON", "asesõna");
    wordTypes.put("PROPN", "nimisõna (pärisnimi)");
    wordTypes.put("SCONJ", "sidesõna (alistav)");
    wordTypes.put("VERB", "tegusõna");
    wordTypes.put("X", "tundmatu");

    firstType.add("NOUN");
    firstType.add("PROPN");
    firstType.add("ADJ");
    firstType.add("DET");
    firstType.add("PRON");
    firstType.add("NUM");

    secondType.add("AUX");
    secondType.add("VERB");

    numberTranslations.put("Sing", "ainsuse");
    numberTranslations.put("Plur", "mitmuse");

    caseTranslations.put("Nom", "nimetav kääne");
    caseTranslations.put("Gen", "omastav kääne");
    caseTranslations.put("Par", "osastav kääne");
    caseTranslations.put("Add", "lühike sisseütlev kääne");
    caseTranslations.put("Ill", "sisseütlev kääne");
    caseTranslations.put("Ine", "seesütlev kääne");
    caseTranslations.put("Ela", "seestütlev kääne");
    caseTranslations.put("All", "alaleütlev kääne");
    caseTranslations.put("Ade", "alalütlev kääne");
    caseTranslations.put("Abl", "alaltütlev kääne");
    caseTranslations.put("Tra", "saav kääne");
    caseTranslations.put("Ter", "rajav kääne");
    caseTranslations.put("Ess", "olev kääne");
    caseTranslations.put("Abe", "ilmaütlev kääne");
    caseTranslations.put("Com", "kaasaütlev kääne");

    degreeTranslations.put("Pos", "algvõrre");
    degreeTranslations.put("Cmp", "keskvõrre");
    degreeTranslations.put("Sup", "ülivõrre");

    moodTranslations.put("Ind", "kindla kõneviisi");
    moodTranslations.put("Cnd", "tingiva kõneviisi");
    moodTranslations.put("Imp", "käskiv kõneviis,");
    moodTranslations.put("Qot", "kaudse kõneviisi");

    personTranslations.put("1", "1. pööre");
    personTranslations.put("2", "2. pööre");
    personTranslations.put("3", "3. pööre");

    verbFormTranslations.put("Inf", "da-tegevusnimi");
    verbFormTranslations.put("Sup", "ma-tegevusnimi");
    verbFormTranslations.put("Conv", "des-vorm");
  }

}
