package ee.tlu.evkk.clusterfinder.filters.wordtype;

import ee.tlu.evkk.clusterfinder.constants.WordType;

import java.util.List;
import java.util.Map;

public class VerbFilter implements WordTypeFilter
{
  private static final String FILTERING_PREFIX = WordType.VERB.getValue();

  private static final String WORD_TYPE_NAME = WordType.VERB.name();

  private static final String FINITE_TYPE_PARAM = WORD_TYPE_NAME + "-finitetype[]";

  private static final String TIME_TYPE_PARAM = WORD_TYPE_NAME + "-timeType[]";

  private static final String VOICE_TYPE_PARAM = WORD_TYPE_NAME + "-voiceType[]";

  private static final String SPEECH_SUBTYPE_PARAM = WORD_TYPE_NAME + "-speechsubtype[]";

  private static final String SUBTYPE_VK_PARAM = WORD_TYPE_NAME + "-subtypeVK[]";

  private static final String SUBTYPE_VK_PARTIC_PARAM = WORD_TYPE_NAME + "-subtypeVKPartic[]";

  private static final String SUBTYPE_VK_SUP_PARAM = WORD_TYPE_NAME + "-subtypeVKSup[]";

  @Override
  public List<String> getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    return List.of();
  }
}
