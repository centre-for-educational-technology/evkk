package ee.tlu.evkk.api.constant;

import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor(access = PRIVATE)
public class AuthConstants {

  public static final int ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS = 1000 * 60 * 60; // 1 hour
  public static final int REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 14; // 14 days
  public static final int REFRESH_TOKEN_EXPIRES_IN_SECONDS = REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS / 1000;
}
