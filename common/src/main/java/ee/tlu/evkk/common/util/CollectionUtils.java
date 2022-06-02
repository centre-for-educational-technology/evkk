package ee.tlu.evkk.common.util;

import javax.annotation.Nonnull;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class CollectionUtils {

  private CollectionUtils() {
    throw new UnsupportedOperationException();
  }

  public static <T> boolean isNullOrEmpty(T[] arr) {
    return arr == null || arr.length == 0;
  }

  @Nonnull
  public static <SK, SV, TK, TV> Map<TK, TV> transformMap(@Nonnull Map<SK, SV> map, Function<SK, TK> keyTransformer, Function<SV, TV> valueTransformer) {
    return map.entrySet().stream().collect(Collectors.toUnmodifiableMap(entry -> keyTransformer.apply(entry.getKey()), entry -> valueTransformer.apply(entry.getValue())));
  }

}
