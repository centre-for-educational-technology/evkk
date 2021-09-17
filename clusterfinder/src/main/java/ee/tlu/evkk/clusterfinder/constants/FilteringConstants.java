package ee.tlu.evkk.clusterfinder.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor( access = AccessLevel.PRIVATE )
public class FilteringConstants
{
  public static final String CLAUSE_TYPE_SEPARATOR = "//";

  public static final String WORD_SUBTYPE_PARAM_SUFFIX = "-subtype[]";

  public static final String WORD_PERSPECTIVE_TYPE_PARAM_SUFFIX = "-perspectivetype[]";

  public static final String WORD_PLURAL_TYPE_PARAM_SUFFIX = "-pluralType[]";

  public static final String WORD_CASE_TYPE_PARAM_SUFFIX = "-casetype[]";

  public static final String WORD_STEP_TYPE_PARAM_SUFFIX = "-steptype[]";

  public static final String CLAUSE_TYPE_ADDITION_OPTIONS_PARAM = "clauseTypeAdditionals[]";
}
