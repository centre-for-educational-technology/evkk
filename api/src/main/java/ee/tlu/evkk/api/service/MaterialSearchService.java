package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.ExerciseDao;
import ee.tlu.evkk.dal.dao.MaterialDao;
import ee.tlu.evkk.dal.dto.Exercise;
import ee.tlu.evkk.dal.dto.Material;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialSearchService {

  private final MaterialDao materialDao;

  public MaterialSearchService(MaterialDao materialDao) {
    this.materialDao = materialDao;
  }

  public List<Material> getFilteredStudyMaterials(List<String> categories, List<String> languageLevel, List<String> materialType) {
    return materialDao.getFilteredStudyMaterials(categories, languageLevel, materialType);
  }
}
