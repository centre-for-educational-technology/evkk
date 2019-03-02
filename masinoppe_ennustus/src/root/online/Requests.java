package root.online;

import static spark.Spark.*;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import root.Config;
import root.ConfigIO;
import root.analyzer.GetPrediction;
import root.preprocessor.ModelBuilder;
import root.preprocessor.TextProcessor;

public class Requests {
	
	public static void initServer() {
		
		port(Config.getPort());
		enableCORS("*", "*", "*");
		
		path("/api", () -> {
		    post("/predictNgram", (req, res) -> 			GetPrediction.predict(TextProcessor.createNgrams(req.body().substring(89, req.body().length()-46)), true));
		    post("/predictText", (req, res) -> 				GetPrediction.predict(req.body().substring(89, req.body().length()-46), true));
		    get("/listArffs", (res, req) ->					Arrays.toString(ConfigIO.listItemsInDir("arff")));
	    	get("/listModels", (res, req) ->                Arrays.toString(ConfigIO.listItemsInDir("models")));
	    	get("/buildModel/:modelName", (req, res) -> 	new ModelBuilder().buildModel(req.params(":modelName")));
	    	
	    	path("/config/get", () -> {
	    		get("/tf", (req, res) ->                     Config.isTf());
		    	get("/idf", (req, res) ->                    Config.isIdf());
		    	get("/momentum", (req, res) ->               Config.getMomentum());
		    	get("/wordsToKeep", (req, res) ->            Config.getWordsToKeep());
		    	get("/activeModel", (req, res) ->            Config.getActiveModel());
		    	get("/trainingData", (req, res) ->           Config.getTrainingData());
		    	get("/hiddenLayers", (req, res) ->           Config.getHiddenLayers());
		    	get("/trainingTime", (req, res) ->           Config.getTrainingTime());
		    	get("/learningRate", (req, res) ->           Config.getLearningRate());
		    	get("/lowerCaseTokens", (req, res) ->        Config.isLowerCaseTokens());
		    	get("/outputWordCounts", (req, res) ->       Config.isOutputWordCounts());
		    	get("/attributeIndices", (req, res) ->       Config.getAttributeIndices());
		    	get("/normalizeAttributes", (req, res) ->    Config.isNormalizeAttributes());
		    });
	    	
	    	path("/config/update", () -> {
		    	put("/idf/:var", (req, res) -> { Config.setIdf(req.params(":var"));                                 return Boolean.toString(Config.isIdf()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/tf/:var", (req, res) -> { Config.setTf(req.params(":var"));                                   return Boolean.toString(Config.isTf()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/momentum/:var", (req, res) -> { Config.setMomentum(req.params(":var"));                       return Double.toString(Config.getMomentum()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/wordsToKeep/:var", (req, res) -> { Config.setWordsToKeep(req.params(":var"));                 return Integer.toString(Config.getWordsToKeep()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/hiddenLayers/:var", (req, res) -> { Config.setHiddenLayers(req.params(":var"));               return Config.getHiddenLayers().equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/trainingTime/:var", (req, res) -> { Config.setTrainingTime(req.params(":var"));               return Integer.toString(Config.getTrainingTime()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/learningRate/:var", (req, res) -> { Config.setLearningRate(req.params(":var"));               return Double.toString(Config.getLearningRate()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/lowerCaseTokens/:var", (req, res) -> { Config.setLowerCaseTokens(req.params(":var"));         return Boolean.toString(Config.isLowerCaseTokens()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/outputWordCounts/:var", (req, res) -> { Config.setOutputWordCounts(req.params(":var"));       return Boolean.toString(Config.isOutputWordCounts()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/attributeIndices/:var", (req, res) -> { Config.setAttributeIndices(req.params(":var"));       return Config.getAttributeIndices().equals(req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/activeModel/:var", (req, res) -> { Config.setActiveModel("/models/" + req.params(":var"));    return Config.getActiveModel().equals("/models/" + req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/trainingData/:var", (req, res) -> { Config.setTrainingData("/arff/" + req.params(":var"));    return Config.getTrainingData().equals("/arff/" + req.params(":var")) ? "OK" : "NOOK"; });
		    	put("/normalizeAttributes/:var", (req, res) -> { Config.setNormalizeAttributes(req.params(":var")); return Boolean.toString(Config.isNormalizeAttributes()).equals(req.params(":var")) ? "OK" : "NOOK"; });
		    });
		});
	}
	
	private static void enableCORS(final String origin, final String methods, final String headers) {

	    options("/*", (request, response) -> {

	        String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
	        if (accessControlRequestHeaders != null) {
	            response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
	        }

	        String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
	        if (accessControlRequestMethod != null) {
	            response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
	        }

	        return "OK";
	    });

	    before((request, response) -> {
	        response.header("Access-Control-Allow-Origin", origin);
	        response.header("Access-Control-Request-Method", methods);
	        response.header("Access-Control-Allow-Headers", headers);
	        response.type("text/html;");
	    });
}
}
