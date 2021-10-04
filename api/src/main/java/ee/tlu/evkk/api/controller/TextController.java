package ee.tlu.evkk.api.controller;
import org.json.*;
import org.springframework.web.bind.annotation.*;

import ee.tlu.evkk.api.controller.dto.TextQueryHelper;
import ee.tlu.evkk.api.dao.TextDao;

import java.util.UUID;

import java.lang.ProcessBuilder;
import java.util.*;
import java.io.*;

@RestController
@RequestMapping("/texts")
public class TextController {
  TextDao textDao;
  public TextController(TextDao uusTDao) {
    textDao = uusTDao;
  }
  @GetMapping("/kysitekst")
  public String kysiTekst(String id) {
      return textDao.findTextById(UUID.fromString(id));
  }
  @GetMapping("/kysikorpusetekstiIDd")
  public List<String> kysikorpusetekstiIDd(String korpusekood) {
      return textDao.findTextIDsByCorpusID(korpusekood);
  }
  @GetMapping("/kysikorpusetekstiIDjapealkiri")
  public List<String> kysikorpusetekstiIDjapealkiri(String korpusekood) {
      return textDao.findTextIDandTitleByCorpusID(korpusekood);
  }
//   @GetMapping("/detailneparing")
//   public List<String> detailneparing(String queryJoin, String queryWhere) {
//       return textDao.textTitleQueryByParameters(queryJoin, queryWhere);
//   }
//   @GetMapping("/detailneparing")
//   public List<String> detailneparing(String queryJoin) {
//       return textDao.textTitleQueryByParameters(queryJoin);
//   }
  @GetMapping("/tervitus")
  public String tervitus(){
      return "Tere";
  }
  @GetMapping("/nimetervitus")
  public String nimetervitus(String eesnimi) {
      return "Tere, " + eesnimi;
  }
  @PostMapping("/lemmad")
  public String lemmad(String tekst) throws Exception {
      ProcessBuilder processBuilder = new ProcessBuilder("/opt/miniconda3/bin/python", "../ui/public/python/lemmad.py");
      processBuilder.redirectErrorStream(true);
      String tulemus = "";
    
      Process process = processBuilder.start();
      OutputStream stdin = process.getOutputStream();
      BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(tekst + "\n");
      writer.close();
      for(int i = 0; i < 14; i++) {
          String line = lugeja.readLine();
      }
      String line = lugeja.readLine();
      while(line != null) {
          //System.out.println(line);
          tulemus += line;
          line = lugeja.readLine();
      }
      return tulemus;
    }
  @PostMapping("/sonad")
  public String sonad(String tekst) throws Exception {
      ProcessBuilder processBuilder = new ProcessBuilder("/opt/miniconda3/bin/python", "../ui/public/python/sonad.py");
      processBuilder.redirectErrorStream(true);
      String tulemus = "";
    
      Process process = processBuilder.start();
      OutputStream stdin = process.getOutputStream();
      BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(tekst + "\n");
      writer.close();
      for(int i = 0; i < 12; i++) {
          String line = lugeja.readLine();
          System.out.println(line);
      }
      String line = lugeja.readLine();
      while(line != null) {
          tulemus += line;
          line = lugeja.readLine();
      }
      System.out.println(tulemus);
      return tulemus;
    }
    @PostMapping("/laused")
  public String laused(String tekst) throws Exception {
      ProcessBuilder processBuilder = new ProcessBuilder("/opt/miniconda3/bin/python", "../ui/public/python/laused.py");
      processBuilder.redirectErrorStream(true);
      String tulemus = "";
    
      Process process = processBuilder.start();
      OutputStream stdin = process.getOutputStream();
      BufferedReader lugeja = new BufferedReader(new InputStreamReader(process.getInputStream()));
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(tekst + "\n");
      writer.close();
      for(int i = 0; i < 10; i++) {
          String line = lugeja.readLine();
      }
      String line = lugeja.readLine();
      while(line != null) {
          tulemus += line;
          line = lugeja.readLine();
      }
      return tulemus;
    }
    @GetMapping("/asukoht")
    public String asukoht(){
       return new java.io.File(".").getAbsolutePath().toString();
    }

 @CrossOrigin("*")
    // @PostMapping("/detailneparing")
    // public List<String> detailneparing(String queryJoin, String queryWhere) {
    //     return textDao.textTitleQueryByParameters(queryJoin, queryWhere);
    // }

