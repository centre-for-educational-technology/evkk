package ee.tlu.evkk.core.service.dto;

import java.util.List;

public class TextResponseDto {

  private List<String> sonad;
  private List<String> lemmad;
  private List<String> silbid;
  private List<String> laused;
  private List<String> sonaliigid;
  private List<String> vormimargendid;

  public TextResponseDto(List<String> sonad, List<String> lemmad, List<String> silbid, List<String> laused, List<String> sonaliigid, List<String> vormimargendid) {
    this.sonad = sonad;
    this.lemmad = lemmad;
    this.silbid = silbid;
    this.laused = laused;
    this.sonaliigid = sonaliigid;
    this.vormimargendid = vormimargendid;
  }

  public List<String> getSonad() {
    return sonad;
  }

  public void setSonad(List<String> sonad) {
    this.sonad = sonad;
  }

  public List<String> getLemmad() {
    return lemmad;
  }

  public void setLemmad(List<String> lemmad) {
    this.lemmad = lemmad;
  }

  public List<String> getSilbid() {
    return silbid;
  }

  public void setSilbid(List<String> silbid) {
    this.silbid = silbid;
  }

  public List<String> getLaused() {
    return laused;
  }

  public void setLaused(List<String> laused) {
    this.laused = laused;
  }

  public List<String> getSonaliigid() {
    return sonaliigid;
  }

  public void setSonaliigid(List<String> sonaliigid) {
    this.sonaliigid = sonaliigid;
  }

  public List<String> getVormimargendid() {
    return vormimargendid;
  }

  public void setVormimargendid(List<String> vormimargendid) {
    this.vormimargendid = vormimargendid;
  }
}
