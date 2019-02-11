package ee.tlu.evkk.portal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-11
 */
@Controller
public class RootController {

    @GetMapping("/")
    public String getIndex() {
        return "redirect:/about";
    }

    @GetMapping("/about")
    public String getHome() {
        return "about";
    }

    @GetMapping("/login")
    public String getLogin() {
        return "login";
    }

}
