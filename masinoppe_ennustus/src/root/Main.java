package root;

import root.online.Requests;
import root.preprocessor.ModelBuilder;
import root.preprocessor.TextProcessor;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import root.analyzer.GetPrediction;

public class Main {

	public static void main(String[] args) {
		
		ConfigIO.readConfig();
				
		if(args.length != 0) {
			
			List<String> argss = Arrays.asList(args);
			boolean sysout = false;
			
			if(argss.contains("-c")) {sysout = true;}
			
			switch(args[0]) {
				case "-a": 
					if(sysout) {System.out.println("API mode selected.");}
					
					if(args.length == 1) {
						if(sysout) {System.out.println("No port specified. Using default 4568.");}
					} else {
						Config.setPort(Integer.parseInt(args[1]));
						if(sysout) {System.out.println("Using port: " + args[1] + "." );}
					}
					Requests.initServer();
					break;
					
				case "-m":
					if(sysout) {System.out.println("Model building mode selected.");}
					
					if(args.length == 1) {
						if(sysout) {System.out.println("No model name given.");}
						if(sysout) {System.out.println("Starting model build with options from 'config.txt' and default name.");}
						new ModelBuilder().buildModel("model-" + new SimpleDateFormat("yyyyMMddHHmm'.txt'").format(new Date()));
					} else { 
						if(sysout) {System.out.println("Starting model build with options from 'config.txt' and name '" + args[1] + "'."); }
						new ModelBuilder().buildModel(args[1]);
					}
					
					break;
					
				case "-pn":
					if(sysout) {System.out.println("Prediction with ngrams mode selected.");}
					
					if(args.length == 1) {
						if(sysout) {System.out.println("No text was given");}
						if(sysout) {System.out.println("Reminder! Text has to go inbetween \" \".");}
					} else {
						if(sysout) {System.out.println("Supplied text: " + args[1]);}
						if(sysout) {System.out.println("Predicting text language level using 'config.txt' values.");}
						GetPrediction.predict(TextProcessor.createNgrams(args[1]), false);
					}
					break;
					
				case "-pt":
					if(sysout) {System.out.println("Prediction with text mode selected.");}
					
					if(args.length == 1) {
						if(sysout) {System.out.println("No text was given");}
						if(sysout) {System.out.println("Reminder! Text has to go inbetween \" \".");}
					} else {
						if(sysout) {System.out.println("Supplied text: " + args[1]);}
						if(sysout) {System.out.println("Predicting text language level using 'config.txt' values.");}
						GetPrediction.predict(args[1], false);
					}
					break;
					
				default:
					System.out.println("Incorrect arguments.");
					break;
			}
		}else {
			System.out.println("No arguments present.");
			System.out.println("API mode selected. Starting server.");
			Requests.initServer();
		}
	}	
}
