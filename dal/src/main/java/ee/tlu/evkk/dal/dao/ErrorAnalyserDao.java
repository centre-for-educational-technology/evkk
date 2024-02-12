package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.ErrorAnalyserSentence;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ErrorAnalyserDao {
  List<ErrorAnalyserSentence> findErrors(
      @Param("errors") List<String> errors,
      @Param("levels") List<String> levels,
      @Param("languages") List<String> languages);

  List<String> findFilterEnums(@Param("name") String name);
}
