package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.MissingTextProcessorResult;
import ee.tlu.evkk.dal.dto.TextProcessorResult;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface TextProcessorResultDao {

  Optional<UUID> upsert(@Param("textProcessorResult") TextProcessorResult textProcessorResult);

  Optional<TextProcessorResult> findResultForTypeAndVersion(@Param("textHash") String textHash, @Param("type") String type, @Param("version") Long version);

  Cursor<MissingTextProcessorResult> findMissingMissingTextProcessorResults(@Param("processors") Map<String, Long> processors);

}
