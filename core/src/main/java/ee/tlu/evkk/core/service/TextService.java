package ee.tlu.evkk.core.service;

import ee.evkk.dto.AddingRequestDto;
import ee.tlu.evkk.core.service.dto.CorpusDownloadDto;
import ee.tlu.evkk.core.service.dto.CorpusRequestDto;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.core.service.maps.TranslationMappings;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.CorpusDownloadResponseEntity;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;
import ee.tlu.evkk.dal.dto.TextQueryDisjunctionParamHelper;
import ee.tlu.evkk.dal.dto.TextQueryMultiParamHelper;
import ee.tlu.evkk.dal.dto.TextQueryRangeParamBaseHelper;
import ee.tlu.evkk.dal.dto.TextQueryRangeParamHelper;
import ee.tlu.evkk.dal.dto.TextQuerySingleParamHelper;
import ee.tlu.evkk.dal.repository.TextPropertyRepository;
import ee.tlu.evkk.dal.repository.TextRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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
import static java.io.File.createTempFile;
import static java.lang.String.format;
import static java.lang.System.lineSeparator;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Arrays.asList;
import static java.util.Arrays.stream;
import static java.util.UUID.randomUUID;
import static java.util.regex.Pattern.compile;
import static org.apache.logging.log4j.util.Strings.isBlank;
import static org.apache.logging.log4j.util.Strings.isNotBlank;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Service
public class TextService {

  private final TextRepository textRepository;
  private final TextPropertyRepository textPropertyRepository;
  private final TextDao textDao;

  private static final Set<String> firstType = TranslationMappings.firstType;
  private static final Set<String> secondType = TranslationMappings.secondType;
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

  private static final Pattern fileNameCharacterWhitelist = compile("[\\p{L}0-9& ._()!-]");

  public TextService(TextRepository textRepository, TextPropertyRepository textPropertyRepository, TextDao textDao) {
    this.textRepository = textRepository;
    this.textPropertyRepository = textPropertyRepository;
    this.textDao = textDao;
  }

  public List<TextWithProperties> search(Pageable pageable, String[] korpus, String tekstityyp, String tekstikeel, String keeletase, Boolean abivahendid, Integer aasta, String sugu) {
    Map<String, Collection<String>> filters = buildFilters(korpus, tekstityyp, tekstikeel, keeletase, abivahendid, aasta, sugu);
    List<Text> texts = textRepository.search(filters, pageable);
    Set<UUID> textIds = texts.stream().map(Text::getId).collect(Collectors.toUnmodifiableSet());
    Map<UUID, List<TextProperty>> textPropertiesByTextId = textPropertyRepository.findByTextIds(textIds).stream().collect(Collectors.groupingBy(TextProperty::getTextId));
    return texts.stream().map(text -> toTextWithProperties(text, textPropertiesByTextId)).collect(Collectors.toUnmodifiableList());
  }

