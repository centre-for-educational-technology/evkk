package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TextQueryCorpusHelper {

    private String tabel;
    private String parameeter;
    private List<String> vaartused;
}