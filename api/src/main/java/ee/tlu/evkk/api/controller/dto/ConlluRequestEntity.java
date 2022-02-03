package ee.tlu.evkk.api.controller.dto;

public class ConlluRequestEntity {
    private String tekst;
    private String failinimi;
    public String getTekst() {
        return tekst;
      }
    
      public void setTekst(String tekst) {
        this.tekst = tekst;
      }
    
      public String getFailinimi(){
          return failinimi;
      }
      public void setFailinimi(String failinimi){
          this.failinimi=failinimi;
      }
}
