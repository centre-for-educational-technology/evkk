package ee.tlu.evkk.api.controller;
import org.springframework.web.bind.annotation.*;
import ee.tlu.evkk.api.dao.TextDao;

import java.util.UUID;

import java.lang.ProcessBuilder;
import java.util.*;
import java.io.*;

@RestController
@RequestMapping("/texts")
public class TextController {
  TextDao textDao;
  public TextController(TextDao uusTDao) {
    textDao = uusTDao;
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
  public String tervitus(){
      return "Tere";
  }
  @GetMapping("/nimetervitus")
  public String nimetervitus(String eesnimi) {
      return "Tere, " + eesnimi;
  }
  @PostMapping("/lemmad")
  public String lemmad(String tekst) throws Exception {
      ProcessBuilder processBuilder = new ProcessBuilder("/opt/miniconda3/bin/python", "../ui/public/python/lemmad.py");
      processBuilder.redirectErrorStream(true);
      String tulemus = "";
    
      Process process = processBuilder.start();
      OutputStream stdin = process.getOutputStream();
      BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(tekst + "\n");
      writer.close();
      for(int i = 0; i < 14; i++) {
          String line = lugeja.readLine();
      }
      String line = lugeja.readLine();
      while(line != null) {
          //System.out.println(line);
          tulemus += line;
          line = lugeja.readLine();
      }
      return tulemus;
    }
  @PostMapping("/sonad")
  public String sonad(String tekst) throws Exception {
      ProcessBuilder processBuilder = new ProcessBuilder("/opt/miniconda3/bin/python", "../ui/public/python/sonad.py");
      processBuilder.redirectErrorStream(true);
      String tulemus = "";
    
      Process process = processBuilder.start();
      OutputStream stdin = process.getOutputStream();
      BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(tekst + "\n");
      writer.close();
      for(int i = 0; i < 12; i++) {
          String line = lugeja.readLine();
          System.out.println(line);
      }
      String line = lugeja.readLine();
      while(line != null) {
          tulemus += line;
          line = lugeja.readLine();
      }
      System.out.println(tulemus);
      return tulemus;
    }
    @PostMapping("/laused")
  public String laused(String tekst) throws Exception {
      ProcessBuilder processBuilder = new ProcessBuilder("/opt/miniconda3/bin/python", "../ui/public/python/laused.py");
      processBuilder.redirectErrorStream(true);
      String tulemus = "";
    
      Process process = processBuilder.start();
      OutputStream stdin = process.getOutputStream();
      BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(tekst + "\n");
      writer.close();
      for(int i = 0; i < 10; i++) {
          String line = lugeja.readLine();
      }
      String line = lugeja.readLine();
      while(line != null) {
          tulemus += line;
          line = lugeja.readLine();
      }
      return tulemus;
    }
}