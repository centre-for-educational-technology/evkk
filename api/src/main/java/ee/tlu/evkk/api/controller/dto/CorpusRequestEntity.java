package ee.tlu.evkk.api.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CorpusRequestEntity {

    private String[] corpuses;
    private String type;
    private String language;
    private String level;
    private String usedMaterials;
    private String age;
    private String gender;
    private String education;
    private String nativeLang;
    private String country;
    private Integer[][] addedYear;
    private Integer[][] characters;
    private Integer[][] words;
    private Integer[][] sentences;
}