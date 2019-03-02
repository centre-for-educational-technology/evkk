package root.preprocessor;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class TextProcessor {

	public static String createNgrams(String text) {
		
		int ngramLen = 3;
		
		String[] wordTypes = getWordTypesFromText(text);
		String ngramsString = "";

		for(int i = 1; i < wordTypes.length - (ngramLen - 2); i++ ) {
			String ngram = "";

			for(int j = -1; j < ngramLen-1; j++) {
				//System.out.println(j);
				ngram += wordTypes[i+j];
			}
			
			ngramsString += ngram + " ";
		}
		
		ngramsString = ngramsString.substring(0, ngramsString.length() - 1); // takes the last space away from ngramsString
		
		return ngramsString;
	}

	public static String[] getWordTypesFromText(String text){

		String[] wordTypes = null;
		String s = null;
		
		// https://alvinalexander.com/java/edu/pj/pj010016
		try {
			Process p = null;
			ProcessBuilder pb = new ProcessBuilder("python","scripts/py/text_to_postag.py","\""+text+"\"");
			pb.directory(new File(System.getProperty("user.dir")));
			p = pb.start();
			
			BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
			
			s = stdInput.readLine();
			if(!s.equals("ErrNo1")) {
				s = s.replaceAll("[\\[\\] ']", "").replaceAll("(\\|)(.)", ""); //sometimes estnltk return something like A|B. this cleans that out and keeps the first one.
				wordTypes = s.split(",");
			}
			
		} catch (IOException e) { System.out.println(e); }

		return wordTypes; //returns list of each words postag

	}	
}