//Original code by Reydan Niineorg

package ee.tlu.evkk.api.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TextToSpeechService {

  public String generateSpeech(String text, String speaker, double speed) {
    String url = "https://api.tartunlp.ai/text-to-speech/v2";
    try {
      HttpClient httpClient = HttpClients.createDefault();
      HttpPost httpPost = new HttpPost(url);

      // Set the request body
      Map<String, Object> requestBodyMap = new HashMap<>();
      requestBodyMap.put("text", text);
      requestBodyMap.put("speaker", speaker);
      requestBodyMap.put("speed", speed);

      StringEntity entity = new StringEntity(new Gson().toJson(requestBodyMap), ContentType.APPLICATION_JSON);
      httpPost.setEntity(entity);

      // Execute the request
      HttpResponse response = httpClient.execute(httpPost);
      int statusCode = response.getStatusLine().getStatusCode();

      if (statusCode == 200) {
        HttpEntity responseEntity = response.getEntity();

        if (responseEntity != null) {
          try (InputStream inputStream = responseEntity.getContent()) {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            int nRead;
            byte[] data = new byte[4];

            while ((nRead = inputStream.readNBytes(data, 0, data.length)) != 0) {
              buffer.write(data, 0, nRead);
            }

            byte[] targetArray = buffer.toByteArray();
            return Base64.getEncoder().encodeToString(targetArray);
          }
        }
      } else {
        return "API returned a non-200 status code: " + statusCode;
      }
    } catch (Exception e) {
      e.printStackTrace();
      return "Failed to generate speech.";
    }
    return "Failed to generate speech.";
  }
}
