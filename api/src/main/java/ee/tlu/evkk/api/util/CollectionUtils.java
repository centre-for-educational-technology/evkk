package ee.tlu.evkk.api.util;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class CollectionUtils {

  public static <T> List<T> toList(Iterable<T> iterable) {
    return StreamUtils.toStream(iterable).collect(Collectors.toList());
  }

}
