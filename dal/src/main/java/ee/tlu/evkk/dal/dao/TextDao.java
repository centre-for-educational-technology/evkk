package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.CorpusDownloadResponseEntity;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextQueryDisjunctionParamHelper;
import ee.tlu.evkk.dal.dto.TextQueryMultiParamHelper;
import ee.tlu.evkk.dal.dto.TextQueryRangeParamBaseHelper;
import ee.tlu.evkk.dal.dto.TextQuerySingleParamHelper;
import ee.tlu.evkk.dal.jdbc.SqlArray;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Mapper
@Repository
public interface TextDao {

  String findTextById(@Param("textId") UUID textId);

  String findTextsByIds(@Param("ids") Set<UUID> ids);

  String findTextMetadata(@Param("textId") UUID textId);

  List<String> findTextIdsByCorpusId(@Param("corpusId") String korpusekood);

  List<String> findTextIdAndTitleByCorpusId(@Param("corpusId") String korpusekood);

  String detailedTextQueryByParameters(@Param("multiParamHelpers") List<TextQueryMultiParamHelper> multiParamHelpers, @Param("singleParamHelpers") List<TextQuerySingleParamHelper> singleParamHelpers, @Param("rangeParamHelpers") List<TextQueryRangeParamBaseHelper> rangeParamHelpers, @Param("studyLevelAndDegreeHelper") TextQueryDisjunctionParamHelper studyLevelAndDegreeHelper, @Param("otherLangHelper") TextQuerySingleParamHelper otherLangHelper, @Param("usedMultiMaterialsHelper") TextQueryMultiParamHelper usedMultiMaterialsHelper);

  String findDetailedValueByPropertyName(@Param("pValue") String[] pValue, @Param("pName") String pName, @Param("cId") String[] cId); // property value, name, corpus id

  String findValueByPropertyName(@Param("cId") String cId); // corpus id

  String findMiniStats(@Param("cId") String[] cId); // corpus id

  String findAvailableValues(@Param("pName") String pName); // selected filter

  List<String> findTextsByCorpusId(@Param("corpusId") String corpusId);

  List<CorpusDownloadResponseEntity> findTextContentsAndTitlesByIds(@Param("ids") List<UUID> ids);

  List<CorpusDownloadResponseEntity> findTextTitlesAndContentsWithStanzaTaggingByIds(@Param("ids") List<UUID> ids, @Param("type") String type);

  Optional<Text> findById(@Param("id") UUID id);

  List<Text> search(@Param("filters") Map<String, SqlArray<String>> filters, @Param("limit") Integer limit, @Param("offset") Integer offset);

  List<Text> list(@Param("limit") Integer limit, @Param("offset") Integer offset);

  void insertAdding(@Param("id") UUID id, @Param("content") String content);

  void insertAddingProperty(@Param("id") UUID id, @Param("pname") String pname, @Param("pvalue") String pvalue);
}
