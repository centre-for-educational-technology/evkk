package ee.tlu.evkk.core.service;

import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextAndMetadata;
import ee.tlu.evkk.dal.dto.TextMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

import static javax.xml.transform.OutputKeys.INDENT;

@Service
@RequiredArgsConstructor
public class TeiService {

  private final TextDao textDao;

  private String keelEn(String keel) {
    keel = keel.toLowerCase();

    if (keel.equals("eesti")) return "Estonian";
    if (keel.equals("vene")) return "Russian";
    if (keel.equals("soome")) return "Finnish";
    if (keel.equals("inglise")) return "English";
    if (keel.equals("saksa")) return "German";
    if (keel.equals("prantsuse")) return "French";
    if (keel.equals("heebrea")) return "Hebrew";
    if (keel.equals("hollandi")) return "Dutch";
    if (keel.equals("itaalia")) return "Italian";
    if (keel.equals("jaapani")) return "Japanese";
    if (keel.equals("jidiš")) return "Yiddish";
    if (keel.equals("katalaani")) return "Catalan";
    if (keel.equals("leedu")) return "Lithuanian";
    if (keel.equals("läti")) return "Latvian";
    if (keel.equals("poola")) return "Polish";
    if (keel.equals("rootsi")) return "Swedish";
    if (keel.equals("sloveenia")) return "Slovenian";
    if (keel.equals("tšehhi")) return "Czech";
    if (keel.equals("ukraina")) return "Ukrainian";
    if (keel.equals("ungari")) return "Hungarian";
    if (keel.equals("valgevene")) return "Belarusian";
    if (keel.equals("määramata")) return "unspecified";
    if (keel.isEmpty()) return "";

    return keel;
  }

  private String keelEnKood(String keel) {
    if (keel.equals("eesti")) return "et";
    if (keel.equals("vene")) return "ru";
    if (keel.equals("soome")) return "fi";
    if (keel.equals("inglise")) return "en";
    if (keel.equals("saksa")) return "de";
    if (keel.equals("prantsuse")) return "fr";
    if (keel.equals("heebrea")) return "he";
    if (keel.equals("hollandi")) return "nl";
    if (keel.equals("itaalia")) return "it";
    if (keel.equals("jaapani")) return "ja";
    if (keel.equals("jidiš")) return "ji";
    if (keel.equals("katalaani")) return "ca";
    if (keel.equals("leedu")) return "lt";
    if (keel.equals("läti")) return "lv";
    if (keel.equals("poola")) return "pl";
    if (keel.equals("rootsi")) return "sv";
    if (keel.equals("sloveenia")) return "sl";
    if (keel.equals("tšehhi")) return "cs";
    if (keel.equals("ukraina")) return "ua";
    if (keel.equals("ungari")) return "hu";
    if (keel.equals("valgevene")) return "be";

    return keel;
  }

  private String korpusEn(String kood) {
    if (kood.equals("cFqPphvYi")) return "Estonian L2 olympiade";
    if (kood.equals("clWmOIrLa")) return "Estonian L2 proficiency examinations";
    if (kood.equals("cFOoRQekA")) return "L2 Estonian";
    if (kood.equals("cYDRkpymb")) return "L1 Estonian";
    if (kood.equals("cgSRJPKTr")) return "L1 Russian";
    if (kood.equals("cZjHWUPtD")) return "L3 Russian";
    if (kood.equals("cwUSEqQLt")) return "Academic Estonian";

    return kood;
  }

  private String riikEn(String riik) {
    if (riik.equals("Eesti")) return "Estonia";
    if (riik.equals("Leedu")) return "Lithuania";
    if (riik.equals("Läti")) return "Latvia";
    if (riik.equals("Rootsi")) return "Sweden";
    if (riik.equals("Saksamaa")) return "Germany";
    if (riik.equals("Soome")) return "Finland";
    if (riik.equals("Suurbritannia")) return "United Kingdom";
    if (riik.equals("Venemaa")) return "Russia";

    return riik;
  }

