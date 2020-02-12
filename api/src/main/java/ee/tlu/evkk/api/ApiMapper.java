package ee.tlu.evkk.api;

import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnustusResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusResponseEntity;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Mapper(
  unmappedTargetPolicy = ReportingPolicy.ERROR,
  typeConversionPolicy = ReportingPolicy.ERROR,
  nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT
)
public abstract class ApiMapper {

  public static final ApiMapper INSTANCE = Mappers.getMapper(ApiMapper.class);

  public abstract StatusResponseEntity toStatusResponseEntity(String loggedInEmailAddress, Map<String, String> integrationPaths);

  public abstract MinitornPikkusResponseEntity toMinitornPikkusResponseEntity(Long length);

  public abstract MasinoppeEnustusResponseEntity toMasinoppeEnustusResponseEntity(String result);

}
