package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;
import ee.tlu.evkk.dal.json.Json;
import ee.tlu.evkk.dal.repository.TextPropertyRepository;
import ee.tlu.evkk.dal.repository.TextRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Service
public class TextService {

  private final TextRepository textRepository;
  private final TextPropertyRepository textPropertyRepository;
  private final TextProcessorService textProcessorService;

  public TextService(TextRepository textRepository, TextPropertyRepository textPropertyRepository, TextProcessorService textProcessorService) {
    this.textRepository = textRepository;
    this.textPropertyRepository = textPropertyRepository;
    this.textProcessorService = textProcessorService;
  }

  public String annotateWithEstnltk(UUID textId) {
    Json json = textProcessorService.processText(TextProcessor.Type.ANNOTATE_ESTNLTK, textId);
    return json.getAsObject(String.class);
  }

  public List<TextWithProperties> search(Pageable pageable, String[] korpus, String tekstityyp, String tekstikeel, String keeletase, Boolean abivahendid,
                                         Integer aasta, String sugu) {

    Map<String, Collection<String>> filters = buildFilters(korpus, tekstityyp, tekstikeel, keeletase, abivahendid, aasta, sugu);
    List<Text> texts = textRepository.search(filters, pageable);
    Set<UUID> textIds = texts.stream().map(Text::getId).collect(Collectors.toUnmodifiableSet());
    Map<UUID, List<TextProperty>> textPropertiesByTextId = textPropertyRepository.findByTextIds(textIds).stream().collect(Collectors.groupingBy(TextProperty::getTextId));
    return texts.stream().map(text -> toTextWithProperties(text, textPropertiesByTextId)).collect(Collectors.toUnmodifiableList());
  }

  public String[] translateWordType(String[] tekst) {
    Map<String, String> translations = new HashMap<>();
    translations.put("ADJ", "omadussõna");
    translations.put("ADP", "kaassõna");
    translations.put("ADV", "määrsõna");
    translations.put("AUX", "tegusõna (abitegusõna)");
    translations.put("CCONJ", "sidesõna (rinnastav)");
    translations.put("DET", "asesõna");
    translations.put("INTJ", "hüüdsõna");
    translations.put("NOUN", "nimisõna");
    translations.put("NUM", "arvsõna");
    translations.put("PRON", "asesõna");
    translations.put("PROPN", "nimisõna (pärisnimi)");
    translations.put("SCONJ", "sidesõna (alistav)");
    translations.put("VERB", "tegusõna");
    translations.put("X", "tundmatu");
    for (int i = 0; i < tekst.length; i++) {
      tekst[i] = translations.get(tekst[i]);
    }
    return tekst;
  }

