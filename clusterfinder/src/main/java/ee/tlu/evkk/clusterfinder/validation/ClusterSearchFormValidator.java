package ee.tlu.evkk.clusterfinder.validation;

import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.model.ValidationErrors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ClusterSearchFormValidator
{
  private static final Logger log = LoggerFactory.getLogger( ClusterSearchFormValidator.class );

  private static final int MINIMUM_ANALYSIS_LENGTH = 1;

  private static final int MAXIMUM_ANALYSIS_LENGTH = 5;

  public ValidationErrors validate( ClusterSearchForm searchForm )
  {
    log.debug( "Validating cluster search form: {}", searchForm );
    return validate( new SearchFormValidationContext( searchForm ) );
  }

  private static ValidationErrors validate( SearchFormValidationContext ctx )
  {
    ctx.validateAnalysisLength();
    ctx.validateAnalysisType();
    return ctx.errors;
  }

  private static class SearchFormValidationContext
  {
    private final ClusterSearchForm form;

    private final ValidationErrors errors;

    private SearchFormValidationContext( ClusterSearchForm form )
    {
      this.form = form;
      this.errors = new ValidationErrors();
    }

    /**
     * Validates the analysis length of the provided form.
     */
    public void validateAnalysisLength()
    {
      int analysisLength = form.getAnalysisLength();
      if ( analysisLength < MINIMUM_ANALYSIS_LENGTH || analysisLength > MAXIMUM_ANALYSIS_LENGTH )
      {
        errors.addError( "Invalid length provided", "analysisLength" );
      }
    }

    /**
     *  Validates the analysis type selection of the provided form.
     *
     *  Allowed combinations:
     *  <ul>
     *    <li>morfological</li>
     *    <li>morfological + punctuation</li>
     *    <li>syntactic</li>
     *    <li>syntactic + morfological</li>
     *    <li>syntactic + morfological + punctuation</li>
     *    <li>wordtype</li>
     *    <li>wordtype + punctuation</li>
     *  </ul>
     *
     */
    public void validateAnalysisType()
    {
      boolean morfological = form.isMorfoAnalysis();
      boolean syntactical = form.isSyntacticAnalysis();
      boolean wordtype = form.isWordtypeAnalysis();
      boolean punctuation = form.isIncludePunctuation();
      boolean morfosyntactic = form.isMorfoSyntacticAnalysis();

      if ( !morfological && !syntactical && !wordtype )
      {
        errors.addError( "Analysis type not selected", "analysisType" );
      }

      if ( (morfological || syntactical || morfosyntactic) && wordtype )
      {
        errors.addError( "Invalid analysis combination selected", "analysisType" );
      }

      if ( syntactical && punctuation )
      {
        errors.addError( "Invalid analysis combination selected", "analysisType" );
      }

      if ( punctuation && !morfological && !morfosyntactic && !wordtype )
      {
        errors.addError( "Invalid analysis combination selected", "analysisType" );
      }
    }
  }
}
