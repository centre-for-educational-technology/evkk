package ee.words;


public class WordTag {
  boolean firstTag = false;
  String input = null;
  Util.TagType type;
  WordType wordType = null;
  String morphologicalTag = null;
  String syntacticTag = null;
  boolean isSelected = false;
  WordTags parent;

  public String toString(){
    return input+" "+type+" "+wordType;
  }

  public WordTag(String input, boolean firstTag, WordTags parent) {
    this.firstTag = firstTag;
    this.input = input.replaceAll("\\n|\\r", "").split("##")[0];
    extractMainTags();
    extractWordTagType();
    this.parent = parent;
  }

  public WordTag(String word, WordTags parent) {
    this.firstTag = true;
    this.input = word;
    extractWordTagType();
    this.parent = parent;
  }

  public WordTag(String morphologicalTag, String syntacticTag, WordTags parent) {
    this.input = morphologicalTag;
    this.morphologicalTag = morphologicalTag;
    this.syntacticTag = syntacticTag;
    extractWordTagType();
    this.parent = parent;
  }

  public void setNewTags(String input) {
    this.input = input.replaceAll("\\n|\\r", "").split("##")[0];
    extractMainTags();
    //extractWordTagType();
  }

  public void setType(Util.TagType input) {
    type = input;
  }

  public void setSelected() {
    isSelected = true;
  }

  public void setDeselected() {
    isSelected = false;
  }

  public Util.TagType getTagType() {
    return type;
  }

  public void printWordTags() {
    System.out.println(wordType);
  }

  public String getWordTagToSave() {
    if (firstTag)
      return this.input;
    if (isSelected)
      return input + " ## " + 1;
    return input + " ## " + 0;
  }

  public String getName() {
    return parent.getName();
  }

  public String getNameAsString() {
    if (input != null)
      return input;
    return null;
  }

  public int getTagColor() {
    if (type == Util.TagType.word) {
      return 0;
    }
    if (!isSelected) {
      return 2;
    }
    return 3;
  }

  public Object[] getWordTags() {
    Object[] toReturn = new Object[10];
    toReturn[0] = input;
    if (!firstTag)
      toReturn[1] = new Boolean(isSelected);
    return toReturn;
  }

  public WordType getWordType() {
    return wordType;
  }

  public String getMorphologicalTag() {
    if (morphologicalTag != null)
      return morphologicalTag;
    return "";
  }

  public String getSyntacticTag() {
    if (syntacticTag != null)
      return syntacticTag;
    return "";
  }

  public WordType getWordTypeTag() {
    if (wordType != null)
      return wordType;
    return null;
  }

  public String getWordTypeAsString() {
    if (wordType != null) {
      return this.wordType.toString();
    }
    return "";
  }

  public void extractMainTags() {
    String[] temp = new String[4];
    temp[2] = null;
    if (input.contains("//")) {
      temp = input.split("//");
      morphologicalTag = temp[1];
      try {
        if (temp.length > 2)
          syntacticTag = temp[2];
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  public void extractWordTagType() {
    //System.out.println(this.input+"x");
    String abi=" "+this.input+" ";
    for (WordType wordType : WordType.values()) {
      //System.out.println(wordType);
      if (this.input.contains(wordType.toString())) {
        this.wordType = wordType;
        //System.out.println("leiti "+wordType);
        //extractWordTypeTags();
      }
//            if(this.input.contains(wordType.toString().replaceAll("_"," "))){
      if(abi.contains(wordType.toString().replaceAll("_"," "))){
        this.wordType = wordType;
        // System.out.println("leiti "+wordType);
      }
    }
  }

}
