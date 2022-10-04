package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.core.service.maps.TranslationMappings;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;
import ee.tlu.evkk.dal.json.Json;
import ee.tlu.evkk.dal.repository.TextPropertyRepository;
import ee.tlu.evkk.dal.repository.TextRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static ee.tlu.evkk.core.service.maps.TranslationMappings.caseTranslationsEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.caseTranslationsEt;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.degreeTranslationsEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.degreeTranslationsEt;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.moodTranslationsEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.moodTranslationsEt;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.numberTranslationsEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.numberTranslationsEt;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.personTranslationsEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.personTranslationsEt;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.verbFormTranslationsEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.verbFormTranslationsEt;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.wordTypesEn;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.wordTypesEt;
import static java.util.Arrays.stream;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Service
public class TextService {

  private final TextRepository textRepository;
  private final TextPropertyRepository textPropertyRepository;
  private final TextProcessorService textProcessorService;

  private static Map<String, String> wordTypes;
  private static Set<String> firstType = TranslationMappings.firstType;
  private static Set<String> secondType = TranslationMappings.secondType;
  private static Map<String, String> numberTranslations;
  private static Map<String, String> caseTranslations;
  private static Map<String, String> degreeTranslations;
  private static Map<String, String> moodTranslations;
  private static Map<String, String> personTranslations;
  private static Map<String, String> verbFormTranslations;
  private static StringBuilder tensePrefixPresent;
  private static StringBuilder tensePrefixPast;
  private static String tensePostfixNud;
  private static String tensePostfixTud;
  private static String negPolarity;
  private static String negation;
  private static String impersonal;
  private static String present;
  private static String simplePast;
  private static String past;
  private static String inflectedFormNudParticiple;
  private static String inflectedFormTudParticiple;
  private static String imperativeMood;

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

  public static String[] translateWordType(String[] tekst, String language) {
    if (language.equals("et")) {
      wordTypes = wordTypesEt;
    } else {
      wordTypes = wordTypesEn;
    }
    return stream(tekst).map(wordTypes::get).toArray(String[]::new);
  }

  public List<String> translateFeats(String[][] tekst, String language) {
    getLanguageMappings(language);
    List<String> result = new ArrayList<>();

    for (String[] word : tekst) {
      // muutumatud sõnad (Abbr=Yes ehk lühendid; NumForm=Digit ehk arvud jne)
      if (word[1] == null || word[1].equals("–") || word[1].equals("Abbr=Yes") || word[1].contains("NumForm=Digit")) {
        result.add("–");
      }

      // käändsõnad
      else if (firstType.contains(word[0])) {
        String[] feats = word[1].split("\\|");
        String numberLabel = "";
        String caseLabel = "";
        String degreeLabel = "";
        StringBuilder tenseLabel = new StringBuilder();

        for (String feat : feats) {
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
              tenseLabel = tensePrefixPresent;
            } else {
              tenseLabel = tensePrefixPast;
            }
          }
          if (feat.contains("Voice")) {
            if (tenseLabel.toString().equals(tensePrefixPast.toString())) {
              if (feat.split("=")[1].equals("Act")) {
                tenseLabel.append(tensePostfixNud);
              } else {
                tenseLabel.append(tensePostfixTud);
                if (language.equals("en")) {
                  tenseLabel.insert(0, "im");
                }
              }
            }
          }
        }

        StringBuilder subResult = new StringBuilder();
        if (!numberLabel.isEmpty()) {
          subResult.append(numberLabel).append(" ");
        }
        if (!caseLabel.isEmpty()) {
          subResult.append(caseLabel);
        }
        if (!degreeLabel.isEmpty()) {
          if (!subResult.toString().isEmpty()) {
            subResult.append(", ");
          }
          subResult.append(degreeLabel);
        }
        if (tenseLabel.length() > 0) {
          if (!subResult.toString().isEmpty()) {
            subResult.append(", ");
          }
          subResult.append(tenseLabel);
        }
        result.add(subResult.toString());
      }

