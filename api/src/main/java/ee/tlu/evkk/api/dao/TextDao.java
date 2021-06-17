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
}