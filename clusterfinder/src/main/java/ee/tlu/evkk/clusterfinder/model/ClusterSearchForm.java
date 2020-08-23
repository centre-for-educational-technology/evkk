package ee.tlu.evkk.clusterfinder.model;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.constants.PunctuationType;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import lombok.Builder;

@Builder
public class ClusterSearchForm {

  private final String[] analysisType;

  private final String sortingType;

  private final WordType wordType;

  private final ClauseType clauseType;

  private final PunctuationType punctuationType;

  private final String[] clauseTypeAdditionals;

  private final String[] wordSubType;

  private final String[] wordCaseType;

  private final String[] wordPluralType;

  private final String[] wordRectionType;

  private final String[] wordStepType;
}
