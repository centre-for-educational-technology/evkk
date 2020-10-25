package ee.tlu.evkk.clusterfinder.template;

import ee.tlu.evkk.clusterfinder.client.EvkkClient;
import ee.tlu.evkk.clusterfinder.constants.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class ClusterFinderTemplate {

  private static final Map< String, String > AJAX_URLS = Map.ofEntries(
    Map.entry( "clusterText", AjaxConsts.CLUSTER_TEXT),
    Map.entry( "clusterDownload", AjaxConsts.CLUSTER_DOWNLOAD )
  );

  private final EvkkClient evkkClient;

  public ClusterFinderTemplate(EvkkClient evkkClient) {
    this.evkkClient = evkkClient;
  }

  @GetMapping( "/" )
  public String render( Model model,
                        @RequestParam( value = "evkkSessionToken", required = false ) String sessionToken,
                        @RequestParam( value = "userFileId", required = false ) String userFileId )
  {
    model.addAttribute( "userFiles", sessionToken != null ? evkkClient.listFiles( sessionToken ) : List.of() );
    model.addAttribute( "selectedFile", userFileId );
    model.addAttribute( "formId", UUID.randomUUID().toString() );
    return TemplateConstants.CLUSTER_SEARCH;
  }

  @ModelAttribute("ajaxUrls")
  public Map< String, String > getAjaxUrls()
  {
    return AJAX_URLS;
  }

  @ModelAttribute("wordTypes")
  public Map< String, String > getWordTypes()
  {
    return Arrays.stream(WordType.values())
                 .collect(Collectors.toMap(WordType::getValue, WordType::getLabelKey));
  }

  @ModelAttribute("punctuationTypes")
  public Map< String, String > getPunctuationTypes()
  {
    return Arrays.stream(PunctuationType.values())
                 .collect(Collectors.toMap(PunctuationType::getValue, PunctuationType::getLabelKey));
  }

  @ModelAttribute("clauseTypes")
  public Map< String, String > getClauseTypes()
  {
    return Arrays.stream(ClauseType.values())
                 .collect(Collectors.toMap(ClauseType::getValue, ClauseType::getLabelKey));
  }

}
