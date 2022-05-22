package ee.tlu.evkk.api;

import ee.evkk.dto.integration.FileResponseEntity;
import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.api.controller.dto.TextSearchResponse;
import ee.tlu.evkk.api.controller.dto.UserFileResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MasinoppeEnustusResponseEntity;
import ee.tlu.evkk.api.controller.tools.dto.MinitornPikkusResponseEntity;
import ee.tlu.evkk.api.security.AuthenticatedUser;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.dal.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.ERROR, typeConversionPolicy = ReportingPolicy.ERROR, nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT)
public abstract class ApiMapper {

  public static final ApiMapper INSTANCE = Mappers.getMapper(ApiMapper.class);

  public abstract StatusResponseEntity toStatusResponseEntity(String loggedInEmailAddress, Map<String, String> integrationPaths);

  public abstract MinitornPikkusResponseEntity toMinitornPikkusResponseEntity(Long length);

  public abstract MasinoppeEnustusResponseEntity toMasinoppeEnustusResponseEntity(String result);

  @Mapping(source = "aPublic", target = "public")
  public abstract FileResponseEntity toFileResponseEntity(UserFileView userFileView, String url, Boolean aPublic);

  public abstract UserFileResponseEntity toUserFileResponseEntity(UserFileView userFileView);

  public AuthenticatedUser toAuthenticatedUser(User user, Iterable<String> permissionNames) {
    List<SimpleGrantedAuthority> authorities = StreamSupport.stream(permissionNames.spliterator(), false).map(permissionName -> new SimpleGrantedAuthority("ROLE_" + permissionName)).collect(Collectors.toList());
    return new AuthenticatedUser(user.getUserId(), user.getEmailAddress(), user.getPasswordHash(), true, true, true, true, authorities);
  }

  @Mapping(target = "textId", source = "text.id")
  protected abstract TextSearchResponse toTextSearchResponse(Text text, Map<String, String> properties, String downloadUrl);

  protected TextSearchResponse toTextSearchResponse(Text text, Collection<TextProperty> properties, String downloadUrl) {
    TreeMap<String, String> propertyMap = new TreeMap<>(String::compareTo);
    properties.forEach(property -> propertyMap.put(property.getPropertyName(), property.getPropertyValue()));
    return toTextSearchResponse(text, propertyMap, downloadUrl);
  }

  public TextSearchResponse toTextSearchResponse(TextWithProperties textWithProperties, String downloadUrl) {
    return toTextSearchResponse(textWithProperties.getText(), textWithProperties.getProperties(), downloadUrl);
  }

}
