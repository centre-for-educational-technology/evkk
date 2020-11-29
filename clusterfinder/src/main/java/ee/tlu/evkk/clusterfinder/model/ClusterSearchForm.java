package ee.tlu.evkk.clusterfinder.model;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ClusterSearchForm {

  private final String formId;

  private final String fileName;

  private final int analysisLength;

  private final boolean morfoAnalysis;

  private final boolean syntacticAnalysis;

  private final boolean includePunctuation;

  private final boolean wordtypeAnalysis;

  private final String sortingType;

  private final WordType wordType;

  private final ClauseType clauseType;

  private final List < String > wordTypeFilters;

  private final List < String > clauseTypeFilters;
}
