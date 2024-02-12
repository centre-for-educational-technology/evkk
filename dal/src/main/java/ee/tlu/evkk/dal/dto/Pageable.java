package ee.tlu.evkk.dal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
@Getter
@Setter
@AllArgsConstructor
public class Pageable {

  private final int pageSize;
  private final int pageNumber;

  public int getOffset() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
