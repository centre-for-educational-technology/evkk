package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserOptions {
    private List<String> textType;
    private List<String> nativeLanguage;
    private List<String> citizenship;

    public ErrorAnalyserOptions(List<String> textType, List<String> nativeLanguage, List<String> citizenship) {
        this.textType = textType;
        this.nativeLanguage = nativeLanguage;
        this.citizenship = citizenship;
    }

    public ErrorAnalyserOptions() {
    }

    public List<String> getTextType() {
        return textType;
    }

    public List<String> getNativeLanguage() {
        return nativeLanguage;
    }

    public List<String> getCitizenship() {
        return citizenship;
    }

}
