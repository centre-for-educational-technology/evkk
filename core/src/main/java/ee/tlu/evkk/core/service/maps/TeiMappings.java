package ee.tlu.evkk.core.service.maps;

import ee.tlu.evkk.core.service.helpers.CommonMetadataForPersonPropertyCreation;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.core.service.constants.TeiConstants.EDUCATION;
import static ee.tlu.evkk.core.service.constants.TeiConstants.METADATA_KEY_COUNTRY;
import static ee.tlu.evkk.core.service.constants.TeiConstants.METADATA_KEY_EDUCATION;
import static ee.tlu.evkk.core.service.constants.TeiConstants.METADATA_KEY_NATIONALITY;
import static ee.tlu.evkk.core.service.constants.TeiConstants.METADATA_KEY_RESEARCH_DEGREE;
import static ee.tlu.evkk.core.service.constants.TeiConstants.METADATA_KEY_STUDY_LEVEL;
import static ee.tlu.evkk.core.service.constants.TeiConstants.NATIONALITY;
import static ee.tlu.evkk.core.service.constants.TeiConstants.RESIDENCE;
import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor(access = PRIVATE)
public class TeiMappings {

  @Getter
  private static final Map<String, String> language = new HashMap<>();

  @Getter
  private static final Map<String, String> languageCode = new HashMap<>();

  @Getter
  private static final Map<String, String> corpus = new HashMap<>();

  @Getter
  private static final Map<String, String> country = new HashMap<>();

  @Getter
  private static final Map<String, String> nationality = new HashMap<>();

  @Getter
  private static final Map<String, String> education = new HashMap<>();

  @Getter
  private static final Map<String, String> preparedness = new HashMap<>();

  @Getter
  private static final List<CommonMetadataForPersonPropertyCreation> commonMetadataForPersonPropertyCreation = new ArrayList<>();

  static {
    language.put("eesti", "Estonian");
    language.put("vene", "Russian");
    language.put("eesti, vene", "Estonian, Russian");
    language.put("soome", "Finnish");
    language.put("inglise", "English");
    language.put("saksa", "German");
    language.put("prantsuse", "French");
    language.put("jaapani", "Japanese");
    language.put("jidiš", "Yiddish");
    language.put("leedu", "Lithuanian");
    language.put("läti", "Latvian");
    language.put("poola", "Polish");
    language.put("rootsi", "Swedish");
    language.put("ukraina", "Ukrainian");
    language.put("ungari", "Hungarian");
    language.put("valgevene", "Belarusian");
    language.put("hiina", "Chinese");

    languageCode.put("eesti", "et");
    languageCode.put("vene", "ru");
    languageCode.put("eesti, vene", "et, ru");
    languageCode.put("soome", "fi");
    languageCode.put("inglise", "en");
    languageCode.put("saksa", "de");
    languageCode.put("prantsuse", "fr");
    languageCode.put("jaapani", "jp");
    languageCode.put("jidiš", "ji");
    languageCode.put("leedu", "lt");
    languageCode.put("läti", "lv");
    languageCode.put("poola", "pl");
    languageCode.put("rootsi", "se");
    languageCode.put("ukraina", "ua");
    languageCode.put("ungari", "hu");
    languageCode.put("valgevene", "by");
    languageCode.put("hiina", "cn");

    corpus.put("cFqPphvYi", "Estonian L2 olympiade");
    corpus.put("clWmOIrLa", "Estonian L2 proficiency examinations");
    corpus.put("cFOoRQekA", "L2 Estonian");
    corpus.put("cYDRkpymb", "L1 Estonian");
    corpus.put("cgSRJPKTr", "L1 Russian");
    corpus.put("cZjHWUPtD", "L3 Russian");
    corpus.put("cwUSEqQLt", "Academic Estonian");

    country.put("Eesti", "Estonia");
    country.put("Inglismaa", "England");
    country.put("Leedu", "Lithuania");
    country.put("Muu", "Other");
    country.put("Saksamaa", "Germany");
    country.put("Soome", "Finland");
    country.put("Ungari", "Hungary");

    nationality.put("Ameerika Ühendriigid", "United States of America");
    nationality.put("Brasiilia", "Brazil");
    nationality.put("Bulgaaria", "Bulgaria");
    nationality.put("Eesti", "Estonia");
    nationality.put("Egiptus", "Egypt");
    nationality.put("Filipiinid", "The Philippines");
    nationality.put("Hiina", "China (PRC)");
    nationality.put("Hispaania", "Spain");
    nationality.put("Holland", "The Netherlands");
    nationality.put("Iirimaa", "Ireland");
    nationality.put("India", "India");
    nationality.put("Kreeka", "Greece");
    nationality.put("Leedu", "Lithuania");
    nationality.put("Läti", "Latvia");
    nationality.put("Makedoonia", "North Macedonia");
    nationality.put("Määramata", "Unassigned");
    nationality.put("Poola", "Poland");
    nationality.put("Prantsusmaa", "France");
    nationality.put("Rumeenia", "Romania");
    nationality.put("Saksamaa", "Germany");
    nationality.put("Soome", "Finland");
    nationality.put("Suurbritannia", "United Kingdom");
    nationality.put("Türgi", "Turkey");
    nationality.put("Ukraina", "Ukraine");
    nationality.put("Valgevene", "Belarus");
    nationality.put("Venemaa", "Russia");
    nationality.put("Venezuela", "Venezuela");

    education.put("Alg-/põhiharidus", "elementary/basic education");
    education.put("Keskeriharidus/kutseharidus", "(secondary) vocational education");
    education.put("Keskharidus", "secondary education");
    education.put("Kõrgharidus", "higher education");
    education.put("bakalaureuseope", "Bachelor's studies");
    education.put("magistriope", "Master's studies");
    education.put("doktoriope", "Doctoral studies");
    education.put("ba", "Bachelor's degree");
    education.put("ma", "Master's degree");
    education.put("phd", "Doctoral degree");

    preparedness.put("tolkesonastik", "translation dictionary or machine translation");
    preparedness.put("ykskeelnesonastik", "monolingual dictionary (incl. online dictionaries)");
    preparedness.put("terminisonastik", "term glossary or base");
    preparedness.put("kasiraamat", "professional handbook or manual");
    preparedness.put("automaatkontroll", "automated correction");
    preparedness.put("muu", "other");

    commonMetadataForPersonPropertyCreation.add(
      new CommonMetadataForPersonPropertyCreation(nationality, METADATA_KEY_NATIONALITY, NATIONALITY)
    );
    commonMetadataForPersonPropertyCreation.add(
      new CommonMetadataForPersonPropertyCreation(country, METADATA_KEY_COUNTRY, RESIDENCE)
    );
    commonMetadataForPersonPropertyCreation.add(
      new CommonMetadataForPersonPropertyCreation(education, METADATA_KEY_EDUCATION, EDUCATION)
    );
    commonMetadataForPersonPropertyCreation.add(
      new CommonMetadataForPersonPropertyCreation(education, METADATA_KEY_STUDY_LEVEL, EDUCATION)
    );
    commonMetadataForPersonPropertyCreation.add(
      new CommonMetadataForPersonPropertyCreation(education, METADATA_KEY_RESEARCH_DEGREE, EDUCATION)
    );
  }
}
