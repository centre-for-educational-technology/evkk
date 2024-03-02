package ee.tlu.evkk.dal.dto;

import java.util.List;
import java.util.Map;

public class ErrorAnalyserTransformedSentence {
    private String sentenceId;
    private String sentence;
    private String textId;
    private String languageLevel;
    private String nativeLanguage;
    private String textType;
    private String age;
    private String ageRange;
    private String education;
    private String citizenship;
    private List<ErrorAnalyserAnnotation> annotations;
    private Map<String, Integer> errorTypes;
    private Integer querriedErrorTypeCount;
    // private List<Map<String, Integer>> groupedErrorTypes;
    // private List<Map<String, ErrorAnalyserAnnotation>> groupedAnnotations;

    public String getSentenceId() {
        return sentenceId;
    }

    public ErrorAnalyserTransformedSentence(String sentenceId, String sentence, String textId, String languageLevel,
            String nativeLanguage, String textType, String age, String ageRange, String education, String citizenship,
            List<ErrorAnalyserAnnotation> annotations, Map<String, Integer> errorTypes,
            Integer querriedErrorTypeCount) {
        this.sentenceId = sentenceId;
        this.sentence = sentence;
        this.textId = textId;
        this.languageLevel = languageLevel;
        this.nativeLanguage = nativeLanguage;
        this.textType = textType;
        this.age = age;
        this.ageRange = ageRange;
        this.education = education;
        this.citizenship = citizenship;
        this.annotations = annotations;
        this.errorTypes = errorTypes;
        this.querriedErrorTypeCount = querriedErrorTypeCount;
    }

    public String getSentence() {
        return sentence;
    }

    public String getTextId() {
        return textId;
    }

    public String getLanguageLevel() {
        return languageLevel;
    }

    public String getNativeLanguage() {
        return nativeLanguage;
    }

    public String getTextType() {
        return textType;
    }

    public String getAge() {
        return age;
    }

    public String getAgeRange() {
        return ageRange;
    }

    public String getEducation() {
        return education;
    }

    public String getCitizenship() {
        return citizenship;
    }

    public List<ErrorAnalyserAnnotation> getAnnotations() {
        return annotations;
    }

    public Map<String, Integer> getErrorTypes() {
        return errorTypes;
    }

    public Integer getQuerriedErrorTypeCount() {
        return querriedErrorTypeCount;
    }

}
