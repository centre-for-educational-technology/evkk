package ee.tlu.evkk.api.dao;

import ee.tlu.evkk.api.dao.dto.SessionToken;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Mapper
@Repository
public interface SessionTokenDao {

  void upsert(@Param("userId") UUID userId, @Param("sessionId") String sessionId);

  UUID findIdByUserIdAndSessionId(@Param("userId") UUID userId, @Param("sessionId") String sessionId);

  SessionToken findById(@Param("sessionTokenId") UUID sessionTokenId);

}
