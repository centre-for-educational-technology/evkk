package ee.tlu.evkk.api;

import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.api.controller.dto.UserDto;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnnustusResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusResponseEntity;
import ee.tlu.evkk.dal.dto.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Map;

import static org.mapstruct.NullValueMappingStrategy.RETURN_DEFAULT;
import static org.mapstruct.ReportingPolicy.ERROR;
import static org.mapstruct.factory.Mappers.getMapper;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Mapper(unmappedTargetPolicy = ERROR, typeConversionPolicy = ERROR, nullValueMappingStrategy = RETURN_DEFAULT)
public abstract class ApiMapper {

  public static final ApiMapper INSTANCE = getMapper(ApiMapper.class);

  public abstract StatusResponseEntity toStatusResponseEntity(UserDto user, Map<String, String> integrationPaths);

  public abstract MinitornPikkusResponseEntity toMinitornPikkusResponseEntity(Long length);

  public abstract MasinoppeEnnustusResponseEntity toMasinoppeEnustusResponseEntity(String result);

  @Mapping(target = "fullName", expression = "java(user.getFirstName() + \" \" + user.getLastName())")
  public abstract UserDto toUserDto(User user);

}