  public List<String> translateFeats(String[][] tekst) {
    List<String> result = new ArrayList<>();

    String[] firstType = new String[]{"NOUN", "PROPN", "ADJ", "DET", "PRON", "NUM"};
    String[] secondType = new String[]{"AUX", "VERB"};

    Map<String, String> numberTranslations = new HashMap<>();
    numberTranslations.put("Sing", "ainsuse");
    numberTranslations.put("Plur", "mitmuse");

    Map<String, String> caseTranslations = new HashMap<>();
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

    Map<String, String> degreeTranslations = new HashMap<>();
    degreeTranslations.put("Pos", "algvõrre");
    degreeTranslations.put("Cmp", "keskvõrre");
    degreeTranslations.put("Sup", "ülivõrre");

    Map<String, String> moodTranslations = new HashMap<>();
    moodTranslations.put("Ind", "kindla kõneviisi");
    moodTranslations.put("Cnd", "tingiva kõneviisi");
    moodTranslations.put("Imp", "käskiv kõneviis,");
    moodTranslations.put("Qot", "kaudse kõneviisi");

    Map<String, String> personTranslations = new HashMap<>();
    personTranslations.put("1", "1. pööre");
    personTranslations.put("2", "2. pööre");
    personTranslations.put("3", "3. pööre");

    Map<String, String> verbFormTranslations = new HashMap<>();
    verbFormTranslations.put("Inf", "da-tegevusnimi");
    verbFormTranslations.put("Sup", "ma-tegevusnimi");
    verbFormTranslations.put("Conv", "des-vorm");

    for (String[] word: tekst) {
      // muutumatud sõnad
      if (word[1] == null || word[1].equals("–")) {
        result.add("–");
      }

      // käändsõnad
      else if (Arrays.asList(firstType).contains(word[0])) {
        String[] feats = word[1].split("\\|");
        String numberLabel = "";
        String caseLabel = "";
        String degreeLabel = "";
        String tenseLabel = "";

        for (String feat: feats) {
          if (feat.contains("Number")) {
            numberLabel = numberTranslations.get(feat.split("=")[1]);
          }
          if (feat.contains("Case")) {
            caseLabel = caseTranslations.get(feat.split("=")[1]);
          }
          if (feat.contains("Degree")) {
            degreeLabel = degreeTranslations.get(feat.split("=")[1]);
          }
          if (feat.contains("Tense")) {
            if (feat.split("=")[1].equals("Pres")) {
              tenseLabel = "oleviku kesksõna";
            } else {
              tenseLabel = "mineviku kesksõna";
            }
          }
          if (feat.contains("Voice")) {
            if (tenseLabel.equals("mineviku kesksõna")) {
              if (feat.split("=")[1].equals("Act")) {
                tenseLabel += " nud-vorm";
              } else {
                tenseLabel += " tud-vorm";
              }
            }
          }
        }

        String subResult = "";
        if (!numberLabel.isEmpty()) {
          subResult += numberLabel + " ";
        }
        if (!caseLabel.isEmpty()) {
          subResult += caseLabel;
        }
        if (!degreeLabel.isEmpty()) {
          if (!subResult.isEmpty()) {
            subResult += ", ";
          }
          subResult += degreeLabel;
        }
        if (!tenseLabel.isEmpty()) {
          if (!subResult.isEmpty()) {
            subResult += ", ";
          }
          subResult += tenseLabel;
        }
        result.add(subResult);
      }

      // tegusõnad
      else if (Arrays.asList(secondType).contains(word[0])) {
        String[] feats = word[1].split("\\|");
        String moodLabel = "";
        String tenseLabel = "";
        String numberLabel = "";
        String personVoiceLabel = "";
        String negativityLabel = "";
        String verbFormLabel = "";

        // Polarity=Neg only
        if (word[1].equals("Polarity=Neg")) {
          result.add("eitussõna");
        }

        // pöördelised vormid
        else if (Arrays.asList(feats).contains("VerbForm=Fin")) {
          for (String feat: feats) {
            if (feat.contains("Mood")) {
              moodLabel = moodTranslations.get(feat.split("=")[1]);
            }
            if (feat.contains("Number")) {
              numberLabel = numberTranslations.get(feat.split("=")[1]);
            }
            if (feat.contains("Voice")) {
              if (feat.split("=")[1].equals("Pass")) {
                personVoiceLabel = "umbisikuline tegumood";
              }
            }
            if (feat.contains("Polarity") || feat.contains("Connegative")) {
              if (feat.split("=")[1].equals("Neg") || feat.split("=")[1].equals("Yes")) {
                negativityLabel = "eitus";
              }
            }
          }
          for (String feat: feats) {
            if (feat.contains("Tense")) {
              if (feat.split("=")[1].equals("Pres")) {
                tenseLabel = "olevik";
              } else {
                if (moodLabel.equals("kindla kõneviisi")) {
                  tenseLabel = "lihtminevik";
                } else if (moodLabel.equals("tingiva kõneviisi") || moodLabel.equals("kaudse kõneviisi")) {
                  tenseLabel = "minevik";
                }
              }
            }
            if (feat.contains("Person")) {
              if (personVoiceLabel != "umbisikuline tegumood") {
                personVoiceLabel = personTranslations.get(feat.split("=")[1]);
              }
            }
          }

          String subResult = moodLabel;
          if (moodLabel != "käskiv kõneviis,") {
            subResult += " " + tenseLabel;
          }
          if (negativityLabel != "eitus" && personVoiceLabel != "umbisikuline tegumood" && !numberLabel.isEmpty()) {
            if (!tenseLabel.isEmpty()) {
              subResult += ",";
            }
            subResult += " " + numberLabel;
          }
          if (negativityLabel != "eitus" && !personVoiceLabel.isEmpty()) {
            if (numberLabel.isEmpty()) {
              subResult += ",";
            }
            subResult += " " + personVoiceLabel;
          }
          if (!negativityLabel.isEmpty()) {
            if (personVoiceLabel.isEmpty() && numberLabel.isEmpty()) {
              subResult += ",";
            }
            subResult += " " + negativityLabel;
          }
          result.add(subResult);
        }

        // käändelised vormid
        else {
          if (Arrays.asList(feats).contains("VerbForm=Part") && Arrays.asList(feats).contains("Tense=Past")) {
            if (Arrays.asList(feats).contains("Voice=Act")) {
              verbFormLabel = "mineviku kesksõna nud-vorm";
            } else if (Arrays.asList(feats).contains("Voice=Pass")) {
              verbFormLabel = "mineviku kesksõna tud-vorm";
            }
          } else {
            for (String feat: feats) {
              if (feat.split("=")[0].equals("VerbForm")) {
                verbFormLabel = verbFormTranslations.get(feat.split("=")[1]);
              }
            }
          }
          result.add(verbFormLabel);
        }
      }
    }

    return result;
  }

  private Map<String, Collection<String>> buildFilters(String[] korpus, String tekstityyp, String tekstikeel, String keeletase, Boolean abivahendid,
                                                       Integer aasta, String sugu) {

    Map<String, Collection<String>> result = new HashMap<>();
    if (korpus != null && korpus.length > 0) result.put("korpus", Set.of(korpus));
    if (hasText(tekstityyp)) result.put("tekstityyp", Set.of(tekstityyp));
    if (hasText(tekstikeel)) result.put("tekstikeel", Set.of(tekstikeel));
    if (hasText(keeletase)) result.put("keeletase", Set.of(keeletase));
    if (abivahendid != null) result.put("abivahendid", Set.of(booleanToJahEi(abivahendid)));
    if (aasta != null) result.put("aasta", Set.of(aasta.toString()));
    if (hasText(sugu)) result.put("sugu", Set.of(sugu));
    return Collections.unmodifiableMap(result);
  }

  private static boolean hasText(String input) {
    return input != null && !input.isBlank();
  }

  private static String booleanToJahEi(Boolean bool) {
    if (bool == null) return null;
    return bool ? "jah" : "ei";
  }

  private TextWithProperties toTextWithProperties(Text text, Map<UUID, List<TextProperty>> textPropertiesByTextId) {
    List<TextProperty> properties = textPropertiesByTextId.getOrDefault(text.getId(), Collections.emptyList());
    return new TextWithProperties(text, properties);
  }

}
