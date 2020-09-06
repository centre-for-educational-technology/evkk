package ee.tlu.evkk.clusterfinder.ajax.helper;

import ee.tlu.evkk.clusterfinder.ajax.util.AjaxResponseHelper;
import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.constants.PunctuationType;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.ClusterService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
class ClusterFinderAjaxControllerHelperImpl implements ClusterFinderAjaxControllerHelper {

  private final ClusterService clusterService;

  private final AjaxResponseHelper ajaxResponseHelper;

  ClusterFinderAjaxControllerHelperImpl(ClusterService clusterService, AjaxResponseHelper ajaxResponseHelper) {
    this.clusterService = clusterService;
    this.ajaxResponseHelper = ajaxResponseHelper;
  }

  @Override
  public void clusterText(HttpServletRequest request, HttpServletResponse response) throws IOException
  {
    ClusterSearchForm assembledForm = assembleClusterSearchForm(request);
    ajaxResponseHelper.returnSuccessWithContent(response, new String[][] { { "clusterResult", clusterService.clusterText(assembledForm) } } );
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
      .morfoAnalysis(asBoolean(request.getParameter("morfological")))
      .syntacticAnalysis(asBoolean(request.getParameter("syntactic")))
      .wordtypeAnalysis(asBoolean(request.getParameter("wordtype")))
      .includePunctuation(asBoolean(request.getParameter("punctuation")));
  }

  private void addSpecificParams(ClusterSearchForm.ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
  {
    Map< String, String[] > paramsMap = request.getParameterMap();
    WordType wordType = WordType.getByValue(request.getParameter("wordType"));

    formBuilder
      .sortingType(request.getParameter("sorting"))
      .wordType(wordType)
      .clauseType(ClauseType.getByValue(request.getParameter("clauseType")))
      .punctuationType(PunctuationType.getByValue(request.getParameter("punctuationType")))
      .clauseTypeAdditionals(paramsMap.get("clauseTypeAdditionals[]"))
      .wordSubType(paramsMap.get(wordType.name() + "-subType[]"))
      .wordCaseType(paramsMap.get(wordType.name() + "-caseType[]"))
      .wordPluralType(paramsMap.get(wordType.name() + "-pluralType[]"))
      .wordStepType(paramsMap.get(wordType.name() + "-stepType[]"))
      .perspectiveType(paramsMap.get(wordType.name() + "-perspectiveType[]"))
      .speechType(paramsMap.get(wordType.name() + "-speechType[]"));
  }

  private boolean asBoolean(String value) {
    return Boolean.parseBoolean(value);
  }
}
