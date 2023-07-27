package ee.evkk.dto;

import ee.evkk.dto.enums.CorpusDownloadFileType;
import ee.evkk.dto.enums.CorpusDownloadForm;

import java.util.List;
import java.util.UUID;

public class CorpusDownloadDto {

  private List<UUID> fileList;
  private CorpusDownloadForm form;
  private CorpusDownloadFileType fileType;

  public List<UUID> getFileList() {
    return fileList;
  }

  public void setFileList(List<UUID> fileList) {
    this.fileList = fileList;
  }

  public CorpusDownloadForm getForm() {
    return form;
  }

  public void setForm(CorpusDownloadForm form) {
    this.form = form;
  }

  public CorpusDownloadFileType getFileType() {
    return fileType;
  }

  public void setFileType(CorpusDownloadFileType fileType) {
    this.fileType = fileType;
  }
}
