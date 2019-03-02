package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.File;
import org.apache.ibatis.annotations.Param;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public interface FileDao {

    UUID insert(@Param("file") File file);

    File getById(@Param("id") UUID id);

}