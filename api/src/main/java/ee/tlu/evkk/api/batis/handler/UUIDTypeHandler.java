package ee.tlu.evkk.api.batis.handler;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 16/03/2018
 */
public class UUIDTypeHandler extends AbstractUUIDTypeHandler<UUID> {

  @Override
  UUID getResultValue(String string) {
    return UUID.fromString(string);
  }

  @Override
  String getStringValue(UUID parameter) {
    return parameter.toString();
  }

}
