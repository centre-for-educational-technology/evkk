package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.LanguageLevel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LanguageLevelDao {

  List<LanguageLevel> findAllLanguageLevels();

  LanguageLevel findById(@Param("id") Long id);

  void insert(@Param("language_level") LanguageLevel languageLevel);
}