      // tegusõnad
      else if (secondType.contains(word[0])) {
        String[] feats = word[1].split("\\|");
        String moodLabel = "";
        String tenseLabel = "";
        String numberLabel = "";
        String personVoiceLabel = "";
        String negativityLabel = "";
        String verbFormLabel = "";

        // Polarity=Neg only
        if (word[1].equals("Polarity=Neg")) {
          result.add(negPolarity);
        }

        // pöördelised vormid
        else if (Arrays.asList(feats).contains("VerbForm=Fin")) {
          for (String feat : feats) {
            if (feat.contains("Mood")) {
              moodLabel = moodTranslations.get(feat.split("=")[1]);
            }
            if (feat.contains("Number")) {
              numberLabel = numberTranslations.get(feat.split("=")[1]);
            }
            if (feat.contains("Voice")) {
              if (feat.split("=")[1].equals("Pass")) {
                personVoiceLabel = impersonal;
              }
            }
            if (feat.contains("Polarity") || feat.contains("Connegative")) {
              if (feat.split("=")[1].equals("Neg") || feat.split("=")[1].equals("Yes")) {
                negativityLabel = negation;
              }
            }
          }
          for (String feat : feats) {
            if (feat.contains("Tense")) {
              if (feat.split("=")[1].equals("Pres")) {
                tenseLabel = present;
              } else {
                if (language.equals("en")) {
                  tenseLabel = past;
                } else {
                  if (moodLabel.equals("kindla kõneviisi")) {
                    tenseLabel = simplePast;
                  } else if (moodLabel.equals("tingiva kõneviisi") || moodLabel.equals("kaudse kõneviisi")) {
                    tenseLabel = past;
                  }
                }
              }
            }
            if (feat.contains("Person")) {
              if (!Objects.equals(personVoiceLabel, impersonal)) {
                personVoiceLabel = personTranslations.get(feat.split("=")[1]);
              }
            }
          }

          StringBuilder subResult = new StringBuilder(moodLabel);
          if (!Objects.equals(moodLabel, imperativeMood)) {
            subResult.append(" ").append(tenseLabel);
          }
          if (!negativityLabel.equals(negation) && !Objects.equals(personVoiceLabel, impersonal) && !numberLabel.isEmpty()) {
            if (!tenseLabel.isEmpty()) {
              subResult.append(",");
            }
            subResult.append(" ").append(numberLabel);
          }
          if (!negativityLabel.equals(negation) && !personVoiceLabel.isEmpty()) {
            if (numberLabel.isEmpty()) {
              subResult.append(",");
            }
            subResult.append(" ").append(personVoiceLabel);
          }
          if (!negativityLabel.isEmpty()) {
            if (personVoiceLabel.isEmpty() && numberLabel.isEmpty()) {
              subResult.append(",");
            }
            subResult.append(" ").append(negativityLabel);
          }
          result.add(subResult.toString());
        }

        // käändelised vormid (inflected form)
        else {
          if (Arrays.asList(feats).contains("VerbForm=Part") && Arrays.asList(feats).contains("Tense=Past")) {
            if (Arrays.asList(feats).contains("Voice=Act")) {
              verbFormLabel = inflectedFormNudParticiple;
            } else if (Arrays.asList(feats).contains("Voice=Pass")) {
              verbFormLabel = inflectedFormTudParticiple;
            }
          } else {
            for (String feat : feats) {
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

  private static void getLanguageMappings(String language) {
    if (language.equals("et")) {
      numberTranslations = numberTranslationsEt;
      caseTranslations = caseTranslationsEt;
      degreeTranslations = degreeTranslationsEt;
      moodTranslations = moodTranslationsEt;
      personTranslations = personTranslationsEt;
      verbFormTranslations = verbFormTranslationsEt;
      tensePrefixPresent = new StringBuilder("oleviku kesksõna");
      tensePrefixPast = new StringBuilder("mineviku kesksõna");
      tensePostfixNud = " nud-vorm";
      tensePostfixTud = " tud-vorm";
      negPolarity = "eitussõna";
      negation = "eitus";
      impersonal = "umbisikuline tegumood";
      present = "olevik";
      simplePast = "lihtminevik";
      past = "minevik";
      inflectedFormNudParticiple = "mineviku kesksõna nud-vorm";
      inflectedFormTudParticiple = "mineviku kesksõna tud-vorm";
      imperativeMood = "käskiv kõneviis,";
    } else {
      numberTranslations = numberTranslationsEn;
      caseTranslations = caseTranslationsEn;
      degreeTranslations = degreeTranslationsEn;
      moodTranslations = moodTranslationsEn;
      personTranslations = personTranslationsEn;
      verbFormTranslations = verbFormTranslationsEn;
      tensePrefixPresent = new StringBuilder("present participle");
      tensePrefixPast = new StringBuilder("personal past participle");
      tensePostfixNud = " (-nud)";
      tensePostfixTud = " (-tud)";
      negPolarity = "negative particle";
      negation = "negation";
      impersonal = "impersonal";
      present = "present";
      past = "past";
      inflectedFormNudParticiple = "personal past participle (-nud)";
      inflectedFormTudParticiple = "impersonal past participle (-tud)";
      imperativeMood = "imperative,";
    }
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
