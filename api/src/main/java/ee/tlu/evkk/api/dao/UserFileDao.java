package ee.tlu.evkk.api.dao;

import ee.tlu.evkk.api.dao.dto.UserFile;
import ee.tlu.evkk.api.dao.dto.UserFileView;
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
