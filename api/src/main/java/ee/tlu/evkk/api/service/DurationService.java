package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.DurationDao;
import ee.tlu.evkk.dal.dto.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DurationService {

  private final DurationDao durationDao;

  public List<Duration> getAllDurations() {
    return durationDao.findAllDurations();
  }
}
