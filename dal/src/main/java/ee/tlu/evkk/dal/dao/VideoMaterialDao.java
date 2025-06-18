package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.VideoMaterial;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface VideoMaterialDao {
  List<VideoMaterial> findAllVideoMaterials();

  VideoMaterial findById(@Param("id") Long id);

  void insertVideoMaterial(VideoMaterial videoMaterial);
}