  private String haridusEn(String haridus) {
    if (haridus.equals("alusharidus")) return "elementary education";
    if (haridus.equals("põhiharidus")) return "basic education";
    if (haridus.equals("keskharidus")) return "secondary education";
    if (haridus.equals("keskeriharidus/kutseharidus")) return "(secondary) vocational education";
    if (haridus.equals("kõrgharidus")) return "higher education";

    return haridus;
  }

  private String akadOppematerjalEn(String akadOppematerjal) {
    String[] m = akadOppematerjal.split(",");
    String[] m2 = new String[m.length];
    for (int i = 0; i < m.length; i++) {
      String v = m[i];
      if (v.equals("tõlkesõnastik/masintõlge")) {v = "translation dictionary/ machine translation";}
      if (v.equals("ükskeelne sõnastik (k.a veebisõnastikud)")) {
        v = "monolingual dictionary (incl. online dictionaries)";
      }
      if (v.equals("erialane terminisõnastik või -baas")) {v = "term glossary or base";}
      if (v.equals("erialane käsiraamat või teatmik")) {v = "professional handbook or manual";}
      if (v.equals("automaatkontroll")) {v = "automated correction";}
      if (v.equals("muu")) {v = "other";}
      m2[i] = v;
    }
    return String.join(",", m2);
  }

