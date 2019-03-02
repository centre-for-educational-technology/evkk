package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.UserAccount;
import org.apache.ibatis.annotations.Param;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public interface UserAccountDao {

    UserAccount findById(@Param("id") UUID id);

    UserAccount findByEmailAddress(@Param("emailAddress") String emailAddress);

}