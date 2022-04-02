package ee.tlu.evkk.clusterfinder.ajax.helper;

import ee.tlu.evkk.clusterfinder.constants.InputType;
import ee.tlu.evkk.clusterfinder.constants.SortingType;
import ee.tlu.evkk.clusterfinder.exception.InvalidInputException;
import ee.tlu.evkk.clusterfinder.filters.FilterMarshaller;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.model.ValidationErrors;
import ee.tlu.evkk.clusterfinder.service.ClusterService;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import ee.tlu.evkk.clusterfinder.util.FileUtil;
import ee.tlu.evkk.clusterfinder.validation.ClusterSearchFormValidator;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static ee.tlu.evkk.clusterfinder.constants.SystemConstants.TEMP_DIR_WITH_SEPARATOR;

@Component
class ClusterFinderAjaxControllerHelperImpl implements ClusterFinderAjaxControllerHelper
{
  private static final Logger log = LoggerFactory.getLogger( ClusterFinderAjaxControllerHelperImpl.class );

  private static final int DEFAULT_CLUSTERING_LENGTH = 3;

  private final ClusterService clusterService;

  private final ClusterSearchFormValidator validator;

  private final FilterMarshaller filterMarshaller;

  ClusterFinderAjaxControllerHelperImpl(ClusterService clusterService, ClusterSearchFormValidator validator, FilterMarshaller filterMarshaller)
  {
    this.clusterService = clusterService;
    this.validator = validator;
    this.filterMarshaller = filterMarshaller;
  }

  @Override
  public ResponseEntity<ClusterResult> clusterText(HttpServletRequest request) throws IOException, InvalidInputException
  {
    ClusterSearchForm assembledForm = assembleClusterSearchForm(request);
    ValidationErrors errors = validator.validate( assembledForm );
    if ( errors.hasErrors() )
    {
      log.error( "Search form contains validation errors: {}", errors );
      return ResponseEntity.badRequest().build();
    }

    ClusterResult clusteringResult = clusterService.clusterText(assembledForm);
    return ResponseEntity.ok( clusteringResult );
  }

  private ClusterSearchForm assembleClusterSearchForm(HttpServletRequest request) throws IOException, InvalidInputException
  {
    ClusterSearchForm.ClusterSearchFormBuilder formBuilder = ClusterSearchForm.builder();
    addAnalysisTypeParams(formBuilder, request);
    handleTextInputMethod(formBuilder, request);
    addSpecificParams(formBuilder, request);

    return formBuilder.build();
  }

  private void addAnalysisTypeParams(ClusterSearchForm.ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
  {
    formBuilder
      .analysisLength(asNumber(request.getParameter("analysisLength")))
      .morfoAnalysis(asBoolean(request.getParameter("morfological")))
      .syntacticAnalysis(asBoolean(request.getParameter("syntactic")))
      .wordtypeAnalysis(asBoolean(request.getParameter("wordtype")))
      .includePunctuation(asBoolean(request.getParameter("punctuation")));
  }

  private void addSpecificParams(ClusterSearchForm.ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
  {
    SortingType sortingType = SortingType.getByValue(request.getParameter("sorting"));

    formBuilder
      .sortingType(sortingType)
      .filters(filterMarshaller.marshalFilters(request));
  }

  private void handleTextInputMethod(ClusterSearchForm.ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
      throws IOException, InvalidInputException
  {
    // TODO: Simplify form building (a lot of unnecessary things are done in this class)
    InputType inputType = InputType.valueOf(request.getParameter("inputType"));
    String formId = request.getParameter("formId");
    String userText = request.getParameter("userText");

    switch (inputType) {
      case FREE_TEXT:
        FileUtil.saveTextToFile(userText, formId);
        formBuilder.formId(formId);
        formBuilder.fileName(TEMP_DIR_WITH_SEPARATOR + formId + ".txt");
        break;
      case FILE_BASED_TEXT:
        formBuilder.fileName(TEMP_DIR_WITH_SEPARATOR + request.getParameter("fileName"));
        break;
      default:
        throw new InvalidInputException("Invalid input provided");
    }
  }

  private boolean asBoolean(String value)
  {
    return Boolean.parseBoolean(value);
  }

  private int asNumber(String value)
  {
    return StringUtils.isNotEmpty( value ) ? Integer.parseInt(value) : DEFAULT_CLUSTERING_LENGTH;
  }
}
