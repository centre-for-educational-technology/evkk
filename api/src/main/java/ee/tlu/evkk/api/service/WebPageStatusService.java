package ee.tlu.evkk.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class WebPageStatusService {

  private static boolean isSuccess(int responseCode) {
    return responseCode >= 200 && responseCode < 300;
  }

  public boolean checkWebPageStatus(String url) throws IOException {
    System.out.println(url);
    RestTemplate restTemplate = new RestTemplate();
    String request = "https://" + url;

    try {
      URL obj = new URL(request);
      HttpURLConnection connection = (HttpURLConnection) obj.openConnection();

      connection.setRequestMethod("GET");

      int responseCode = connection.getResponseCode();

      if (isSuccess(responseCode)) {
        return true;
      } else {
        System.out.println(request + ", response code " + responseCode);
        return false;
      }
    } catch (IOException e) {
      e.printStackTrace();
      return false;
    }

  }
}


