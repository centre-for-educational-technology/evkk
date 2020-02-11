package ee.tlu.evkk.api.dao;

import ee.tlu.evkk.api.dao.dto.File;
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
public interface FileDao {

  UUID insert(@Param("file") File file);

  File findById(@Param("fileId") UUID fileId);

  int delete(@Param("fileId") UUID fileId);


}