  public String detailneparing(CorpusRequestDto corpusRequestDto) {
    List<TextQuerySingleParamHelper> singleParamHelpers = new ArrayList<>();
    List<TextQueryRangeParamBaseHelper> rangeParamBaseHelpers = new ArrayList<>();
    List<TextQueryMultiParamHelper> multiParamHelpers = new ArrayList<>();

    TextQueryDisjunctionParamHelper studyLevelAndDegreeHelper = new TextQueryDisjunctionParamHelper("p13", "teaduskraad", "oppeaste");
    TextQuerySingleParamHelper otherLangHelper = new TextQuerySingleParamHelper();
    TextQueryMultiParamHelper usedMultiMaterialsHelper = new TextQueryMultiParamHelper();

    multiParamHelpers.add(new TextQueryMultiParamHelper("p3", "korpus", corpusRequestDto.getCorpuses()));

    if (corpusRequestDto.getTypes() != null && !corpusRequestDto.getTypes().isEmpty()) {
      multiParamHelpers.add(new TextQueryMultiParamHelper("p4", "tekstityyp", corpusRequestDto.getTypes()));
    }
    if (isNotBlank(corpusRequestDto.getLanguage())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p5", "tekstikeel", corpusRequestDto.getLanguage()));
    }
    if (isNotBlank(corpusRequestDto.getLevel())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p6", "keeletase", corpusRequestDto.getLevel()));
    }
    if (isNotBlank(corpusRequestDto.getDomain())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p7", "eriala", corpusRequestDto.getDomain()));
    }
    if (isNotBlank(corpusRequestDto.getUsedMaterials())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p8", "abivahendid", corpusRequestDto.getUsedMaterials()));
    }
    if (corpusRequestDto.getUsedMultiMaterials() != null && !corpusRequestDto.getUsedMultiMaterials().isEmpty()) {
      usedMultiMaterialsHelper.setTable("p9");
      usedMultiMaterialsHelper.setParameter("akad_oppematerjal");
      usedMultiMaterialsHelper.setValues(corpusRequestDto.getUsedMultiMaterials());
    }
    if (isNotBlank(corpusRequestDto.getAge())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p10", "vanus", corpusRequestDto.getAge()));
    }
    if (isNotBlank(corpusRequestDto.getGender())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p11", "sugu", corpusRequestDto.getGender()));
    }
    if (isNotBlank(corpusRequestDto.getEducation())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p12", "haridus", corpusRequestDto.getEducation()));
    }
    if (isNotBlank(corpusRequestDto.getDegree()) && isBlank(corpusRequestDto.getStudyLevel())) {
      studyLevelAndDegreeHelper.setFirstValue(corpusRequestDto.getDegree());
      if (corpusRequestDto.getDegree().equals("ba")) {
        studyLevelAndDegreeHelper.setSecondValue("magistriope");
      } else if (corpusRequestDto.getDegree().equals("ma")) {
        studyLevelAndDegreeHelper.setSecondValue("doktoriope");
      }
    } else if (isNotBlank(corpusRequestDto.getStudyLevel()) && isBlank(corpusRequestDto.getDegree())) {
      studyLevelAndDegreeHelper.setSecondValue(corpusRequestDto.getStudyLevel());
      if (corpusRequestDto.getStudyLevel().equals("magistriope")) {
        studyLevelAndDegreeHelper.setFirstValue("ba");
      } else if (corpusRequestDto.getStudyLevel().equals("doktoriope")) {
        studyLevelAndDegreeHelper.setFirstValue("ma");
      }
    } else if (isNotBlank(corpusRequestDto.getStudyLevel()) && isNotBlank(corpusRequestDto.getDegree())) {
      studyLevelAndDegreeHelper.setFirstValue(corpusRequestDto.getDegree());
      studyLevelAndDegreeHelper.setSecondValue(corpusRequestDto.getStudyLevel());
    }
    if (isNotBlank(corpusRequestDto.getNativeLang())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p14", "emakeel", corpusRequestDto.getNativeLang()));
    }
    if (isNotBlank(corpusRequestDto.getOtherLang())) {
      otherLangHelper.setTable("p15");
      otherLangHelper.setParameter("muudkeeled");
      otherLangHelper.setValue(corpusRequestDto.getOtherLang());
    }
    if (isNotBlank(corpusRequestDto.getNationality())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p16", "kodakondsus", corpusRequestDto.getNationality()));
    }
    if (isNotBlank(corpusRequestDto.getCountry())) {
      singleParamHelpers.add(new TextQuerySingleParamHelper("p17", "elukoht", corpusRequestDto.getCountry()));
    }
    if (corpusRequestDto.getAddedYears() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p18", "aasta", false, corpusRequestDto.getAddedYears()));
    }
    if (corpusRequestDto.getCharacters() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p19", "charCount", true, corpusRequestDto.getCharacters()));
    }
    if (corpusRequestDto.getWords() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p20", "wordCount", true, corpusRequestDto.getWords()));
    }
    if (corpusRequestDto.getSentences() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p21", "sentenceCount", true, corpusRequestDto.getSentences()));
    }

    String daoResponse = textDao.detailedTextQueryByParameters(multiParamHelpers, singleParamHelpers, rangeParamBaseHelpers, studyLevelAndDegreeHelper, otherLangHelper, usedMultiMaterialsHelper);
    return isNotBlank(daoResponse) ? daoResponse : new ArrayList<>().toString();
  }

