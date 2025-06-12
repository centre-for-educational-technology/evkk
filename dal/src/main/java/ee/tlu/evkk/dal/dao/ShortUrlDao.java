package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.dto.Material;
import ee.tlu.evkk.dal.dto.ShortUrl;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ShortUrlDao {
  void insertShortUrl(ShortUrl shortUrl);
  ShortUrl findById(@Param("id") Long id);
}
