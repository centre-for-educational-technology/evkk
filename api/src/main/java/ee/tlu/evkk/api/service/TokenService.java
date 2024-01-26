package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.exception.TokenConsumedException;
import ee.tlu.evkk.api.exception.TokenExpiredException;
import ee.tlu.evkk.api.exception.TokenNotFoundException;
import ee.tlu.evkk.api.util.DaoUtils;
import ee.tlu.evkk.dal.dao.TokenDao;
import ee.tlu.evkk.dal.dto.Token;
import ee.tlu.evkk.dal.dto.TokenType;
import ee.tlu.evkk.dal.dto.TokenView;
import ee.tlu.evkk.dal.json.Json;
import ee.tlu.evkk.dal.json.JsonFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

import static java.lang.Boolean.TRUE;

/**
 * @author Mikk Tarvas
 * Date: 18.11.2019
 */
@Service
public class TokenService {

  private final JsonFactory jsonFactory;
  private final TokenDao tokenDao;
  private final Json emptyJsonMap;

  public TokenService(JsonFactory jsonFactory, TokenDao tokenDao) {
    this.jsonFactory = jsonFactory;
    this.tokenDao = tokenDao;
    this.emptyJsonMap = jsonFactory.createFromObject(new HashMap<>());
  }

  public UUID generate(TokenType tokenType, Json data) {
    if (tokenType == null) throw new NullPointerException();

    Token token = new Token();
    token.setType(tokenType);
    token.setData(data == null ? emptyJsonMap : data);
    return tokenDao.insert(token);
  }

  public Json consumeAndReturnData(TokenType tokenType, UUID tokenId) throws TokenNotFoundException, TokenExpiredException, TokenConsumedException {
    if (tokenType == null) throw new NullPointerException();

    TokenView tokenView = tokenDao.findViewById(tokenId);
    if (tokenView == null || tokenView.getType() != tokenType) throw new TokenNotFoundException();
    if (TRUE.equals(tokenView.getIsExpired())) throw new TokenExpiredException();
    if (TRUE.equals(tokenView.getIsConsumed())) throw new TokenConsumedException();

    int affectedRowCount = tokenDao.consume(tokenId);
    DaoUtils.ensureSingleAffectedRow(affectedRowCount);
    return tokenView.getData();
  }

}
