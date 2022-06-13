package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TextQueryAmongParamHelper {

    private String tabel;
    private String parameeter;
    private int algVaartus;
    private int loppVaartus;
    private boolean castable;
}