package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 14.11.2021
 */
public class Corpus {

  private UUID corpusId;
  private String reference;
  private String name;

  public UUID getCorpusId() {
    return corpusId;
  }

  public void setCorpusId(UUID corpusId) {
    this.corpusId = corpusId;
  }

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
