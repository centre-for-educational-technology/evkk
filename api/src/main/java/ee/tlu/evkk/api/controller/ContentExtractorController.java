package ee.tlu.evkk.api.text.extractor;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import ee.tlu.evkk.api.text.extractor.ex.UnsupportedMimeTypeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController

public class ContentExtractorController {

    @Autowired
    private ContentExtractorExecutor extractor;

  @CrossOrigin("*")

  @Component
  public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, HEAD");
      response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      response.addHeader("Access-Control-Expose-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
      response.addHeader("Access-Control-Allow-Credentials", "true");
      response.addIntHeader("Access-Control-Max-Age", 10);
      filterChain.doFilter(request, response);
    }
  }

    @PostMapping("/textfromfile")
    public String ContentExtractorController(@RequestParam("file") MultipartFile[] files) throws UnsupportedMimeTypeException, TextExtractionException {
        String data = "";
        for(int i = 0; i < files.length; i++) {
            data += extractor.extract(files[i], files[i].getOriginalFilename());
        }
        return data;
    }
}