  public byte[] tekstidfailina(CorpusDownloadDto corpusDownloadDto) throws IOException {
    final String basicText = "basictext";
    List<CorpusDownloadResponseEntity> contentsAndTitles;

    if (corpusDownloadDto.getForm().equals(basicText)) {
      contentsAndTitles = textDao.findTextContentsAndTitlesByIds(corpusDownloadDto.getFileList());
    } else {
      String typeColumn = "";
      if (corpusDownloadDto.getForm().equals("stanza")) {
        typeColumn = "ANNOTATE_STANZA_CONLLU";
      }
      if (corpusDownloadDto.getForm().equals("vislcg3")) {
        typeColumn = "ANNOTATE_ESTNLTK";
      }
      contentsAndTitles = textDao.findTextTitlesAndContentsWithStanzaTaggingByIds(corpusDownloadDto.getFileList(), typeColumn);
    }

    if (corpusDownloadDto.getType().equals("zip")) {
      File tempFile = createTempFile("corpusDownloadTempZip", null, null);
      try (ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(tempFile))) {
        for (int i = 0; i < contentsAndTitles.size(); i++) {
          ZipEntry zipEntry = new ZipEntry(format(
            "%s (%s).txt",
            getSanitizedFileName(contentsAndTitles.get(i).getTitle()),
            corpusDownloadDto.getFileList().get(i))
          );
          zipOutputStream.putNextEntry(zipEntry);
          zipOutputStream.write(contentsAndTitles.get(i).getContents().getBytes(UTF_8)
          );
          zipOutputStream.closeEntry();
        }
      } catch (IOException e) {
        throw new IOException("Something went wrong while generating ZIP file.", e);
      }

      try (FileInputStream fileInputStream = new FileInputStream(tempFile)) {
        return fileInputStream.readAllBytes();
      }
    }

