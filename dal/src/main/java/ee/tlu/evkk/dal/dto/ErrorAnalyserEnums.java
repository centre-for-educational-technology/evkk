package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserEnums {
    private List<String> languageLevels;
    private List<String> nativeLanguages;
    private List<String> citizenship;
    private List<String> textType;
    private List<String> education;
    private List<String> age;

    public ErrorAnalyserEnums(List<String> languageLevels, List<String> nativeLanguage, List<String> citizenship,
            List<String> textType, List<String> education, List<String> age) {
        this.languageLevels = languageLevels;
        this.nativeLanguages = nativeLanguage;
        this.citizenship = citizenship;
        this.textType = textType;
        this.education = education;
        this.age = age;
    }

    public ErrorAnalyserEnums() {
    }

    public List<String> getLanguageLevels() {
        return languageLevels;
    }

    public List<String> getNativeLanguages() {
        return nativeLanguages;
    }

    public List<String> getCitizenship() {
        return citizenship;
    }

    public List<String> getTextType() {
        return textType;
    }

    public List<String> getEducation() {
        return education;
    }

    public List<String> getAge() {
        return age;
    }
}
