package root.preprocessor;

import java.util.ArrayList;

import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.Utils;

public class CreateDataToPredict {

	public static Instance createData(String text) {
		// https://stackoverflow.com/questions/12118132/adding-a-new-instance-in-weka
		
		Instances data;
		ArrayList<Attribute> attributes;
		ArrayList<String> keeletaseAttr = new ArrayList<String>();
		double[] vars;
		String[] keeletasemed = {"A2","B1","B2","C1"};
		
		attributes = new ArrayList<Attribute>();
		attributes.add(new Attribute("tekst", (ArrayList<String>) null));
		
		for(int i = 0; i < keeletasemed.length; i++) { 
			keeletaseAttr.add(keeletasemed[i]);
		}
		attributes.add(new Attribute("keeletase", keeletaseAttr));
		
		data = new Instances("ToPredict", attributes, 0);
		
		vars = new double[2];
		vars[0] = data.attribute(0).addStringValue(text);
		vars[1] = Utils.missingValue();
		
		data.add(new DenseInstance(1.0, vars));
		
		data.setClassIndex(data.numAttributes() - 1);
		
		return data.firstInstance();
	}
}
