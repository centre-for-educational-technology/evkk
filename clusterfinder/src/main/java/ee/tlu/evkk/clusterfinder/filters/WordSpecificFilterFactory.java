package ee.tlu.evkk.clusterfinder.filters;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.wordspecific.*;
import org.springframework.stereotype.Component;

@Component
public class WordSpecificFilterFactory
{
  public WordSpecificFilter getFilter(WordType wordType)
  {
    switch (wordType)
    {
      case ALL:
        return new AllFilter();
      case VERB:
        return new VerbFilter();
      case SUBJECT:
        return new SubjectFilter();
      case ADJECTIVE:
        return new AdjectiveFilter();
      case PRONOUN:
        return new PronounFilter();
      case NUMERAL:
        return new NumeralFilter();
      case ADVERB:
        return new AdverbFilter();
      case CONJUNCTION:
        return new ConjunctionFilter();
      case ADPOSITION:
        return new AdpositionFilter();
      case ABBREVIATION:
        return new AbbreviationFilter();
      case PUNCTUATION:
        return new PunctuationFilter();
      default:
        throw new UnsupportedOperationException( "Invalid word type provided" );
    }
  }
}
