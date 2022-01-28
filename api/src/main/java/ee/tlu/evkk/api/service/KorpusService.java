package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.dal.dto.Korpus;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 14.11.2021
 */
@Service
public class KorpusService {

  private static final List<Korpus> LIST = List.of(
    ApiMapper.INSTANCE.toKorpus("cFqPphvYi", "Eesti keele olümpiaadi tööd"),
    ApiMapper.INSTANCE.toKorpus("cwUSEqQLt", "Akadeemiline õppijakeel"),
    ApiMapper.INSTANCE.toKorpus("cwUprXCTL", "Eesti teaduskeel"),
    ApiMapper.INSTANCE.toKorpus("cFOoRQekA", "EVKK"),
    ApiMapper.INSTANCE.toKorpus("clWmOIrLa", "REKKi kogud"),
    ApiMapper.INSTANCE.toKorpus("cZjHWUPtD", "Vene keel kui võõrkeel"),
    ApiMapper.INSTANCE.toKorpus("cgSRJPKTr", "Vene keel kui emakeel"),
    ApiMapper.INSTANCE.toKorpus("cYDRkpymb", "K1 referentskorpus")
  );

  public List<Korpus> findAll() {
    return LIST;
  }

}
