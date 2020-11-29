package ee.tlu.evkk.clusterfinder.filters;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.filters.clausetype.*;
import org.springframework.stereotype.Component;

@Component
public class ClauseTypeFilterFactory
{
  public ClauseTypeFilter getFilter(ClauseType clauseType)
  {
    switch (clauseType)
    {
      case ALL:
        return new AllFilter();
      case PREDICATE:
        return new PredicateFilter();
      case BASIS:
        return new BasisFilter();
      case OBJECTIVE:
        return new ObjectiveFilter();
      case PEDICATE:
        return new PedicateFilter();
      case ADVERBIAL:
        return new AdverbialFilter();
      case ATTRIBUTE:
        return new AttributeFilter();
      case QUANTIFIER_MODIFIER:
        return new QuantifierModifierFilter();
      case ADPOSITION_APPURTENANT:
        return new AdpositionAppurtenantFilter();
      case CONJUNCTIVE_WORD:
        return new ConjunctiveWordFilter();
      case EXCLAMATION:
        return new ExclamationFilter();
      default:
        throw new UnsupportedOperationException( "Invalid clause type provided" );
    }
  }
}
