package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dto.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

import static ee.tlu.evkk.api.constant.AuthConstants.ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS;
import static io.jsonwebtoken.io.Decoders.BASE64;
import static io.jsonwebtoken.security.Keys.hmacShaKeyFor;
import static java.lang.String.format;
import static java.lang.System.currentTimeMillis;

@Service
public class JwtService {

  private static final Set<String> tokenBlacklist = new HashSet<>();

  @Value("${auth.jwt-token-secret}")
  private String jwtTokenSecret;

  public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("emailAddress", user.getEmailAddress());
    claims.put("idCode", user.getIdCode());
    claims.put("idCodePrefix", user.getIdCodePrefix());
    claims.put("firstName", user.getFirstName());
    claims.put("lastName", user.getLastName());
    claims.put("fullName", format("%s %s", user.getFirstName(), user.getLastName()));
    claims.put("roleName", user.getRoleName());
    claims.put("uiLocales", user.getUiLocales());
    return createToken(claims, user.getIdCode());
  }

  public User extractUser(String token) {
    Claims claims = extractClaims(token);

    return new User(
      (String) claims.get("emailAddress"),
      (String) claims.get("idCode"),
      (String) claims.get("idCodePrefix"),
      (String) claims.get("firstName"),
      (String) claims.get("lastName"),
      (String) claims.get("roleName"),
      (String) claims.get("uiLocales")
    );
  }

  public void blacklistToken(String token) {
    tokenBlacklist.add(token);
  }

  public boolean isTokenValid(String token) {
    return extractExpiration(token).after(new Date()) && isTokenNotBlacklisted(token);
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private boolean isTokenNotBlacklisted(String token) {
    return !tokenBlacklist.contains(token);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    Claims claims = extractClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractClaims(String token) {
    return Jwts
      .parser()
      .verifyWith((SecretKey) getSignKey())
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }

  private String createToken(Map<String, Object> claims, String idCode) {
    return Jwts.builder()
      .claims(claims)
      .subject(idCode)
      .issuedAt(new Date(currentTimeMillis()))
      .expiration(new Date(currentTimeMillis() + ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS))
      .signWith(getSignKey())
      .compact();
  }

  private Key getSignKey() {
    byte[] keyBytes = BASE64.decode(jwtTokenSecret);
    return hmacShaKeyFor(keyBytes);
  }
}
