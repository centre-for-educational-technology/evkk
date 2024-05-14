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
    private List<ErrorAnalyserAnnotation> annotations; // selle võib tulevikus eemaldada
    private List<ErrorAnalyserTransformedAnnotation> transformedAnnotations;
    private Map<String, Integer> errorTypes;
    private Integer querriedErrorTypeCount;
    private List<Map<String, ErrorAnalyserAnnotation>> groupedAnnotations;
    private Map<String, Object> transformedSentence;
    // private List<Map<String, Integer>> groupedErrorTypes;

    public ErrorAnalyserTransformedSentence(String sentenceId, String sentence, String textId, String languageLevel,
            String nativeLanguage, String textType, String age, String ageRange, String education, String citizenship,
            List<ErrorAnalyserAnnotation> annotations, List<ErrorAnalyserTransformedAnnotation> transformedAnnotations,
            Map<String, Integer> errorTypes,
            Integer querriedErrorTypeCount, List<Map<String, ErrorAnalyserAnnotation>> groupedAnnotations,
            Map<String, Object> transformedSentence) {
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
        this.transformedAnnotations = transformedAnnotations;
        this.errorTypes = errorTypes;
        this.querriedErrorTypeCount = querriedErrorTypeCount;
        this.groupedAnnotations = groupedAnnotations;
        this.transformedSentence = transformedSentence;
    }

    public String getSentenceId() {
        return sentenceId;
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

    public List<ErrorAnalyserTransformedAnnotation> getTransformedAnnotations() {
        return transformedAnnotations;
    }

    public Map<String, Integer> getErrorTypes() {
        return errorTypes;
    }

    public Integer getQuerriedErrorTypeCount() {
        return querriedErrorTypeCount;
    }

    public List<Map<String, ErrorAnalyserAnnotation>> getGroupedAnnotations() {
        return groupedAnnotations;
    }

    public Map<String, Object> getTransformedSentence() {
        return transformedSentence;
    }

}