    StringBuilder contentsCombined = new StringBuilder();
    for (CorpusDownloadResponseEntity entry : contentsAndTitles) {
      contentsCombined.append(entry.getContents());
      contentsCombined.append(lineSeparator()).append(lineSeparator());
    }
    return contentsCombined.toString().getBytes(UTF_8);
  }

  public String lisatekst(AddingRequestDto andmed) {
    UUID kood = randomUUID();
    textDao.insertAdding(kood, andmed.getSisu());
    lisaTekstiOmadus(kood, "title", andmed.getPealkiri());
    lisaTekstiOmadus(kood, "kirjeldus", andmed.getKirjeldus());
    lisaTekstiOmadus(kood, "tekstityyp", andmed.getLiik());
    if (andmed.getOppematerjal() != null && andmed.getOppematerjal()) {
      String[] m = andmed.getAkadOppematerjal();
      if (m != null) {
        for (String s : m) {
          lisaTekstiOmadus(kood, "akad_oppematerjal", s);
        }
      }
      lisaTekstiOmadus(kood, "akad_oppematerjal_muu", andmed.getAkadOppematerjalMuu());
    }
    if (andmed.getLiik().equals("akadeemiline")) {
      lisaTekstiOmadus(kood, "eriala", andmed.getAutoriEriala());
      lisaTekstiOmadus(kood, "akad_alamliik", andmed.getAkadAlamliik());
      lisaTekstiOmadus(kood, "artikkel_aasta", andmed.getArtikkelAasta());
      lisaTekstiOmadus(kood, "artikkel_valjaanne", andmed.getArtikkelValjaanne());
      lisaTekstiOmadus(kood, "artikkel_number", andmed.getArtikkelNumber());
      lisaTekstiOmadus(kood, "artikkel_lehekyljed", andmed.getArtikkelLehekyljed());
      lisaTekstiOmadus(kood, "oppeaste", andmed.getAutoriOppeaste());
      lisaTekstiOmadus(kood, "teaduskraad", andmed.getAutoriTeaduskraad());
    }
    if (andmed.getLiik().equals("mitteakadeemiline")) {
      lisaTekstiOmadus(kood, "mitteakad_alamliik", andmed.getMitteakadAlamliik());
    }
    lisaTekstiOmadus(kood, "abivahendid", booleanToJahEi(andmed.getOppematerjal()));
    lisaTekstiOmadus(kood, "kasAutor", andmed.getTekstiAutor());
    lisaTekstiOmadus(kood, "vanus", andmed.getAutoriVanus());
    lisaTekstiOmadus(kood, "sugu", andmed.getAutoriSugu());
    lisaTekstiOmadus(kood, "haridus", andmed.getAutoriOppeaste());
    lisaTekstiOmadus(kood, "emakeel", andmed.getAutoriEmakeel().toLowerCase());
    lisaTekstiOmadus(kood, "muudkeeled", andmed.getAutoriMuudKeeled());
    lisaTekstiOmadus(kood, "riik", andmed.getAutoriElukohariik());
    return kood.toString();
  }

  public static String[] translateWordType(String[] tekst, String language) {
    Map<String, String> wordTypes;
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
          if (feat.contains("Voice") && tenseLabel.toString().contentEquals(tensePrefixPast)) {
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
        else if (asList(feats).contains("VerbForm=Fin")) {
          for (String feat : feats) {
            if (feat.contains("Mood")) {
              moodLabel = moodTranslations.get(feat.split("=")[1]);
            }
            if (feat.contains("Number")) {
              numberLabel = numberTranslations.get(feat.split("=")[1]);
            }
            if (feat.contains("Voice") && feat.split("=")[1].equals("Pass")) {
              personVoiceLabel = impersonal;
            }
            if ((feat.contains("Polarity") || feat.contains("Connegative"))
              && (feat.split("=")[1].equals("Neg") || feat.split("=")[1].equals("Yes"))) {
              negativityLabel = negation;
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
            if (feat.contains("Person") && !Objects.equals(personVoiceLabel, impersonal)) {
              personVoiceLabel = personTranslations.get(feat.split("=")[1]);
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
          if (asList(feats).contains("VerbForm=Part") && asList(feats).contains("Tense=Past")) {
            if (asList(feats).contains("Voice=Act")) {
              verbFormLabel = inflectedFormNudParticiple;
            } else if (asList(feats).contains("Voice=Pass")) {
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

  private TextQueryRangeParamBaseHelper createRangeBaseHelper(String table, String parameter, boolean castable, List<List<Integer>> values) {
    List<TextQueryRangeParamHelper> rangeHelpers = new ArrayList<>();
    for (List<Integer> value : values) {
      TextQueryRangeParamHelper helper = new TextQueryRangeParamHelper();
      helper.setStartValue(value.get(0));
      helper.setEndValue(value.get(1));
      rangeHelpers.add(helper);
    }
    return new TextQueryRangeParamBaseHelper(
      table,
      parameter,
      castable,
      rangeHelpers.toArray(new TextQueryRangeParamHelper[0])
    );
  }

  private String getSanitizedFileName(String rawFileName) {
    StringBuilder stringBuilder = new StringBuilder();
    Matcher matcher = fileNameCharacterWhitelist.matcher(rawFileName);
    while (matcher.find()) {
      stringBuilder.append(matcher.group());
    }
    return stringBuilder.toString();
  }

  private Map<String, Collection<String>> buildFilters(String[] korpus, String tekstityyp, String tekstikeel, String keeletase, Boolean abivahendid, Integer aasta, String sugu) {
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

  private void lisaTekstiOmadus(UUID kood, String tunnus, String omadus) {
    if (omadus != null && omadus.length() > 0) {
      textDao.insertAddingProperty(kood, tunnus, omadus);
    }
  }

}
