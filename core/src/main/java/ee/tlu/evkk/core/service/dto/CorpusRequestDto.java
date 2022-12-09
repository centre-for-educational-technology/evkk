package ee.tlu.evkk.core.service.dto;

public class CorpusRequestDto {

  private String[] corpuses;
  private String type;
  private String language;
  private String level;
  private String usedMaterials;
  private String age;
  private String gender;
  private String education;
  private String nativeLang;
  private String country;
  private Integer[][] addedYear;
  private Integer[][] characters;
  private Integer[][] words;
  private Integer[][] sentences;

  public String[] getCorpuses() {
    return corpuses;
  }

  public void setCorpuses(String[] corpuses) {
    this.corpuses = corpuses;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getLanguage() {
    return language;
  }

  public void setLanguage(String language) {
    this.language = language;
  }

  public String getLevel() {
    return level;
  }

  public void setLevel(String level) {
    this.level = level;
  }

  public String getUsedMaterials() {
    return usedMaterials;
  }

  public void setUsedMaterials(String usedMaterials) {
    this.usedMaterials = usedMaterials;
  }

  public String getAge() {
    return age;
  }

  public void setAge(String age) {
    this.age = age;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getEducation() {
    return education;
  }

  public void setEducation(String education) {
    this.education = education;
  }

  public String getNativeLang() {
    return nativeLang;
  }

  public void setNativeLang(String nativeLang) {
    this.nativeLang = nativeLang;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public Integer[][] getAddedYear() {
    return addedYear;
  }

  public void setAddedYear(Integer[][] addedYear) {
    this.addedYear = addedYear;
  }

  public Integer[][] getCharacters() {
    return characters;
  }

  public void setCharacters(Integer[][] characters) {
    this.characters = characters;
  }

  public Integer[][] getWords() {
    return words;
  }

  public void setWords(Integer[][] words) {
    this.words = words;
  }

  public Integer[][] getSentences() {
    return sentences;
  }

  public void setSentences(Integer[][] sentences) {
    this.sentences = sentences;
  }
}
