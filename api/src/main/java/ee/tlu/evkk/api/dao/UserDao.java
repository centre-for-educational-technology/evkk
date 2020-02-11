package ee.tlu.evkk.api.dao;

import ee.tlu.evkk.api.dao.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Mapper
@Repository
public interface UserDao {

  User findById(@Param("userId") UUID userId);

  User findByEmailAddress(@Param("emailAddress") String emailAddress);

}