  public String getTei(String id) {
    TextAndMetadata tm = textDao.findTextAndMetadataById(UUID.fromString(id));

    HashMap<String, String> omadused = new HashMap<>();
    for (TextMetadata t : tm.getProperties()) {
      omadused.put(t.getPropertyName(), t.getPropertyValue());
    }
    try {
      DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();

      DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();

      Document document = documentBuilder.newDocument();

      Element root = document.createElement("teiCorpus");
      document.appendChild(root);
      Attr attr = document.createAttribute("xmlns");
      attr.setValue("http://www.tei-c.org/ns/1.0");
      root.setAttributeNode(attr);

      Element e = document.createElement("teiHeader");
      root.appendChild(e);
      Element eTei = document.createElement("TEI");
      root.appendChild(eTei);
      Element teiHeader = document.createElement("teiHeader");
      attr = document.createAttribute("xml:lang");
      attr.setValue("en");
      teiHeader.setAttributeNode(attr);
      eTei.appendChild(teiHeader);
      Element fileDesc = document.createElement("fileDesc");
      teiHeader.appendChild(fileDesc);
      Element titleStmt = document.createElement("titleStmt");
      fileDesc.appendChild(titleStmt);
      Element title = document.createElement("title");
      titleStmt.appendChild(title);
      String s = "";
      boolean arvamuslugu = false;
      String autor = "";
      String valjaandja = "";
      if (omadused.containsKey("tekstityyp")) {
        if (omadused.get("tekstityyp").equals("k1eesti_arvamuslugu")) {
          arvamuslugu = true;
        }
      }
      if (omadused.containsKey("title")) {
        if (arvamuslugu) {
          String t1 = omadused.get("title");
          if (t1.indexOf(":") > 0) {
            autor = t1.substring(0, t1.indexOf(":"));
            t1 = t1.substring(t1.indexOf(":") + 1);
          }
          if (t1.indexOf("(") > 0) {
            valjaandja = t1.substring(t1.indexOf("(") + 1);
            t1 = t1.substring(0, t1.indexOf("("));
            valjaandja = valjaandja.trim();
            if (valjaandja.endsWith(")")) {
              valjaandja = valjaandja.substring(0, valjaandja.length() - 1);
            }
          }
          t1 = t1.trim();
          t1 = t1.substring(0, 1).toUpperCase() + t1.substring(1);
          s += t1;
        } else {
          s += omadused.get("title");
        }

      }
      s += " (" + id + ")";
      title.appendChild(document.createTextNode(s));
      Element publicationStmt = document.createElement("publicationStmt");
      fileDesc.appendChild(publicationStmt);
      if (omadused.containsKey("ajavahemik")) {
        Element date = document.createElement("date");
        publicationStmt.appendChild(date);
        attr = document.createAttribute("when");
        attr.setValue(omadused.get("ajavahemik"));
        date.setAttributeNode(attr);
        date.appendChild(document.createTextNode(omadused.get("ajavahemik")));
      }
      Element publisher = document.createElement("publisher");
      publicationStmt.appendChild(publisher);
      publisher.appendChild(document.createTextNode("Tallinn University School of Digital Technologies"));
      Element availability = document.createElement("availability");
      publicationStmt.appendChild(availability);
      Element licence = document.createElement("licence");
      availability.appendChild(licence);
      licence.appendChild(document.createTextNode("Distributed under CC BY 4.0 licence"));
      attr = document.createAttribute("target");
      attr.setValue("https://creativecommons.org/licenses/by/4.0/");
      licence.setAttributeNode(attr);
      Element sourceDesc = document.createElement("sourceDesc");
      fileDesc.appendChild(sourceDesc);
      Element p = document.createElement("p");
      sourceDesc.appendChild(p);
      p.appendChild(document.createTextNode("Database of Estonian Interlanguage Corpus, text ID " + id));
      if (arvamuslugu) {
        if (autor.length() > 0) {
          Element author = document.createElement("author");
          sourceDesc.appendChild(author);
          author.appendChild(document.createTextNode(autor));
        }
        if (valjaandja.length() > 0) {
          Element p2 = document.createElement("publisher");
          sourceDesc.appendChild(p2);
          p2.appendChild(document.createTextNode(valjaandja));
        }
      }
      Element profileDesc = document.createElement("profileDesc");
      teiHeader.appendChild(profileDesc);
      Element langUsage = document.createElement("langUsage");
      profileDesc.appendChild(langUsage);
      Element language = document.createElement("language");
      langUsage.appendChild(language);
      attr = document.createAttribute("ident");
      if (omadused.containsKey("tekstikeel") && omadused.get("tekstikeel").equals("vene")) {
        attr.setValue("ru");
        language.appendChild(document.createTextNode("Russian"));
      } else {
        attr.setValue("et");
        language.appendChild(document.createTextNode("Estonian"));
      }
      language.setAttributeNode(attr);
      if (omadused.containsKey("keeletase")) {
        attr = document.createAttribute("level");
        attr.setValue(omadused.get("keeletase"));
        language.setAttributeNode(attr);
      }
      Element textDesc = document.createElement("textDesc");
      profileDesc.appendChild(textDesc);
      if (omadused.containsKey("korpus")) {
        Element domain = document.createElement("domain");
        textDesc.appendChild(domain);
        attr = document.createAttribute("type");
        attr.setValue(omadused.get("korpus").equals("cwUSEqQLt") ? "academic" : "non-academic");
        domain.setAttributeNode(attr);
        domain = document.createElement("domain");
        textDesc.appendChild(domain);
        attr = document.createAttribute("type");
        attr.setValue(korpusEn(omadused.get("korpus")));
        domain.setAttributeNode(attr);
      }
      if (omadused.containsKey("abivahendid") && omadused.get("abivahendid").equals("ei")) {
        Element preparedness = document.createElement("preparedness");
        attr = document.createAttribute("type");
        attr.setValue("spontaneous");
        preparedness.setAttributeNode(attr);
        textDesc.appendChild(preparedness);
      }
      if (omadused.containsKey("akad_oppematerjal")) {
        Element preparedness = document.createElement("preparedness");
        attr = document.createAttribute("type");
        attr.setValue("prepared");
        preparedness.setAttributeNode(attr);
        textDesc.appendChild(preparedness);
        preparedness.appendChild(document.createTextNode(akadOppematerjalEn(omadused.get("akad_oppematerjal"))));
      }


      Element particDesc = document.createElement("particDesc");
      profileDesc.appendChild(particDesc);
      Element person = document.createElement("person");
      particDesc.appendChild(person);
      if (omadused.containsKey("sugu")) {
        attr = document.createAttribute("sex");
        attr.setValue(omadused.get("sugu").equals("naine") ? "female" : "male");
        person.setAttributeNode(attr);
      }
      if (omadused.containsKey("vanus")) {
        attr = document.createAttribute("age");
        attr.setValue(omadused.get("vanus"));
        person.setAttributeNode(attr);
      }
      if (omadused.containsKey("emakeel")) {
        Element langKnowledge = document.createElement("langKnowledge");
        person.appendChild(langKnowledge);
        Element langKnown = document.createElement("langKnown");
        langKnowledge.appendChild(langKnown);
        attr = document.createAttribute("level");
        attr.setValue("first");
        langKnown.setAttributeNode(attr);
        attr = document.createAttribute("tag");
        attr.setValue(keelEnKood(omadused.get("emakeel")));
        langKnown.setAttributeNode(attr);
        langKnown.appendChild(document.createTextNode(keelEn(omadused.get("emakeel"))));
      }
      if (omadused.containsKey("muudkeeled")) {
        Element langKnowledge = document.createElement("langKnowledge");
        person.appendChild(langKnowledge);
        Element langKnown = document.createElement("langKnown");
        langKnowledge.appendChild(langKnown);
        attr = document.createAttribute("tag");
        attr.setValue(keelEnKood(omadused.get("muudkeeled")));
        langKnown.setAttributeNode(attr);
        langKnown.appendChild(document.createTextNode(keelEn(omadused.get("muudkeeled"))));
      }
      if (omadused.containsKey("kodakondsus")) {
        Element residence = document.createElement("nationality");
        person.appendChild(residence);
        residence.appendChild(document.createTextNode(keelEn(omadused.get("kodakondsus"))));
      }
      if (omadused.containsKey("riik")) {
        Element residence = document.createElement("residence");
        person.appendChild(residence);
        residence.appendChild(document.createTextNode(riikEn(omadused.get("riik"))));
      }
      if (omadused.containsKey("haridus")) {
        Element education = document.createElement("education");
        person.appendChild(education);
        education.appendChild(document.createTextNode(haridusEn(omadused.get("haridus").toLowerCase())));
      }
      if (omadused.containsKey("oppeaste")) {
        Element education = document.createElement("education");
        person.appendChild(education);
        education.appendChild(document.createTextNode(haridusEn(omadused.get("oppeaste"))));
      }
      if (omadused.containsKey("teaduskraad")) {
        Element education = document.createElement("education");
        person.appendChild(education);
        education.appendChild(document.createTextNode(haridusEn(omadused.get("teaduskraad"))));
      }

      Element text = document.createElement("text");
      eTei.appendChild(text);
      Element body = document.createElement("body");
      text.appendChild(body);
      Element head = document.createElement("head");
      body.appendChild(head);
      if (omadused.containsKey("pealkiri")) {
        head.appendChild(document.createTextNode(omadused.get("pealkiri")));
      }
      Optional<Text> tsisu = textDao.findById(UUID.fromString(id));
      if (tsisu.isPresent()) {
        String s1 = tsisu.get().getContent();
        s1 = s1.replace("\\", "#");
        String[] read = s1.split("#n#n");
        if (read.length == 1) {
          for (String rida : read[0].split("#n")) {
            Element elP = document.createElement("p");
            body.appendChild(elP);
            Element elS = document.createElement("s");
            elP.appendChild(elS);
            elS.appendChild(document.createTextNode(rida));
          }
        } else {
          for (String loik : read) {
            Element elP = document.createElement("p");
            body.appendChild(elP);
            for (String rida : loik.split("#n")) {
              Element elS = document.createElement("s");
              elP.appendChild(elS);
              elS.appendChild(document.createTextNode(rida));
            }
          }
        }
      }


      DOMSource domSource = new DOMSource(document);
      StringWriter writer = new StringWriter();
      StreamResult result = new StreamResult(writer);
      TransformerFactory tf = TransformerFactory.newInstance();
      tf.setAttribute("indent-number", 2);
      Transformer transformer = tf.newTransformer();
      transformer.setParameter(INDENT, "yes");
      transformer.transform(domSource, result);
      return writer.toString();
    } catch (Exception ex) {
      return ex.toString();
    }

  }

}
