package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.WebPageStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/")
public class WebPageStatusController {

  @Autowired
  private WebPageStatusService webPageStatusService;

  @PostMapping("/check-status")
  public boolean checkWebPageStatus(@RequestBody String url) throws IOException {
    return webPageStatusService.checkWebPageStatus(url);
  }
}
