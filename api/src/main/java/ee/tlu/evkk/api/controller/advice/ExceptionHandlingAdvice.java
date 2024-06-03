package ee.tlu.evkk.api.controller.advice;

import ee.tlu.evkk.api.controller.error.ErrorEntity;
import ee.tlu.evkk.api.controller.error.ErrorEntityFactory;
import ee.tlu.evkk.api.exception.AbstractBusinessException;
import ee.tlu.evkk.api.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.Locale;

import static java.util.Collections.singletonList;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
@ControllerAdvice
@RequiredArgsConstructor
public class ExceptionHandlingAdvice {

  private final ErrorEntityFactory errorEntityFactory;

  @ExceptionHandler(AbstractBusinessException.class)
  public ResponseEntity<List<ErrorEntity>> handleAbstractBusinessException(Locale locale, AbstractBusinessException ex) {
    ErrorEntity errorEntity = errorEntityFactory.create(locale, ex);
    return createResponseEntity(singletonList(errorEntity));
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<Object> unauthorizedException() {
    return new ResponseEntity<>(UNAUTHORIZED);
  }

  private ResponseEntity<List<ErrorEntity>> createResponseEntity(List<ErrorEntity> errors) {
    return ResponseEntity.status(BAD_REQUEST).body(errors);
  }

}
