package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.FileMaterial;
import ee.tlu.evkk.dal.dto.TextMaterial;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FileMaterialDao {
  List<FileMaterial> findAllFileMaterials();

  FileMaterial findById(@Param("id") Long id);

  void insertFileMaterial(FileMaterial fileMaterial);
}
