package ee.tlu.evkk.clusterfinder.ajax.helper;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.constants.PunctuationType;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.ClusterService;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Component
class ClusterFinderAjaxControllerHelperImpl implements ClusterFinderAjaxControllerHelper {

  private final ClusterService clusterService;

  ClusterFinderAjaxControllerHelperImpl(ClusterService clusterService) {
    this.clusterService = clusterService;
  }

  @Override
  public ResponseEntity<ClusterResult> clusterText(HttpServletRequest request) throws IOException
  {
    // TODO: Validate the form after assembly
    ClusterSearchForm assembledForm = assembleClusterSearchForm(request);
    ClusterResult clusteringResult = clusterService.clusterText(assembledForm);

    return ResponseEntity.ok(clusteringResult);
  }

  private ClusterSearchForm assembleClusterSearchForm(HttpServletRequest request)
  {
    ClusterSearchForm.ClusterSearchFormBuilder formBuilder = ClusterSearchForm.builder();
    addAnalysisTypeParams(formBuilder, request);
    addSpecificParams(formBuilder, request);

    return formBuilder.build();
  }

  private void addAnalysisTypeParams(ClusterSearchForm.ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
  {
    formBuilder
      .text(request.getParameter("userText"))
      .formId(request.getParameter("formId"))
      .analysisLength(asNumber(request.getParameter("analysisLength")))
      .morfoAnalysis(asBoolean(request.getParameter("morfological")))
      .syntacticAnalysis(asBoolean(request.getParameter("syntactic")))
      .wordtypeAnalysis(asBoolean(request.getParameter("wordtype")))
      .includePunctuation(asBoolean(request.getParameter("punctuation")));
  }

  private void addSpecificParams(ClusterSearchForm.ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
  {
    Map< String, String[] > paramsMap = request.getParameterMap();
    WordType wordType = WordType.getByValue(request.getParameter("wordType"));
    PunctuationType punctuationType = PunctuationType.getByValue(request.getParameter("punctuationType"));
    ClauseType clauseType = ClauseType.getByValue(request.getParameter("clauseType"));

    formBuilder
      .sortingType(request.getParameter("sorting"))
      .wordType(wordType)
      .clauseType(clauseType)
      .punctuationType(punctuationType)
      .clauseTypeAdditionals(paramsMap.get("clauseTypeAdditionals[]"))
      .wordSubType(paramsMap.get(wordType.name() + "-subType[]"))
      .wordCaseType(paramsMap.get(wordType.name() + "-caseType[]"))
      .wordPluralType(paramsMap.get(wordType.name() + "-pluralType[]"))
      .wordStepType(paramsMap.get(wordType.name() + "-stepType[]"))
      .perspectiveType(paramsMap.get(wordType.name() + "-perspectiveType[]"))
      .speechType(paramsMap.get(wordType.name() + "-speechType[]"))
      .wordRectionType(paramsMap.get(wordType.name() + "-rectionType[]"));
  }

  private boolean asBoolean(String value) {
    return Boolean.parseBoolean(value);
  }

  private int asNumber(String value) {
    return Integer.parseInt(value);
  }
}
