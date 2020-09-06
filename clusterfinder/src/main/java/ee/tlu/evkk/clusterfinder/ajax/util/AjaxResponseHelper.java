package ee.tlu.evkk.clusterfinder.ajax.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AjaxResponseHelper {

  public void returnSuccessWithContent(HttpServletResponse response, String[][] content) throws IOException {
    response.setStatus(HttpServletResponse.SC_OK);
    setResponseContent(response, content);
  }

  public void returnBadRequest(HttpServletResponse response)
  {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
  }

  public void returnForbidden(HttpServletResponse response)
  {
    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
  }

  private void setResponseContent(HttpServletResponse response, String[][] content) throws IOException {
    response.setContentType("application/json");
    response.getWriter().print(content);
    response.getWriter().flush();
  }
}
