package ee.tlu.evkk.core.service;

import ee.evkk.dto.AddingRequestDto;
import ee.evkk.dto.CommonTextRequestDto;
import ee.evkk.dto.CorpusDownloadDto;
import ee.evkk.dto.CorpusRequestDto;
import ee.evkk.dto.enums.CorpusDownloadForm;
import ee.evkk.dto.enums.Language;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.service.dto.StanzaResponseDto;
import ee.tlu.evkk.core.service.dto.TextResponseDto;
import ee.tlu.evkk.core.service.dto.TextWithComplexity;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.core.service.maps.WordFeatTranslationMappings;
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
import lombok.AllArgsConstructor;
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

import static ee.evkk.dto.enums.CorpusDownloadFileType.ZIP;
import static ee.evkk.dto.enums.CorpusDownloadForm.ANNOTATE_TEI;
import static ee.evkk.dto.enums.CorpusDownloadForm.BASIC_TEXT;
import static ee.evkk.dto.enums.Language.EN;
import static ee.evkk.dto.enums.Language.ET;
import static ee.tlu.evkk.common.util.TextUtils.sanitizeLemmaStrings;
import static ee.tlu.evkk.common.util.TextUtils.sanitizeWordStrings;
import static java.io.File.createTempFile;
import static java.lang.Boolean.TRUE;
import static java.lang.String.format;
import static java.lang.System.lineSeparator;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Arrays.asList;
import static java.util.Objects.nonNull;
import static java.util.UUID.randomUUID;
import static java.util.regex.Pattern.compile;
import static java.util.stream.Collectors.toList;
import static org.apache.logging.log4j.util.Strings.isBlank;
import static org.apache.logging.log4j.util.Strings.isNotBlank;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Service
@AllArgsConstructor
public class TextService {

  private final TextRepository textRepository;
  private final TextPropertyRepository textPropertyRepository;
  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;

