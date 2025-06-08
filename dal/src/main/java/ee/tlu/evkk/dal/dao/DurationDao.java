package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Duration;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DurationDao {

  List<Duration> findAllDurations();

  Duration findById(@Param("id") Long id);

  void insert(@Param("duration") Duration duration);
}
