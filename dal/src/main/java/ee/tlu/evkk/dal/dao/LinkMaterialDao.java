package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Exercise;
import ee.tlu.evkk.dal.dto.LinkMaterial;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LinkMaterialDao {
  List<LinkMaterial> findAllLinkMaterials();

  LinkMaterial findById(@Param("id") Long id);

  void insertLinkMaterial(LinkMaterial linkMaterial);
}
