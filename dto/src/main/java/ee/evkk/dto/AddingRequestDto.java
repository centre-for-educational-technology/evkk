package ee.evkk.dto;

import javax.validation.constraints.NotBlank;

public class AddingRequestDto {

  @NotBlank
  private String pealkiri;
  private String kirjeldus;
  @NotBlank
  private String sisu;
  private String liik;
  private Boolean oppematerjal;
  private String[] akadOppematerjal;
  private String akadOppematerjalMuu;
  private String mitteakadAlamliik;
  private String akadAlamliik;
  private String artikkelValjaanne;
  private String artikkelAasta;
  private String artikkelNumber;
  private String artikkelLehekyljed;
  private String tekstiAutor;
  private String autoriVanus;
  private String autoriSugu;
  private String autoriOppeaste;
  private String autoriTeaduskraad;
  private String autoriHaridus;
  private String autoriEriala;
  private String autoriEmakeel;
  private String autoriMuudKeeled;

  private String muukeel;
  private String autoriElukohariik;
  private String elukohariikMuu;

  public String getPealkiri() {
    return pealkiri;
  }

  public void setPealkiri(String pealkiri) {
    this.pealkiri = pealkiri;
  }

  public String getKirjeldus() {
    return kirjeldus;
  }

  public void setKirjeldus(String kirjeldus) {
    this.kirjeldus = kirjeldus;
  }

  public String getSisu() {
    return sisu;
  }

  public void setSisu(String sisu) {
    this.sisu = sisu;
  }

  public String getLiik() {
    return liik;
  }

  public void setLiik(String liik) {
    this.liik = liik;
  }

  public Boolean getOppematerjal() {
    return oppematerjal;
  }

  public void setOppematerjal(Boolean oppematerjal) {
    this.oppematerjal = oppematerjal;
  }

  public String[] getAkadOppematerjal() {
    return akadOppematerjal;
  }

  public void setAkadOppematerjal(String[] akadOppematerjal) {
    this.akadOppematerjal = akadOppematerjal;
  }

  public String getAkadOppematerjalMuu(){return akadOppematerjalMuu;}
  public void setAkadOppematerjalMuu(String akadOppematerjalMuu){
    this.akadOppematerjalMuu=akadOppematerjalMuu;
  }

  public String getMitteakadAlamliik() {
    return mitteakadAlamliik;
  }

  public void setMitteakadAlamliik(String mitteakadAlamliik) {
    this.mitteakadAlamliik = mitteakadAlamliik;
  }

  public String getAkadAlamliik() {
    return akadAlamliik;
  }

  public void setAkadAlamliik(String akadAlamliik) {
    this.akadAlamliik = akadAlamliik;
  }

  public String getArtikkelValjaanne(){
    return artikkelValjaanne;
  }

  public void setArtikkelValjaanne(String artikkelValjaanne){
    this.artikkelValjaanne=artikkelValjaanne;
  }

  public String getArtikkelAasta(){
    return artikkelAasta;
  }

  public void setArtikkelAasta(String artikkelAasta){
    this.artikkelAasta=artikkelAasta;
  }

  public String getArtikkelNumber(){
    return artikkelNumber;
  }

  public void setArtikkelNumber(String artikkelNumber){
    this.artikkelNumber=artikkelNumber;
  }

  public String getArtikkelLehekyljed(){
    return artikkelLehekyljed;
  }

  public void setArtikkelLehekyljed(String artikkelLehekyljed){
    this.artikkelLehekyljed=artikkelLehekyljed;
  }


  public String getTekstiAutor() {
    return tekstiAutor;
  }

  public void setTekstiAutor(String tekstiAutor) {
    this.tekstiAutor = tekstiAutor;
  }

  public String getAutoriVanus() {
    return autoriVanus;
  }

  public void setAutoriVanus(String autoriVanus) {
    this.autoriVanus = autoriVanus;
  }

  public String getAutoriSugu() {
    return autoriSugu;
  }

  public void setAutoriSugu(String autoriSugu) {
    this.autoriSugu = autoriSugu;
  }

  public String getAutoriOppeaste() {
    return autoriOppeaste;
  }

  public void setAutoriOppeaste(String autoriOppeaste) {
    this.autoriOppeaste = autoriOppeaste;
  }

  public String getAutoriHaridus() {
    return autoriHaridus;
  }

  public void setAutoriHaridus(String autoriHaridus) {
    this.autoriHaridus = autoriHaridus;
  }

  public String getAutoriEriala() {
    return autoriEriala;
  }

  public void setAutoriEriala(String autoriEriala) {
    this.autoriEriala = autoriEriala;
  }

  public String getAutoriEmakeel() {
    return autoriEmakeel;
  }

  public void setAutoriEmakeel(String autoriEmakeel) {
    this.autoriEmakeel = autoriEmakeel;
  }

  public String getAutoriMuudKeeled() {
    return autoriMuudKeeled;
  }

  public void setAutoriMuudKeeled(String autoriMuudKeeled) {
    this.autoriMuudKeeled = autoriMuudKeeled;
  }

  public String getMuukeel(){return muukeel;}
  public void setMuukeel(String muukeel){
    this.muukeel=muukeel;
  }

  public String getAutoriElukohariik() {
    if(autoriElukohariik==null){return "";}
    if(autoriElukohariik.equals("muu")){return this.elukohariikMuu;}
    return autoriElukohariik;
  }

  public void setAutoriElukohariik(String autoriElukohariik) {
    this.autoriElukohariik = autoriElukohariik;
  }
  public void setElukohariikMuu(String elukohariikMuu){
    this.elukohariikMuu=elukohariikMuu;
  }

  public String getAutoriTeaduskraad() {
    return autoriTeaduskraad;
  }

  public void setAutoriTeaduskraad(String autoriTeaduskraad) {
    this.autoriTeaduskraad = autoriTeaduskraad;
  }
}
