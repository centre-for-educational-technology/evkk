package ee.tlu.evkk.dal.dto;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
public class Pageable {

  private final int pageSize;
  private final int pageNumber;

  public Pageable(int pageSize, int pageNumber) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }

  public int getOffset() {
    return (this.pageNumber - 1) * this.pageSize;
  }

  public int getPageSize() {
    return pageSize;
  }

  public int getPageNumber() {
    return pageNumber;
  }

}
