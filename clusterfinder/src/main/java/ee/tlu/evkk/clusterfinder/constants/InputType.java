package ee.tlu.evkk.clusterfinder.constants;

public enum InputType
{
  FREE_TEXT( "Vabatekst" ),
  FILE_BASED_TEXT( "Failipõhine tekst" );

  private final String labelEst;

  InputType(String labelEst) {
    this.labelEst = labelEst;
  }

  public String getLabelEst() {
    return labelEst;
  }
}
