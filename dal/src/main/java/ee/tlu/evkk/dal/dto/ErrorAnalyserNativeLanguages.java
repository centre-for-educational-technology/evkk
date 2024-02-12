package ee.tlu.evkk.dal.dto;

public class ErrorAnalyserNativeLanguages {
    private String nativeLanguage;

    public ErrorAnalyserNativeLanguages(String nativeLanguage) {
        this.nativeLanguage = nativeLanguage;
    }

    public ErrorAnalyserNativeLanguages() {

    }

    public String getNativeLanguage() {
        return nativeLanguage;
    }
}
