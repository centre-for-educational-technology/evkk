package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.CategoryDao;
import ee.tlu.evkk.dal.dto.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryDao categoryDao;

  public List<Category> getAllCategories() {
    return categoryDao.findAllCategories();
  }
}
