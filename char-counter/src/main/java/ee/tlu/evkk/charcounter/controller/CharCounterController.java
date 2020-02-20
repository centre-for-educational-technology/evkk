package ee.tlu.evkk.charcounter.controller;

import ee.evkk.dto.integration.FileResponseEntity;
import ee.tlu.evkk.charcounter.client.EvkkClient;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * @author Mikk Tarvas
 * Date: 18.02.2020
 */
@Controller
public class CharCounterController {

  private final EvkkClient evkkClient;

  public CharCounterController(EvkkClient evkkClient) {
    this.evkkClient = evkkClient;
  }

  @GetMapping("/")
  public String index(Model model, @RequestParam("evkkSessionToken") String sessionToken, @RequestParam(value = "userFileId", required = false) String userFileId) throws IOException {
    List<FileResponseEntity> files = evkkClient.listFiles(sessionToken);
    model.addAttribute("files", files);
    if (userFileId != null && !userFileId.isBlank()) model.addAttribute("stats", calculateStats(sessionToken, userFileId));
    else model.addAttribute("stats", null);
    return "index";
  }

  private String calculateStats(String sessionToken, String userFileId) throws IOException {
    Resource resource = evkkClient.downloadFile(sessionToken, userFileId);
    String asString;
    try (InputStream is = resource.getInputStream()) {
      asString = new String(is.readAllBytes());
    }

    HashMap<Character, Integer> characterCountMap = new HashMap<>();
    for (int i = 0; i < asString.length(); i++) {
      char currentChar = asString.charAt(i);
      // Ignore if whitespace, linebreak or BOM
      if (Character.isWhitespace(currentChar) || currentChar == '\n' || currentChar == '\r' || currentChar == '\uFEFF') continue;
      currentChar = Character.toLowerCase(currentChar);
      characterCountMap.putIfAbsent(currentChar, 0);
      Integer count = characterCountMap.get(currentChar);
      characterCountMap.put(currentChar, count + 1);
    }

    ArrayList<Map.Entry<Character, Integer>> entries = new ArrayList<>(characterCountMap.entrySet());
    entries.sort(Map.Entry.comparingByValue());
    Collections.reverse(entries);

    StringJoiner joiner = new StringJoiner("\n");
    for (Map.Entry<Character, Integer> entry : entries) {
      String content = StringEscapeUtils.escapeHtml4(entry.getKey() + " - " + entry.getValue());
      joiner.add("<li>" + content + "</li>");
    }

    return "<ul>" + joiner.toString() + "</ul>";
  }

}
