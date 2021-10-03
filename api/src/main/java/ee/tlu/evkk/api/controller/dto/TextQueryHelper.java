package ee.tlu.evkk.api.controller.dto;

public class TextQueryHelper {
    private String tabel;
    private String parameeter;
    private String[] vaartused;

    public String getTabel() {
        return tabel;
    }
    public String getParameeter() {
        return parameeter;
    }
    public String[] getVaartus() {
        return vaartused;
    }

    public void setTabel(String tabel) {
        this.tabel = tabel;
    }
    public void setParameeter(String parameeter) {
        this.parameeter = parameeter;
    }
    public void setVaartused(String[] vaartused) {
        this.vaartused = vaartused;
    }
}
