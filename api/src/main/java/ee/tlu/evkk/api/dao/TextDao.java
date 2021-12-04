package ee.tlu.evkk.api.dao;

import ee.tlu.evkk.api.dao.dto.Text;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.stereotype.Repository;

import ee.tlu.evkk.api.controller.dto.TextQueryHelper;

import java.sql.Array;
import java.util.UUID;
import java.util.List;

@Mapper
@Repository
public interface TextDao {
    String findTextById(@Param("textId") UUID textId);

    String findTextMetadata(@Param("textId") UUID textId);

    List<String> findTextIDsByCorpusID(@Param("corpusId") String korpusekood);

    List<String> findTextIDandTitleByCorpusID(@Param("corpusId") String korpusekood);

    String textTitleQueryByParameters(@Param("helperid") TextQueryHelper[] helperid);

    String findDetailedValueByPropertyName(@Param("pValue") String pValue[], @Param("pName") String pName, @Param("cId") String[] cId); // property value, name, corpus id

    String detailedSearch(@Param("pValue") String pValue[], @Param("pName") String pName, @Param("cId") String[] cId, @Param("join") String join, @Param("condition") String condition);

    String findValueByPropertyName(@Param("cId") String cId); // corpus id

    String findMiniStats(@Param("cId") String cId[]); // corpus id

    String findAvailableValues(@Param("pName") String pName); // selected filter

    List<String> findTextsByCorpusId(@Param("corpusId") String corpusId);

  Cursor<Text> search(@Param("korpus") Array korpus,
                      @Param("tekstityyp") Array tekstityyp,
                      @Param("keeletase") Array keeletase,
                      @Param("emakeel") Array emakeel,
                      @Param("kodukeel") Array kodukeel,
                      @Param("sugu") Array sugu,
                      @Param("vanus") Array vanus,
                      @Param("elukoht") Array elukoht);

}