    @PostMapping("/detailneparing2")
    public List<String> detailneparing2(String vaartused) {
        ArrayList<String> stringArray = new ArrayList<String>();
        JSONArray jsonArray = new JSONArray(vaartused);
        for (int i = 0; i < jsonArray.length(); i++) {
            stringArray.add(jsonArray.getString(i));
        }
        //System.out.println(stringArray);

        String[] parameetrid = {"korpus", "tekstityyp", "keeletase", "emakeel", "kodukeel", "sugu", "vanus", "elukoht"}; //characters
        int vaartusteArv = 0;
        for(int i = 0; i < stringArray.size(); i++) {
            if(!(stringArray.get(i).equals("NO"))) {
                vaartusteArv++;
            }
        }

        TextQueryHelper[] helperid = new TextQueryHelper[vaartusteArv];
        vaartusteArv = 0;

        for(int i = 0; i < stringArray.size(); i++) {
            if(!(stringArray.get(i).equals("NO"))) {
                TextQueryHelper h = new TextQueryHelper();
                h.setTabel("p" + (vaartusteArv + 3));
                h.setParameeter(parameetrid[i]);
                //h.setVaartused(new String[] {stringArray.get(i)});
                h.setVaartused(stringArray.get(i).split(","));
                helperid[vaartusteArv] = h;
                vaartusteArv++;
            }
        }
        List<String> vastus = textDao.textTitleQueryByParameters2(helperid);

        return vastus;
    }

    @GetMapping("/getValues")
    public String getValues(String cId) {
        return textDao.findValueByPropertyName(cId);
    }

    @GetMapping("/getMiniStats")
    public String getMiniStats(String corpus) {
        String[] corpusArray = corpus.split(",");
        return textDao.findMiniStats(corpusArray);
    }

    @GetMapping("/getDetailedValues")
    public String getValues(@RequestParam("corpus") String corpus, String pValue, String pName) {
        String[] corpusArray = corpus.split(",");
        String[] pValueArray = pValue.split(",");
        return textDao.findDetailedValueByPropertyName(pValueArray, pName, corpusArray);
    }

    @GetMapping("/detailedSearch")
    public String getDetailedSearch(@RequestParam("data") String data) {
        System.out.println(data);
        try {
        JSONObject json = new JSONObject(data);

        String pName = json.getString("pName"); // pName - main filter (property_name)
        
        ArrayList<String> pValue = new ArrayList<String>(); // pValue - array of selected filters (property_value)
        JSONArray arr = json.getJSONArray("pValue");
        if (arr != null) { 
           for (int i=0; i < arr.length(); i++){ 
            pValue.add(arr.getString(i));
           } 
        } 

        ArrayList<String> corpus = new ArrayList<String>(); // corpus - array of selected corpuses
        arr = json.getJSONArray("corpus");
        if (arr != null) { 
            for (int i=0; i < arr.length(); i++){ 
                corpus.add(arr.getString(i));
            } 
        }

        ArrayList<String> selectedFilters = new ArrayList<String>(); // selectedFilters - array of selected filters
        // [tekstikeel, vanus] - selectedFilters
        ArrayList<ArrayList<String>> filterValues = new ArrayList<ArrayList<String>>(); // filterValues - array of selected filters
        // [[eesti, vene, inglise],[kuni18,kuni26,41plus]] - filterValues

        arr = json.getJSONArray("selectedFilters");
        if (arr != null) { 
            for (int i=0; i < arr.length(); i++){ 
                selectedFilters.add(arr.getJSONObject(i).getString("filter"));
                ArrayList<String> arrValues = new ArrayList<String>();
                // filterValues.add(arr.getJSONObject(i).getJSONArray("data"));
                for (int y = 0; y < arr.getJSONObject(i).getJSONArray("data").length(); y++) {
                    String str = arr.getJSONObject(i).getJSONArray("data").getString(y);
                    if (str == "tundmatu" || str.equals("tundmatu")) {
                        arrValues.add("''");
                    } else {
                        arrValues.add("'"+ str + "'");
                    }

                }
                filterValues.add(arrValues);
            } 
        }

        // converting arrayList to String[] array
        String[] pValueArray = new String[pValue.size()];
        pValueArray = pValue.toArray(pValueArray);

        String[] corpusArray = new String[corpus.size()];
        corpusArray = corpus.toArray(corpusArray);

        // constructing SQL queries
        String join = "";
        String condition = "";
        for (int i = 0; i < selectedFilters.size(); i++) {
            join+= "JOIN core.text_property as tp" + (i + 6) + " on tp" + (i + 5) + ".text_id=tp" + (i + 6) + ".text_id\n";
            String values = String.join(",", filterValues.get(i));
            condition+= "AND tp" + (i + 6) + ".property_name = '" + selectedFilters.get(i) +"' AND tp" + (i + 6) + ".property_value IN ("+ values +")\n";
        }


        return textDao.detailedSearch(pValueArray, pName, corpusArray, join, condition);
        // return pValueArray;


        } catch (JSONException err){
            System.out.println("Error" + err.toString());
            JSONObject json = new JSONObject(data);
            System.out.println("TEST: " + json.getJSONArray("pValue"));
            // String[] er = {"oops","ei toota"};
            // return er;
            return "oops, ei tööta";

       }

    //    System.out.println(JsonObject.getJSONObject("selectedFilters"));
        // return textDao.detailedSearch(pValueArray, pName, corpusArray, filterNamesArray, filterValuesArray);
    }

    @GetMapping("/getAvailableValues")
    public String getAvailableValues(String pName) {
        return textDao.findAvailableValues(pName);
    }



    @GetMapping("/kysikorpusetekstid")
    public List<String> kysiKorpuseTekstid(String id){
        return textDao.findTextsByCorpusId(id);
    }

}