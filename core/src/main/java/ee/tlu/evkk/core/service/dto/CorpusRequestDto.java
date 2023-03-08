package ee.tlu.evkk.core.service.dto;

import java.util.List;
import java.util.Set;

public class CorpusRequestDto {

  private Set<String> corpuses;
  private Set<String> types;
  private String language;
  private String level;
  private String domain;
  private String usedMaterials;
  private Set<String> usedMultiMaterials;
  private String age;
  private String gender;
  private String education;
  private String studyLevel;
  private String degree;
  private String nativeLang;
  private String otherLang;
  private String nationality;
  private String country;
  private List<List<Integer>> addedYears;
  private List<List<Integer>> characters;
  private List<List<Integer>> words;
  private List<List<Integer>> sentences;

  public Set<String> getCorpuses() {
    return corpuses;
  }

  public void setCorpuses(Set<String> corpuses) {
    this.corpuses = corpuses;
  }

  public Set<String> getTypes() {
    return types;
  }

  public void setTypes(Set<String> types) {
    this.types = types;
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

  public List<List<Integer>> getAddedYears() {
    return addedYears;
  }

  public void setAddedYears(List<List<Integer>> addedYears) {
    this.addedYears = addedYears;
  }

  public List<List<Integer>> getCharacters() {
    return characters;
  }

  public void setCharacters(List<List<Integer>> characters) {
    this.characters = characters;
  }

  public List<List<Integer>> getWords() {
    return words;
  }

  public void setWords(List<List<Integer>> words) {
    this.words = words;
  }

  public List<List<Integer>> getSentences() {
    return sentences;
  }

  public void setSentences(List<List<Integer>> sentences) {
    this.sentences = sentences;
  }

  public String getNationality() {
    return nationality;
  }

  public void setNationality(String nationality) {
    this.nationality = nationality;
  }

  public String getStudyLevel() {
    return studyLevel;
  }

  public void setStudyLevel(String studyLevel) {
    this.studyLevel = studyLevel;
  }

  public String getDegree() {
    return degree;
  }

  public void setDegree(String degree) {
    this.degree = degree;
  }

  public String getOtherLang() {
    return otherLang;
  }

  public void setOtherLang(String otherLang) {
    this.otherLang = otherLang;
  }

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public Set<String> getUsedMultiMaterials() {
    return usedMultiMaterials;
  }

  public void setUsedMultiMaterials(Set<String> usedMultiMaterials) {
    this.usedMultiMaterials = usedMultiMaterials;
  }
}
