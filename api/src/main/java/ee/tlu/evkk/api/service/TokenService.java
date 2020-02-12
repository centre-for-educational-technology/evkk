package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.dao.TokenDao;
import ee.tlu.evkk.api.dao.dto.Json;
import ee.tlu.evkk.api.dao.dto.Token;
import ee.tlu.evkk.api.dao.dto.TokenType;
import ee.tlu.evkk.api.dao.dto.TokenView;
import ee.tlu.evkk.api.exception.TokenConsumedException;
import ee.tlu.evkk.api.exception.TokenExpiredException;
import ee.tlu.evkk.api.exception.TokenNotFoundException;
import ee.tlu.evkk.api.util.DaoUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 18.11.2019
 */
@Service
public class TokenService {

  private static final Json EMPTY_JSON_MAP = Json.createFromObject(new HashMap<>());

  private final TokenDao tokenDao;

  public TokenService(TokenDao tokenDao) {
    this.tokenDao = tokenDao;
  }

  public UUID generate(TokenType tokenType, Json data) {
    if (tokenType == null) throw new NullPointerException();

    Token token = new Token();
    token.setType(tokenType);
    token.setData(data == null ? EMPTY_JSON_MAP : data);
    return tokenDao.insert(token);
  }

  public Json consumeAndReturnData(TokenType tokenType, UUID tokenId) throws TokenNotFoundException, TokenExpiredException, TokenConsumedException {
    if (tokenType == null) throw new NullPointerException();

    TokenView tokenView = tokenDao.findViewById(tokenId);
    if (tokenView == null || tokenView.getType() != tokenType) throw new TokenNotFoundException();
    if (tokenView.getExpired()) throw new TokenExpiredException();
    if (tokenView.getConsumed()) throw new TokenConsumedException();

    int affectedRowCount = tokenDao.consume(tokenId);
    DaoUtils.ensureSingleAffectedRow(affectedRowCount);
    return tokenView.getData();
  }

}
