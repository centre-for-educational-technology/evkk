package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.TextMaterial;
import ee.tlu.evkk.dal.dto.VideoMaterial;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TextMaterialDao {
  List<TextMaterial> findAllTextMaterials();

  TextMaterial findById(@Param("id") Long id);

  void insertTextMaterial(TextMaterial textMaterial);
}
