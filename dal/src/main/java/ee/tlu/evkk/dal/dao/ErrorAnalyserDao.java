package ee.tlu.evkk.dal.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Mapper
@Repository
public interface ErrorAnalyserDao {

  List<String> findAll();

  String findSentenceById(@Param("sentenceId") UUID sentenceId);

  String findAnnotationBySentenceId(@Param("sentenceId") UUID sentenceId);

  String findAnnotationByErrorType(@Param("errorType") String errorType);
}
