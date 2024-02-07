package ee.tlu.evkk.clusterfinder.ajax.helper;

import ee.tlu.evkk.clusterfinder.constants.InputType;
import ee.tlu.evkk.clusterfinder.constants.SortingType;
import ee.tlu.evkk.clusterfinder.exception.InvalidInputException;
import ee.tlu.evkk.clusterfinder.filters.FilterMarshaller;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm.ClusterSearchFormBuilder;
import ee.tlu.evkk.clusterfinder.model.ValidationErrors;
import ee.tlu.evkk.clusterfinder.service.ClusterService;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import ee.tlu.evkk.clusterfinder.validation.ClusterSearchFormValidator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static ee.tlu.evkk.clusterfinder.constants.SystemConstants.TEMP_DIR_WITH_SEPARATOR;
import static ee.tlu.evkk.clusterfinder.util.FileUtil.saveTextToFile;
import static java.lang.Integer.parseInt;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;
import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@Component
@AllArgsConstructor
@Slf4j
class ClusterFinderAjaxControllerHelperImpl implements ClusterFinderAjaxControllerHelper {

  private static final int DEFAULT_CLUSTERING_LENGTH = 0;

  private final ClusterService clusterService;
  private final ClusterSearchFormValidator validator;
  private final FilterMarshaller filterMarshaller;

  @Override
  public ResponseEntity<ClusterResult> clusterText(HttpServletRequest request) throws IOException, InvalidInputException {
    ClusterSearchForm assembledForm = assembleClusterSearchForm(request);
    ValidationErrors errors = validator.validate(assembledForm);
    if (errors.hasErrors()) {
      log.error("Search form contains validation errors: {}", errors);
      return badRequest().build();
    }

    ClusterResult clusteringResult = clusterService.clusterText(assembledForm);
    return ok(clusteringResult);
  }

  private ClusterSearchForm assembleClusterSearchForm(HttpServletRequest request) throws IOException, InvalidInputException {
    ClusterSearchForm.ClusterSearchFormBuilder formBuilder = ClusterSearchForm.builder();
    addAnalysisTypeParams(formBuilder, request);
    handleTextInputMethod(formBuilder, request);
    addSpecificParams(formBuilder, request);

    return formBuilder.build();
  }

  private void addAnalysisTypeParams(ClusterSearchFormBuilder formBuilder, HttpServletRequest request) {
    formBuilder
      .analysisLength(asNumber(request.getParameter("analysisLength")))
      .morfoAnalysis(asBoolean(request.getParameter("morfological")))
      .syntacticAnalysis(asBoolean(request.getParameter("syntactic")))
      .wordtypeAnalysis(asBoolean(request.getParameter("wordtype")))
      .includePunctuation(asBoolean(request.getParameter("punctuation")));
  }

  private void addSpecificParams(ClusterSearchFormBuilder formBuilder, HttpServletRequest request) {
    SortingType sortingType = SortingType.getByValue(request.getParameter("sorting"));

    formBuilder
      .sortingType(sortingType)
      .filters(filterMarshaller.marshalFilters(request))
      .partialFilters(asBoolean(request.getParameter("partialFilters")));
  }

  private void handleTextInputMethod(ClusterSearchFormBuilder formBuilder, HttpServletRequest request)
    throws IOException, InvalidInputException {
    // TODO: Simplify form building (a lot of unnecessary things are done in this class)
    InputType inputType = InputType.valueOf(request.getParameter("inputType"));
    String formId = request.getParameter("formId");
    String userText = request.getParameter("userText");

    switch (inputType) {
      case FREE_TEXT:
        saveTextToFile(userText, formId);
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

  private boolean asBoolean(String value) {
    return Boolean.parseBoolean(value);
  }

  private int asNumber(String value) {
    // Default clustering length is 0 in order to ensure validation functionality
    return isNotEmpty(value) ? parseInt(value) : DEFAULT_CLUSTERING_LENGTH;
  }
}
