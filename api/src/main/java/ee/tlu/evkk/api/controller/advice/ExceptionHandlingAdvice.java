package ee.tlu.evkk.api.controller.advice;

import ee.tlu.evkk.api.controller.error.ErrorEntity;
import ee.tlu.evkk.api.controller.error.ErrorEntityFactory;
import ee.tlu.evkk.api.exception.AbstractBusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.List;
import java.util.Locale;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
@ControllerAdvice
public class ExceptionHandlingAdvice {

  private final ErrorEntityFactory errorEntityFactory;

  public ExceptionHandlingAdvice(ErrorEntityFactory errorEntityFactory) {
    this.errorEntityFactory = errorEntityFactory;
  }

  @ExceptionHandler(AbstractBusinessException.class)
  public ResponseEntity<List<ErrorEntity>> handleAbstractBusinessException(Locale locale, AbstractBusinessException ex) {
    ErrorEntity errorEntity = errorEntityFactory.create(locale, ex);
    return createResponseEntity(Collections.singletonList(errorEntity));
  }

  private ResponseEntity<List<ErrorEntity>> createResponseEntity(List<ErrorEntity> errors) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
  }

}
