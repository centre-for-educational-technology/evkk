package ee.tlu.evkk.api.controller.tools;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusRequestEntity;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusResponseEntity;
import ee.tlu.evkk.api.integration.MinitornPikkusClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@RestController
@RequestMapping("/tools/minitorn-pikkus")
public class MinitornPikkusController {

  private final MinitornPikkusClient client;

  public MinitornPikkusController(MinitornPikkusClient client) {
    this.client = client;
  }

  @PostMapping
  public MinitornPikkusResponseEntity post(@RequestBody @Valid MinitornPikkusRequestEntity requestEntity) {
    long length = client.getStringLengthOfCharSequence(requestEntity.getInput());
    return ApiMapper.INSTANCE.toMinitornPikkusResponseEntity(length);
  }

}
