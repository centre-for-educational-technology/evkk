package ee.tlu.evkk.api.controller.tools;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnnustusRequestEntity;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnustusResponseEntity;
import ee.tlu.evkk.api.integration.MasinoppeEnnustusClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@RestController
@RequestMapping("/tools/masinoppe-ennustus")
public class MasinoppeEnnustusController {

  private final MasinoppeEnnustusClient client;

  public MasinoppeEnnustusController(MasinoppeEnnustusClient client) {
    this.client = client;
  }

  @PostMapping
  public MasinoppeEnustusResponseEntity post(@RequestBody @Valid MasinoppeEnnustusRequestEntity requestEntity) throws IOException, InterruptedException {
    String result = client.execute(requestEntity.getInput());
    return ApiMapper.INSTANCE.toMasinoppeEnustusResponseEntity(result);
  }

}
