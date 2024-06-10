package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.AccessToken;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Mapper
@Repository
public interface AccessTokenDao {

  String insert(@Param("accessToken") AccessToken accessToken);

  AccessToken findByUserId(@Param("userId") UUID userId);

  String findByToken(@Param("token") String token);

  void deleteByToken(@Param("token") String token);

  void deleteByUserId(@Param("userId") UUID userId);
}
