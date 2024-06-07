package ee.tlu.evkk.api.controller.tools;

import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnnustusRequestEntity;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnnustusResponseEntity;
import ee.tlu.evkk.api.integration.MasinoppeEnnustusClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

import static ee.tlu.evkk.api.ApiMapper.INSTANCE;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/tools/masinoppe-ennustus")
public class MasinoppeEnnustusController {

  private final MasinoppeEnnustusClient client;

  @PostMapping
  public MasinoppeEnnustusResponseEntity post(@RequestBody @Valid MasinoppeEnnustusRequestEntity requestEntity) throws IOException, InterruptedException {
    String result = client.execute(requestEntity.getInput());
    return INSTANCE.toMasinoppeEnustusResponseEntity(result);
  }

}
