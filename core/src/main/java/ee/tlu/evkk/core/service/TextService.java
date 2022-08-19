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

import static ee.tlu.evkk.core.service.maps.TranslationMappings.caseTranslations;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.degreeTranslations;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.firstType;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.moodTranslations;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.numberTranslations;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.personTranslations;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.secondType;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.verbFormTranslations;
import static ee.tlu.evkk.core.service.maps.TranslationMappings.wordTypes;
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
    return stream(tekst).map(wordTypes::get).toArray(String[]::new);
  }

  public List<String> translateFeats(String[][] tekst) {
    List<String> result = new ArrayList<>();

    for (String[] word: tekst) {
      // muutumatud sõnad
      if (word[1] == null || word[1].equals("–")) {
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
              tenseLabel = new StringBuilder("oleviku kesksõna");
            } else {
              tenseLabel = new StringBuilder("mineviku kesksõna");
            }
          }
          if (feat.contains("Voice")) {
            if (tenseLabel.toString().equals("mineviku kesksõna")) {
              if (feat.split("=")[1].equals("Act")) {
                tenseLabel.append(" nud-vorm");
              } else {
                tenseLabel.append(" tud-vorm");
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
              if (!Objects.equals(personVoiceLabel, "umbisikuline tegumood")) {
                personVoiceLabel = personTranslations.get(feat.split("=")[1]);
              }
            }
          }

          StringBuilder subResult = new StringBuilder(moodLabel);
          if (!Objects.equals(moodLabel, "käskiv kõneviis,")) {
            subResult.append(" ").append(tenseLabel);
          }
          if (!negativityLabel.equals("eitus") && !Objects.equals(personVoiceLabel, "umbisikuline tegumood") && !numberLabel.isEmpty()) {
            if (!tenseLabel.isEmpty()) {
              subResult.append(",");
            }
            subResult.append(" ").append(numberLabel);
          }
          if (!negativityLabel.equals("eitus") && !personVoiceLabel.isEmpty()) {
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
