package ee.evkk.dto;

import ee.evkk.dto.enums.CorpusDownloadFileType;
import ee.evkk.dto.enums.CorpusDownloadForm;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class CorpusDownloadDto {

  private List<UUID> fileList;
  private CorpusDownloadForm form;
  private CorpusDownloadFileType fileType;
}
