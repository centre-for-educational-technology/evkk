package root;

public class Config {
	
	// default server vars
	private static int port = 4568;
	
	// default prediction vars
	private static String activeModel = "models/file.model";
	
	// default string to word vector filter vars
	private static boolean tf = true;
	private static boolean idf = true;
	private static int wordsToKeep = 10000;
	private static boolean lowerCaseTokens = true;
	private static boolean outputWordCounts = true;
	private static String attributeIndices = "first-last";

	// default neural network vars
	private static double momentum = 0.2;
	private static int trainingTime = 500;
	private static String hiddenLayers = "7";
	private static double learningRate = 0.3;
	private static boolean normalizeAttributes = false;
	private static String trainingData = "/arff/keeletase_ja_ngramid.arff";
	
	// getters
	public static int getPort() {                   return port;}
	public static boolean isTf() {                  return tf;}
	public static boolean isIdf() {                 return idf;}
	public static double getMomentum() {            return momentum;}
	public static String getActiveModel() {         return activeModel;}
	public static int getWordsToKeep() {            return wordsToKeep;}
	public static String getHiddenLayers() {        return hiddenLayers;}
	public static int getTrainingTime() {           return trainingTime;}
	public static double getLearningRate() {        return learningRate;}
	public static String getTrainingData() {        return trainingData;}
	public static boolean isLowerCaseTokens() {     return lowerCaseTokens;}
	public static boolean isOutputWordCounts() {    return outputWordCounts;}
	public static String getAttributeIndices() {    return attributeIndices;}
	public static boolean isNormalizeAttributes() { return normalizeAttributes;}
	
	// setters
	public static void setPort(int port) { 							        Config.port = port; }
	public static void setTf(String tf) {                                   Config.tf = Boolean.parseBoolean(tf);                                   ConfigIO.writeConfig(true);}
	public static void setIdf(String idf) {                                 Config.idf = Boolean.parseBoolean(idf);                                 ConfigIO.writeConfig(true);}
	public static void setMomentum(String momentum) {                       Config.momentum = Double.parseDouble(momentum);                         ConfigIO.writeConfig(true);}
	public static void setWordsToKeep(String wordsToKeep) {                 Config.wordsToKeep = Integer.parseInt(wordsToKeep);                     ConfigIO.writeConfig(true);}
	public static void setActiveModel(String activeModel) {                 Config.activeModel = activeModel;                                       ConfigIO.writeConfig(true);}
	public static void setTrainingData(String trainingData) {               Config.trainingData = trainingData;                                     ConfigIO.writeConfig(true);}
	public static void setHiddenLayers(String hiddenLayers) {               Config.hiddenLayers = hiddenLayers;                                     ConfigIO.writeConfig(true);}
	public static void setTrainingTime(String trainingTime) {               Config.trainingTime = Integer.parseInt(trainingTime);                   ConfigIO.writeConfig(true);}
	public static void setLearningRate(String learningRate) {               Config.learningRate = Double.parseDouble(learningRate);                 ConfigIO.writeConfig(true);}
	public static void setLowerCaseTokens(String lowerCaseTokens) {         Config.lowerCaseTokens = Boolean.parseBoolean(lowerCaseTokens);         ConfigIO.writeConfig(true);}
	public static void setOutputWordCounts(String outputWordCounts) {       Config.outputWordCounts = Boolean.parseBoolean(outputWordCounts);       ConfigIO.writeConfig(true);}
	public static void setAttributeIndices(String attributeIndices) {       Config.attributeIndices = attributeIndices;                             ConfigIO.writeConfig(true);}
	public static void setNormalizeAttributes(String normalizeAttributes) { Config.normalizeAttributes = Boolean.parseBoolean(normalizeAttributes); ConfigIO.writeConfig(true);}

}
