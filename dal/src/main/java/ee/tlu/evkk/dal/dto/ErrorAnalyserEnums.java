package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserEnums {
    private List<String> languageLevels;
    private List<String> nativeLanguages;

    public ErrorAnalyserEnums(List<String> languageLevels, List<String> nativeLanguage) {
        this.languageLevels = languageLevels;
        this.nativeLanguages = nativeLanguage;
    }

    public ErrorAnalyserEnums() {

    }

    public List<String> getLanguageLevels() {
        return languageLevels;
    }

    public List<String> getNativeLanguages() {
        return nativeLanguages;
    }
}
