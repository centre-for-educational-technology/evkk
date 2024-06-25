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

import static java.lang.String.format;
import static org.apache.commons.lang3.StringUtils.isEmpty;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = "spring")
@MapperConfig(unmappedTargetPolicy = IGNORE)
public interface DtoMapper {

  StatusResponseDto toStatusResponseDto(UserDto user, String accessToken, Map<String, String> integrationPaths);

  MinitornPikkusResponseDto toMinitornPikkusResponseDto(Long length);

  MasinoppeEnnustusResponseDto toMasinoppeEnnustusResponseDto(String result);

  @Mapping(target = "fullName", expression = "java(getFullName(user))")
  UserDto toUserDto(User user);

  // This method is in use as a Java expression for toUserDto
  default String getFullName(User user) {
    return format("%s%s %s",
      user.getFirstName(),
      isEmpty(user.getMiddleName()) ? "" : " " + user.getMiddleName(),
      user.getLastName()
    );
  }

}
