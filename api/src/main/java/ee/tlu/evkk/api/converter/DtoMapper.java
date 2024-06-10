package ee.tlu.evkk.api.converter;

import ee.tlu.evkk.api.controller.dto.StatusResponseDto;
import ee.tlu.evkk.api.controller.dto.UserDto;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnnustusResponseDto;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusResponseDto;
import ee.tlu.evkk.dal.dto.User;
import org.mapstruct.Mapper;
import org.mapstruct.MapperConfig;
import org.mapstruct.Mapping;

import java.util.Map;

import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = "spring")
@MapperConfig(unmappedTargetPolicy = IGNORE)
public interface DtoMapper {

  StatusResponseDto toStatusResponseDto(UserDto user, String accessToken, Map<String, String> integrationPaths);

  MinitornPikkusResponseDto toMinitornPikkusResponseDto(Long length);

  MasinoppeEnnustusResponseDto toMasinoppeEnnustusResponseDto(String result);

  @Mapping(target = "fullName", expression = "java(user.getFirstName() + \" \" + user.getLastName())")
  UserDto toUserDto(User user);

}
