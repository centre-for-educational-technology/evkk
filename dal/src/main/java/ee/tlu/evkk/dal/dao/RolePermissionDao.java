package ee.tlu.evkk.dal.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
@Mapper
@Repository
public interface RolePermissionDao {

  Set<String> findPermissionNamesByRoleName(@Param("roleName") String roleName);

}
