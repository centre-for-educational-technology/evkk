package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Exercise;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ExerciseDao {

  List<Exercise> findAllExercises();

  Exercise findById(@Param("id") Long id);

  List<Exercise> getFilteredExercises(
    @Param("categories") List<String> categories,
    @Param("languageLevel") List<String> languageLevel
  );

  Exercise findByExternalId(@Param("externalId") String externalId);
  void insertExercise(Exercise exercise);
  void insertExerciseCategories(Exercise exercise);
  void insertExerciseTargetGroups(Exercise exercise);
}
