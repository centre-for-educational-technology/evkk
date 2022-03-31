package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
public class Text {

  private UUID id;
  private String content;
  private String hash;

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

}
