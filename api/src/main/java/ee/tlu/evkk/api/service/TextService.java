package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.service.dto.Option;
import ee.tlu.evkk.api.service.dto.TextSearchParams;
import org.springframework.stereotype.Service;

/**
 * @author Mikk Tarvas
 * Date: 14.11.2021
 */
// @Service
public class TextService {

  private static final Option[] KORPUS_OPTIONS = new Option[]{
    new Option("cFqPphvYi", "Eesti keele olümpiaadi tööd"),
    new Option("cwUSEqQLt", "Akadeemiline õppijakeel"),
    new Option("cwUprXCTL", "Eesti teaduskeel"),
    new Option("cFOoRQekA", "EVKK"),
    new Option("clWmOIrLa", "REKKi kogud"),
    new Option("cZjHWUPtD", "Vene keel kui võõrkeel"),
    new Option("cgSRJPKTr", "Vene keel kui emakeel"),
    new Option("cYDRkpymb", "K1 referentskorpus")
  };

  private static final TextSearchParams TEXT_SEARCH_PARAMS = new TextSearchParams(KORPUS_OPTIONS);



}
