package ee.tlu.evkk.api.dao;

import ee.tlu.evkk.api.dao.dto.Token;
import ee.tlu.evkk.api.dao.dto.TokenView;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 19.11.2019
 */
@Mapper
@Repository
public interface TokenDao {

  UUID insert(@Param("token") Token token);

  Token findById(@Param("tokenId") UUID tokenId);

  TokenView findViewById(@Param("tokenId") UUID tokenId);

  int consume(@Param("tokenId") UUID tokenId);

}
