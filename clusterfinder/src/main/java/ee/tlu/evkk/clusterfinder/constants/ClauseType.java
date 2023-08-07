package ee.tlu.evkk.clusterfinder.constants;

import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public enum ClauseType {
    ALL("ALL", "clause.type.all"),
    PREDICATE("F", "clause.type.predicate"),
    BASIS("@SUBJ", "clause.type.basis"),
    OBJECTIVE("@OBJ", "clause.type.objective"),
    PEDICATE("@PRD", "clause.type.pedicate"),
    ATTRIBUTE("AT", "clause.type.attribute"),
    ADVERBIAL("@ADVL", "clause.type.adverbial"),
    CONJUNCTIVE_WORD("@J", "clause.type.conjunctive.word"),
    EXCLAMATION("@B", "clause.type.exclamation"),
    QUANTIFIER_MODIFIER("QM", "clause.type.quantifier.modifier"),
    ADPOSITION_APPURTENANT("AP", "clause.type.adposition.appurtenant");


    private static final Map<String, ClauseType> VALUE_TO_CLAUSE_MAP = Arrays.stream(ClauseType.values())
            .collect(Collectors.toMap(ClauseType::getValue, c -> c));
    private final String value;
    private final String labelKey;

    ClauseType(String value, String labelKey) {
        this.value = value;
        this.labelKey = labelKey;
    }

    public static ClauseType getByValue(String value) {
        return VALUE_TO_CLAUSE_MAP.getOrDefault(value, ALL);
    }

}
