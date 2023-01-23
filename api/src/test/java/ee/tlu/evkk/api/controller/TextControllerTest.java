package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.IntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static ee.tlu.evkk.api.TestUtils.readResourceAsString;
import static ee.tlu.evkk.api.TestUtils.stringArrayToJson;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class TextControllerTest extends IntegrationTest {

  @Test
  @DisplayName("Syllabify text")
  void syllabifyText() throws Exception {
    var request = readResourceAsString("SyllabificationRequest.json");
    var response = readResourceAsString("SyllabificationResponse.json");

    var mockResponse = mockMvc.perform(
        post("/texts/silbid")
          .contentType(APPLICATION_JSON)
          .accept(APPLICATION_JSON)
          .content(request))
      .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

    var httpResourceResult = stringArrayToJson(mockResponse);
    var httpResourceExpected = stringArrayToJson(response);

    assertThat(httpResourceResult)
      .isEqualTo(httpResourceExpected);
  }
}
