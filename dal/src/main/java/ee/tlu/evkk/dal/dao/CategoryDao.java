package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CategoryDao {

  List<Category> findAllCategories();

  Category findById(@Param("id") Long id);

  void insert(@Param("category") Category category);
}
