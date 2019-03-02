package ee.tlu.evkk.portal.controller;

import ee.tlu.evkk.dal.dao.UserAccountFileDao;
import ee.tlu.evkk.dal.dto.UserAccountFileView;
import ee.tlu.evkk.portal.client.MeClient;
import ee.tlu.evkk.portal.client.StringLengthClient;
import ee.tlu.evkk.portal.security.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-11
 */
@Controller
@RequestMapping("/tools")
public class ToolsController {

    private final StringLengthClient stringLengthClient;
    private final MeClient meClient;
    private final UserAccountFileDao userAccountFileDao;

    @Autowired
    public ToolsController(StringLengthClient stringLengthClient, MeClient meClient, UserAccountFileDao userAccountFileDao) {
        this.stringLengthClient = stringLengthClient;
        this.meClient = meClient;
        this.userAccountFileDao = userAccountFileDao;
    }

    @GetMapping("/str-length")
    public String getStrLength() {
        return "tools/str-length";
    }

    @PostMapping("/str-length")
    public String postStrLength(@RequestParam("inputText") String inputText, Model model) {
        int length = stringLengthClient.getStringLengthOfCharSequence(inputText);
        model.addAttribute("result", length);
        return "tools/str-length";
    }

    @GetMapping("/example")
    public String getExample(@AuthenticationPrincipal AuthenticatedUser user, Model model) {
        if (user != null) {
            model.addAttribute("userAccountId", user.getUserAccountId());
        }
        return "tools/example";
    }

    @GetMapping("/ai-prediction")
    public String getAiPrediction(@AuthenticationPrincipal AuthenticatedUser user, Model model) {
        UUID userAccountId = user.getUserAccountId();
        List<UserAccountFileView> files = userAccountFileDao.getViewByUserAccountId(userAccountId);
        model.addAttribute("files", files);
        return "tools/ai-prediction";
    }


    @PostMapping("/ai-prediction")
    public String postAiPrediction(@RequestParam(value = "inputText", required = false) String inputText,
                                   @RequestParam(value = "fileId", required = false) List<UUID> fileIds,
                                   Model model) throws IOException, InterruptedException { //TODO: improve error handling
        String response = meClient.execute(inputText).replace("\n", "<br />");
        model.addAttribute("result", response);
        return "tools/ai-prediction";
    }

}
