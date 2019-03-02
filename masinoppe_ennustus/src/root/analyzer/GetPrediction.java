package root.analyzer;

import java.text.DecimalFormat;

import root.Config;
import root.preprocessor.CreateDataToPredict;

import weka.classifiers.Classifier;
import weka.core.Instance;
import weka.core.SerializationHelper;

// https://stackoverflow.com/questions/28940110/how-can-i-use-my-text-classifier-in-practice-as-of-getting-the-tf-idf-values-of
// https://stackoverflow.com/questions/23275600/cant-predicted-the-class-with-weka-using-java-code

public class GetPrediction {
	public static String predict(String text, boolean html) {
		String predictionStr = "";
		
		try {
			Classifier cls = (Classifier) SerializationHelper.read(System.getProperty("user.dir") + Config.getActiveModel());
			Instance testInstance = CreateDataToPredict.createData(text);

			double[] prediction = cls.distributionForInstance(testInstance);
			double percentage = 0.0;
			
			for(int i = 0; i < prediction.length; i++) {
				percentage += prediction[i];
			}
			
			if(html) {
				for(int i = 0; i < prediction.length; i++){
					predictionStr += testInstance.classAttribute().value(i) + " keeletaseme tõenäosus on: "+ new DecimalFormat("#.00").format(prediction[i] / percentage * 100) + "%.<br>";
				}
			} else {
				for(int i = 0; i < prediction.length; i++){
					System.out.println(testInstance.classAttribute().value(i) + " keeletaseme tõenäosus on: "+ new DecimalFormat("#.00").format(prediction[i] / percentage * 100) + "%.");
				}
			}
			
		} catch (Exception e) {
			System.out.println("Something wrong with the prediction");
			e.printStackTrace();
		}
		
		return predictionStr;
	}	
}
