package root;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ConfigIO {
	
	private static HashMap<String, String> allData = new HashMap<String, String>();
	
	public static void updateMap() {
		
		allData.put("tf", Boolean.toString(Config.isTf()));
		allData.put("activeModel", Config.getActiveModel());
		allData.put("idf", Boolean.toString(Config.isIdf()));
		allData.put("hiddenLayers", Config.getHiddenLayers());
		allData.put("trainingData", Config.getTrainingData());
		allData.put("attributeIndices", Config.getAttributeIndices());
		allData.put("momentum", Double.toString(Config.getMomentum()));
		allData.put("wordsToKeep", Integer.toString(Config.getWordsToKeep()));
		allData.put("learningRate", Double.toString(Config.getLearningRate()));
		allData.put("trainingTime", Integer.toString(Config.getTrainingTime()));
		allData.put("lowerCaseTokens", Boolean.toString(Config.isLowerCaseTokens()));
		allData.put("outputWordCounts", Boolean.toString(Config.isOutputWordCounts()));
		allData.put("normalizeAttributes", Boolean.toString(Config.isNormalizeAttributes()));
		
	}
	
	public static void writeConfig(boolean call) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter("config.txt"));
			
			if(call) {updateMap();}
			
			for(String key : allData.keySet()) {
				writer.write(key + " = " + allData.get(key) + "\n");
			}

			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void readConfig() {
		
		BufferedReader reader = null;
		
		try {
			reader = new BufferedReader(new FileReader("config.txt"));
			String line;

			while ((line = reader.readLine()) != null) {
				String[] ss = line.split(" ");
				switch(ss[0]) {
					case "tf":                  allData.put("tf", ss[2]);                  Config.setTf(ss[2]);                  break;
					case "idf":                 allData.put("idf", ss[2]);                 Config.setIdf(ss[2]);                 break;
					case "momentum":            allData.put("momentum", ss[2]);            Config.setMomentum(ss[2]);            break;
					case "wordsToKeep":         allData.put("wordsToKeep", ss[2]);         Config.setWordsToKeep(ss[2]);         break;
					case "activeModel":         allData.put("activeModel", ss[2]);         Config.setActiveModel(ss[2]);         break;
					case "trainingTime":        allData.put("trainingTime", ss[2]);        Config.setTrainingTime(ss[2]);        break;
					case "hiddenLayers":        allData.put("hiddenLayers", ss[2]);        Config.setHiddenLayers(ss[2]);        break;
					case "learningRate":        allData.put("learningRate", ss[2]);        Config.setLearningRate(ss[2]);        break;
					case "trainingData":        allData.put("trainingData", ss[2]);        Config.setTrainingData(ss[2]);        break;
					case "lowerCaseTokens":     allData.put("lowerCaseTokens", ss[2]);     Config.setLowerCaseTokens(ss[2]);     break;
					case "attributeIndices":    allData.put("attributeIndices", ss[2]);    Config.setAttributeIndices(ss[2]);    break;
					case "outputWordCounts":    allData.put("outputWordCounts", ss[2]);    Config.setOutputWordCounts(ss[2]);    break;
					case "normalizeAttributes": allData.put("normalizeAttributes", ss[2]); Config.setNormalizeAttributes(ss[2]); break;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("No config.txt found!");
			System.out.println("Creating new one with default values.");
			
			updateMap();
			writeConfig(true);
			System.out.println("Config written. Look for 'config.txt' in the folder the program was executed in to review options.");
			System.out.println("Exiting program.");
			System.exit(0);
		}
		
		try {reader.close();} catch (IOException e) {}
	}
	
	public static String[] listItemsInDir(String dir) {
		
		List<String> files = new ArrayList<String>();
		File[] listOfFiles = new File(dir).listFiles();
		
		for(File file : listOfFiles) { files.add(file.getName()); }
		
		String[] filesArr = new String[files.size()];
		filesArr = files.toArray(filesArr);
		
		return filesArr;
	}
}
