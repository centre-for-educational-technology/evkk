package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.dao.TextDao;
import ee.tlu.evkk.api.integration.StanzaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/texts")
public class TextController {

  private final TextDao textDao;
  private final StanzaClient stanzaClient;

  public TextController(TextDao uusTDao, StanzaClient stanzaClient) {
    textDao = uusTDao;
    this.stanzaClient = stanzaClient;
  }

  @GetMapping("/kysitekst")
  public String kysiTekst(String id) {
    return textDao.findTextById(UUID.fromString(id));
  }

  @GetMapping("/kysikorpusetekstiIDd")
  public List<String> kysikorpusetekstiIDd(String korpusekood) {
    return textDao.findTextIDsByCorpusID(korpusekood);
  }

  @GetMapping("/kysikorpusetekstiIDjapealkiri")
  public List<String> kysikorpusetekstiIDjapealkiri(String korpusekood) {
    return textDao.findTextIDandTitleByCorpusID(korpusekood);
  }

  @GetMapping("/tervitus")
  public String tervitus() {
    return "Tere";
  }

  @GetMapping("/nimetervitus")
  public String nimetervitus(String eesnimi) {
    return "Tere, " + eesnimi;
  }

  public static class LemmadRequestEntity {

    private String tekst;

    public String getTekst() {
      return tekst;
    }

    public void setTekst(String tekst) {
      this.tekst = tekst;
    }
  }

  @PostMapping("/lemmad")
  public ResponseEntity<List<String>> lemmad(@RequestBody LemmadRequestEntity request) {

    String[] lemmad = stanzaClient.getLemmad(request.getTekst());

    /*
    ProcessBuilder processBuilder = new ProcessBuilder("python", "../ui/public/python/lemmad.py");
    processBuilder.redirectErrorStream(true);
    String tulemus = "";

    Process process = processBuilder.start();
    OutputStream stdin = process.getOutputStream();
    BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
    writer.write(tekst + "\n");
    writer.close();
    for (int i = 0; i < 14; i++) {
      String line = lugeja.readLine();
    }
    String line = lugeja.readLine();
    while (line != null) {
      //System.out.println(line);
      tulemus += line;
      line = lugeja.readLine();
    }
    return tulemus;

     */

    List<String> body = Arrays.asList(lemmad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/sonad")
  public ResponseEntity<List<String>> sonad(@RequestBody LemmadRequestEntity request) {
    String[] sonad = stanzaClient.getSonad(request.getTekst());
    List<String> body = Arrays.asList(sonad);
    return ResponseEntity.ok(body);
  }

  /*
  @PostMapping("/sonad")
  public String sonad(String tekst) throws Exception {
    ProcessBuilder processBuilder = new ProcessBuilder("python", "../ui/public/python/sonad.py");
    processBuilder.redirectErrorStream(true);
    String tulemus = "";

    Process process = processBuilder.start();
    OutputStream stdin = process.getOutputStream();
    BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
    writer.write(tekst + "\n");
    writer.close();
    for (int i = 0; i < 12; i++) {
      String line = lugeja.readLine();
      System.out.println(line);
    }
    String line = lugeja.readLine();
    while (line != null) {
      tulemus += line;
      line = lugeja.readLine();
    }
    System.out.println(tulemus);
    return tulemus;
  }*/

  @PostMapping("/laused")
  public String laused(String tekst) throws Exception {
    ProcessBuilder processBuilder = new ProcessBuilder("python", "../ui/public/python/laused.py");
    processBuilder.redirectErrorStream(true);
    String tulemus = "";

    Process process = processBuilder.start();
    OutputStream stdin = process.getOutputStream();
    BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
    writer.write(tekst + "\n");
    writer.close();
    for (int i = 0; i < 10; i++) {
      String line = lugeja.readLine();
    }
    String line = lugeja.readLine();
    while (line != null) {
      tulemus += line;
      line = lugeja.readLine();
    }
    return tulemus;
  }

}
