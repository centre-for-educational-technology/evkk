package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.UserFile;
import ee.tlu.evkk.dal.dto.UserFileView;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Mapper
@Repository
public interface UserFileDao {

  UUID insert(@Param("userFile") UserFile userFile);

  List<UserFileView> findViewsByUserId(@Param("userId") UUID userId);

  UserFileView findViewById(@Param("userFileId") UUID userFileId);

}
