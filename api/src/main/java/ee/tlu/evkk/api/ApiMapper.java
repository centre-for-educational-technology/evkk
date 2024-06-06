package ee.tlu.evkk.api;

import ee.evkk.dto.integration.FileResponseEntity;
import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.api.controller.dto.TextSearchResponse;
import ee.tlu.evkk.api.controller.dto.UserDto;
import ee.tlu.evkk.api.controller.dto.UserFileResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnustusResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusResponseEntity;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;
import ee.tlu.evkk.dal.dto.User;
import ee.tlu.evkk.dal.dto.UserFileView;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

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

  public abstract MasinoppeEnustusResponseEntity toMasinoppeEnustusResponseEntity(String result);

  @Mapping(source = "aPublic", target = "isPublic")
  public abstract FileResponseEntity toFileResponseEntity(UserFileView userFileView, String url, Boolean aPublic);

  public abstract UserFileResponseEntity toUserFileResponseEntity(UserFileView userFileView);

  @Mapping(target = "textId", source = "text.id")
  protected abstract TextSearchResponse toTextSearchResponse(Text text, Map<String, String> properties, String downloadUrl);

  @Mapping(target = "fullName", expression = "java(user.getFirstName() + \" \" + user.getLastName())")
  public abstract UserDto toUserDto(User user);

  protected TextSearchResponse toTextSearchResponse(Text text, Collection<TextProperty> properties, String downloadUrl) {
    TreeMap<String, String> propertyMap = new TreeMap<>(String::compareTo);
    properties.forEach(property -> propertyMap.put(property.getPropertyName(), property.getPropertyValue()));
    return toTextSearchResponse(text, propertyMap, downloadUrl);
  }

  public TextSearchResponse toTextSearchResponse(TextWithProperties textWithProperties, String downloadUrl) {
    return toTextSearchResponse(textWithProperties.getText(), textWithProperties.getProperties(), downloadUrl);
  }

}
