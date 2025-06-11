package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Exercise;
import ee.tlu.evkk.dal.dto.Material;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MaterialDao {
  void insertMaterial(Material material);
  void insertMaterialCategories(Material material);
}
