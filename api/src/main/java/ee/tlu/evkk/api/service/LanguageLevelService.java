package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.LanguageLevelDao;
import ee.tlu.evkk.dal.dto.LanguageLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LanguageLevelService {

  private final LanguageLevelDao languageLevelDao;

  public List<LanguageLevel> getAllLanguageLevels() {
    return languageLevelDao.findAllLanguageLevels();
  }
}
