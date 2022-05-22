package ee.tlu.evkk.api.controller.error;

import ee.tlu.evkk.api.exception.AbstractBusinessException;
import ee.tlu.evkk.api.exception.FieldAwareBusinessException;
import ee.tlu.evkk.common.util.CollectionUtils;
import ee.tlu.evkk.api.util.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 05.06.2020
 */
@Component
public class ErrorEntityFactory {

  private static final String DEFAULT_ERROR_MESSAGE = "Unknown error";

  private final MessageSource messageSource;

  public ErrorEntityFactory(MessageSource messageSource) {
    this.messageSource = messageSource;
  }

  public ErrorEntity create(Locale locale, AbstractBusinessException ex) {
    String code = ex.getCode();
    String message = getMessage(locale, ex);
    String field = getField(ex);
    return create(code, message, field);
  }

  private ErrorEntity create(String code, String message, String field) {
    Objects.requireNonNull(code);
    Objects.requireNonNull(message);
    return new ErrorEntity(code, message, field);
  }

  private String getField(AbstractBusinessException ex) {
    return ex instanceof FieldAwareBusinessException ? ((FieldAwareBusinessException) ex).getField() : null;
  }

  private String getMessage(Locale locale, MessageSourceResolvable messageSourceResolvable) {
    try {
      return messageSource.getMessage(messageSourceResolvable, locale);
    } catch (Exception ex) {
      String[] codes = messageSourceResolvable.getCodes();
      if (CollectionUtils.isNullOrEmpty(codes)) return DEFAULT_ERROR_MESSAGE;
      String code = codes[0];
      if (StringUtils.isNullOrBlank(code)) return DEFAULT_ERROR_MESSAGE;
      return code;
    }
  }

}
