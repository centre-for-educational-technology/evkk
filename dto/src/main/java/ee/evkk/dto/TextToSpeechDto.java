package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class TextToSpeechDto {

  @NotBlank
  private String text;
  @NotNull
  private String speaker;
  @NotNull
  private double speed;
}
