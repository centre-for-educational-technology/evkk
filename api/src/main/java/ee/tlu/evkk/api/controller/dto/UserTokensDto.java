package ee.tlu.evkk.api.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class UserTokensDto {

  @NotBlank
  private String accessToken;

  @NotBlank
  private String refreshToken;
}
