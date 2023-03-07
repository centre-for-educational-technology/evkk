package ee.tlu.evkk.core.service.dto;

import java.util.List;
import java.util.UUID;

public class CorpusDownloadDto {

  private List<UUID> fileList;
  private String form;
  private String type;

  public List<UUID> getFileList() {
    return fileList;
  }

  public void setFileList(List<UUID> fileList) {
    this.fileList = fileList;
  }

  public String getForm() {
    return form;
  }

  public void setForm(String form) {
    this.form = form;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }
}
