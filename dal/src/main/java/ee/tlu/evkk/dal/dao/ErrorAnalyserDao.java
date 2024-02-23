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
      @Param("errorTypes") List<String> errors,
      @Param("languageLevels") List<String> levels,
      @Param("nativeLanguages") List<String> nativeLanguages,
      @Param("textTypes") List<String> textTypes,
      @Param("educationLevels") List<String> educationLevels,
      @Param("citizenshipList") List<String> citizenshipList,
      @Param("ageRanges") List<String> ageRanges);

  List<String> findFilterOptions(@Param("name") String name);
}