  private static final Set<String> firstType = WordFeatTranslationMappings.getFirstType();
  private static final Set<String> secondType = WordFeatTranslationMappings.getSecondType();
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
      singleParamHelpers.add(new TextQuerySingleParamHelper("p7", "valdkond", corpusRequestDto.getDomain()));
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
      singleParamHelpers.add(new TextQuerySingleParamHelper("p10", "vanusevahemik", corpusRequestDto.getAge()));
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
      singleParamHelpers.add(new TextQuerySingleParamHelper("p17", "riik", corpusRequestDto.getCountry()));
    }
    if (corpusRequestDto.getAddedYears() != null) {
      multiParamHelpers.add(new TextQueryMultiParamHelper("p18", "ajavahemik", corpusRequestDto.getAddedYears()));
    }
    if (corpusRequestDto.getCharacters() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p19", "charCount", corpusRequestDto.getCharacters()));
    }
    if (corpusRequestDto.getWords() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p20", "wordCount", corpusRequestDto.getWords()));
    }
    if (corpusRequestDto.getSentences() != null) {
      rangeParamBaseHelpers.add(createRangeBaseHelper("p21", "sentenceCount", corpusRequestDto.getSentences()));
    }

    String daoResponse = textDao.detailedTextQueryByParameters(multiParamHelpers, singleParamHelpers, rangeParamBaseHelpers, studyLevelAndDegreeHelper, otherLangHelper, usedMultiMaterialsHelper);
    return isNotBlank(daoResponse) ? daoResponse : new ArrayList<>().toString();
  }

  public TextResponseDto sonadLemmadSilbidSonaliigidVormimargendid(CommonTextRequestDto request) {
    StanzaResponseDto stanzaResponse = stanzaServerClient.getSonadLemmadSilbidSonaliigidVormimargendid(request.getTekst());
    return new TextResponseDto(
      sanitizeWordStrings(stanzaResponse.getSonad()),
      sanitizeLemmaStrings(stanzaResponse.getLemmad()),
      stanzaResponse.getSilbid(),
      null,
      translateWordType(stanzaResponse.getSonaliigid(), request.getLanguage()),
      translateFeats(stanzaResponse.getVormimargendid(), request.getLanguage())
    );
  }

  public TextWithComplexity keerukusSonaliigidMitmekesisus(CommonTextRequestDto request) {
    return stanzaServerClient.getKeerukusSonaliigidMitmekesisus(request.getTekst());
  }

  public byte[] tekstidfailina(CorpusDownloadDto corpusDownloadDto) throws IOException {
    List<CorpusDownloadResponseEntity> contentsAndTitles;

    if (BASIC_TEXT.equals(corpusDownloadDto.getForm())) {
      contentsAndTitles = textDao.findTextContentsAndTitlesByIds(corpusDownloadDto.getFileList());
    } else {
      contentsAndTitles = textDao.findTextTitlesAndContentsWithStanzaTaggingByIds(corpusDownloadDto.getFileList(), corpusDownloadDto.getForm().toString());
    }

    if (ZIP.equals(corpusDownloadDto.getFileType())) {
      File tempFile = createTempFile("corpusDownloadTempZip", null, null);
      String fileExtension = ANNOTATE_TEI.equals(corpusDownloadDto.getForm()) ? "xml" : "txt";

      try (ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(tempFile))) {
        for (int i = 0; i < contentsAndTitles.size(); i++) {
          String contents = replaceNewLinesAndTabs(corpusDownloadDto.getForm(), contentsAndTitles.get(i).getContents());
          ZipEntry zipEntry = new ZipEntry(format(
            "%s (%s).%s",
            getSanitizedFileName(contentsAndTitles.get(i).getTitle()),
            corpusDownloadDto.getFileList().get(i),
            fileExtension)
          );
          zipOutputStream.putNextEntry(zipEntry);

          String result = nonNull(contents) ? contents : "";
          zipOutputStream.write(result.getBytes(UTF_8));
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
      String contents = replaceNewLinesAndTabs(corpusDownloadDto.getForm(), entry.getContents());
      contentsCombined.append(isNotBlank(contents) ? contents : "");
      contentsCombined.append(lineSeparator()).append(lineSeparator());
    }
    return contentsCombined.toString().getBytes(UTF_8);
  }

  public String combineCorpusTextIdsAndOwnText(Set<UUID> corpusTextIds, String ownTexts) {
    StringBuilder result = new StringBuilder();
    if (nonNull(corpusTextIds) && !corpusTextIds.isEmpty()) {
      result.append(textDao.findTextsByIds(corpusTextIds));
    }
    result.append(" ");
    if (isNotBlank(ownTexts)) {
      result.append(ownTexts);
    }
    return result.toString();
  }

  public String lisatekst(AddingRequestDto andmed) {
    UUID kood = randomUUID();
    textDao.insertAdding(kood, andmed.getSisu());
    lisaTekstiOmadus(kood, "title", andmed.getPealkiri());
    lisaTekstiOmadus(kood, "kirjeldus", andmed.getKirjeldus());
    lisaTekstiOmadus(kood, "tekstityyp", andmed.getLiik());
    if (TRUE.equals(andmed.getOppematerjal())) {
      String[] m = andmed.getAkadOppematerjal();
      if (m != null) {
        for (String s : m) {
          lisaTekstiOmadus(kood, "akad_oppematerjal", s);
        }
      }
      lisaTekstiOmadus(kood, "akad_oppematerjal_muu", andmed.getAkadOppematerjalMuu());
    }
    if (andmed.getLiik().equals("akadeemiline")) {
      lisaTekstiOmadus(kood, "valdkond", andmed.getAutoriValdkond());
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

  public List<String> translateFeats(List<List<String>> tekst, Language language) {
    getLanguageMappings(language);
    List<String> result = new ArrayList<>();

    for (List<String> wordData : tekst) {
      // muutumatud sõnad (Abbr=Yes ehk lühendid; NumForm=Digit ehk arvud jne)
      String pos = wordData.get(0);
      String feats = wordData.get(1);
      if (feats == null || feats.equals("–") || feats.equals("Abbr=Yes") || feats.contains("NumForm=Digit")) {
        result.add("–");
      }

      // käändsõnad
      else if (firstType.contains(pos)) {
        String[] featsSplit = feats.split("\\|");
        String numberLabel = "";
        String caseLabel = "";
        String degreeLabel = "";
        StringBuilder tenseLabel = new StringBuilder();

        for (String feat : featsSplit) {
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
              if (EN.equals(language)) {
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
      else if (secondType.contains(pos)) {
        List<String> featsSplit = asList(feats.split("\\|"));
        String moodLabel = "";
        String tenseLabel = "";
        String numberLabel = "";
        String personVoiceLabel = "";
        String negativityLabel = "";
        String verbFormLabel = "";

        // Polarity=Neg only
        if (feats.equals("Polarity=Neg")) {
          result.add(negPolarity);
        }

        // pöördelised vormid
        else if (feats.contains("VerbForm=Fin")) {
          for (String feat : featsSplit) {
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
          for (String feat : featsSplit) {
            if (feat.contains("Tense")) {
              if (feat.split("=")[1].equals("Pres")) {
                tenseLabel = present;
              } else {
                if (EN.equals(language)) {
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
          if (featsSplit.contains("VerbForm=Part") && featsSplit.contains("Tense=Past")) {
            if (featsSplit.contains("Voice=Act")) {
              verbFormLabel = inflectedFormNudParticiple;
            } else if (featsSplit.contains("Voice=Pass")) {
              verbFormLabel = inflectedFormTudParticiple;
            }
          } else {
            for (String feat : featsSplit) {
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

  private static void getLanguageMappings(Language language) {
    if (ET.equals(language)) {
      numberTranslations = WordFeatTranslationMappings.getNumberEt();
      caseTranslations = WordFeatTranslationMappings.getCaseEt();
      degreeTranslations = WordFeatTranslationMappings.getDegreeEt();
      moodTranslations = WordFeatTranslationMappings.getMoodEt();
      personTranslations = WordFeatTranslationMappings.getPersonEt();
      verbFormTranslations = WordFeatTranslationMappings.getVerbEt();
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
      numberTranslations = WordFeatTranslationMappings.getNumberEn();
      caseTranslations = WordFeatTranslationMappings.getCaseEn();
      degreeTranslations = WordFeatTranslationMappings.getDegreeEn();
      moodTranslations = WordFeatTranslationMappings.getMoodEn();
      personTranslations = WordFeatTranslationMappings.getPersonEn();
      verbFormTranslations = WordFeatTranslationMappings.getVerbFormEn();
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

  private TextQueryRangeParamBaseHelper createRangeBaseHelper(String table, String parameter, List<List<Integer>> values) {
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

  private String replaceNewLinesAndTabs(CorpusDownloadForm formType, String content) {
    return !BASIC_TEXT.equals(formType)
      ? content
      : content
        .replace("\\n", lineSeparator())
        .replace("\\t", "    ");
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
    if (isNotBlank(omadus)) {
      textDao.insertAddingProperty(kood, tunnus, omadus);
    }
  }

  public List<String> translateWordType(List<String> tekst, Language language) {
    Map<String, String> wordTypes;
    if (ET.equals(language)) {
      wordTypes = WordFeatTranslationMappings.getWordTypesEt();
    } else {
      wordTypes = WordFeatTranslationMappings.getWordTypesEn();
    }
    return tekst.stream()
      .map(wordTypes::get)
      .collect(toList());
  }

}
