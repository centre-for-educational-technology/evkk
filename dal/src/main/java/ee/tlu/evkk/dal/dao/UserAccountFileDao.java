package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.UserAccountFile;
import ee.tlu.evkk.dal.dto.UserAccountFileView;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public interface UserAccountFileDao {

    UUID insert(@Param("userAccountFile") UserAccountFile userAccountFile);

    List<UserAccountFileView> getViewByUserAccountId(@Param("userAccountId") UUID userAccountId);

    UserAccountFileView getViewByUserAccountFileId(@Param("userAccountFileId") UUID userAccountFileId);

}