package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextQueryCorpusHelper;
import ee.tlu.evkk.dal.dto.TextQueryParamHelper;
import ee.tlu.evkk.dal.dto.TextQueryRangeParamBaseHelper;
import ee.tlu.evkk.dal.jdbc.SqlArray;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface TextDao {

  String findTextById(@Param("textId") UUID textId);

  String findTextMetadata(@Param("textId") UUID textId);

  List<String> findTextIDsByCorpusID(@Param("corpusId") String korpusekood);

  List<String> findTextIDandTitleByCorpusID(@Param("corpusId") String korpusekood);

  String detailedTextQueryByParameters(@Param("corpusHelper") TextQueryCorpusHelper corpusHelper, @Param("paramHelper") List<TextQueryParamHelper> paramHelper, @Param("rangeParamHelper") List<TextQueryRangeParamBaseHelper> rangeParamHelper);

  String findDetailedValueByPropertyName(@Param("pValue") String[] pValue, @Param("pName") String pName, @Param("cId") String[] cId); // property value, name, corpus id

  String findValueByPropertyName(@Param("cId") String cId); // corpus id

  String findMiniStats(@Param("cId") String[] cId); // corpus id

  String findAvailableValues(@Param("pName") String pName); // selected filter

  List<String> findTextsByCorpusId(@Param("corpusId") String corpusId);

  Optional<Text> findById(@Param("id") UUID id);

  List<Text> search(@Param("filters") Map<String, SqlArray<String>> filters, @Param("limit") Integer limit, @Param("offset") Integer offset);

  List<Text> list(@Param("limit") Integer limit, @Param("offset") Integer offset);

}
