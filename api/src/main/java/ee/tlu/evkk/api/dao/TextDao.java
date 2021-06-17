package ee.tlu.evkk.api.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Mapper
@Repository
public interface TextDao {
    String findTextById(@Param("textId") UUID textId);
    List<String> findTextIDsByCorpusID(@Param("corpusId") String korpusekood);
    List<String> findTextIDandTitleByCorpusID(@Param("corpusId") String korpusekood);


    String findDetailedValueByPropertyName(@Param("pValue") String pValue[], @Param("pName") String pName, @Param("cId") String[] cId); // property value, name, corpus id

    String detailedSearch(@Param("pValue") String pValue[], @Param("pName") String pName, @Param("cId") String[] cId, @Param("join") String join, @Param("condition") String condition);

    String findValueByPropertyName(@Param("cId") String cId); // corpus id

    String findMiniStats(@Param("cId") String cId[]); // corpus id

    String findAvailableValues(@Param("pName") String pName); // selected filter

    List<String> findTextsByCorpusId(@Param("corpusId") String corpusId);
}