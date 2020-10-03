package ee.tlu.evkk.clusterfinder.model;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.constants.InputType;
import ee.tlu.evkk.clusterfinder.constants.PunctuationType;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClusterSearchForm {

  private final String formId;

  private final InputType inputType;

  private final String fileName;

  private final String text;

  private final int analysisLength;

  private final boolean morfoAnalysis;

  private final boolean syntacticAnalysis;

  private final boolean includePunctuation;

  private final boolean wordtypeAnalysis;

  private final String sortingType;

  private final WordType wordType;

  private final ClauseType clauseType;

  private final PunctuationType punctuationType;

  private final String[] clauseTypeAdditionals;

  private final String[] wordSubType;

  private final String[] wordCaseType;

  private final String[] wordPluralType;

  private final String[] wordStepType;

  private final String[] perspectiveType;

  private final String[] speechType;

  private final String[] wordRectionType;
}
