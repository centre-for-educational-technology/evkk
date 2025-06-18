package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.MaterialType;
import ee.tlu.evkk.dal.dto.TargetGroup;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TargetGroupDao {
  List<TargetGroup> findAllTargetGroups();
}
