package root.preprocessor;

import java.io.BufferedReader;
import java.io.FileReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import root.Config;
import weka.classifiers.functions.MultilayerPerceptron;
import weka.classifiers.meta.FilteredClassifier;
import weka.core.Instances;
import weka.core.SerializationHelper;
import weka.filters.unsupervised.attribute.StringToWordVector;

// https://stackoverflow.com/questions/28694971/using-neural-network-class-in-weka-in-java-code
// https://stackoverflow.com/questions/38968732/add-double-array-to-weka-instances
// https://weka.wikispaces.com/Use+WEKA+in+your+Java+code
// http://weka.8497.n7.nabble.com/Multi-layer-perception-td2896.html
// https://weka.wikispaces.com/Programmatic+Use
// http://weka.8497.n7.nabble.com/Using-Latent-Semantic-Analysis-td7320.html LSA jaoks
// https://machinelearningmastery.com/save-machine-learning-model-make-predictions-weka/
// https://forums.pentaho.com/threads/97648-Attribute-selection-followed-by-classification-in-weka-explorer/
// https://stackoverflow.com/questions/28940110/how-can-i-use-my-text-classifier-in-practice-as-of-getting-the-tf-idf-values-of
// http://www.hakank.org/weka/TextClassifier.java

public class ModelBuilder {
	public String buildModel(String modelName) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

		try {
			System.out.println("[" + dateFormat.format(new Date()) + "]" + " Starting classifier build.");

			BufferedReader reader = new BufferedReader(new FileReader(System.getProperty("user.dir") + Config.getTrainingData()));
			Instances trainingData = new Instances(reader);
			reader.close();
			System.out.println("[" + dateFormat.format(new Date()) + "]" + " Got data.");

			//select which attribtue is model going to be predicting. here its selecting the last column
			trainingData.setClassIndex(trainingData.numAttributes() - 1);
			
			// transform strings into word vectors
			StringToWordVector filter = new StringToWordVector();
			filter.setTFTransform(Config.isTf());
			filter.setIDFTransform(Config.isIdf());
			filter.setOutputWordCounts(Config.isOutputWordCounts());
			filter.setWordsToKeep(Config.getWordsToKeep());
			filter.setLowerCaseTokens(Config.isLowerCaseTokens());
			filter.setAttributeIndices(Config.getAttributeIndices());
			filter.setInputFormat(trainingData);
			System.out.println("[" + dateFormat.format(new Date()) + "]" + " Filter set.");
			
			MultilayerPerceptron mlp = new MultilayerPerceptron();
			mlp.setHiddenLayers(Config.getHiddenLayers());
			mlp.setLearningRate(Config.getLearningRate());
			mlp.setMomentum(Config.getMomentum());
			mlp.setTrainingTime(Config.getTrainingTime());
			mlp.setNormalizeAttributes(Config.isNormalizeAttributes());
			System.out.println("[" + dateFormat.format(new Date()) + "]" + " Classifier set.");

			FilteredClassifier fc = new FilteredClassifier();			
			fc.setClassifier(mlp);
			fc.setFilter(filter);

			System.out.println("[" + dateFormat.format(new Date()) + "]" + " Building classifier.");
			fc.buildClassifier(trainingData);

			System.out.println("[" + dateFormat.format(new Date()) + "]" + " Classifier built!");

			SerializationHelper.write("models/" + modelName + ".model", fc);
			System.out.println("Classifier model written. File: "+ modelName);
			
			return "Model built and saved in models/" + modelName + ".model";

		} catch (Exception e) {
			System.out.println("Something went wrong while trying to build the model.");
			e.printStackTrace();
			return "Something went wrong while building the model. Exception: " + e.getClass().getCanonicalName();
		}	
	}
}
