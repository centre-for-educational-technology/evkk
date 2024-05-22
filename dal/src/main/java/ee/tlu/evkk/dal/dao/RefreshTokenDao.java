package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.RefreshToken;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Mapper
@Repository
public interface RefreshTokenDao {

  RefreshToken insert(@Param("refreshToken") RefreshToken refreshToken);

  void deleteByUserId(@Param("userId") UUID userId);

  RefreshToken findByToken(@Param("token") String token);

  void deleteByToken(@Param("token") String token);
}
