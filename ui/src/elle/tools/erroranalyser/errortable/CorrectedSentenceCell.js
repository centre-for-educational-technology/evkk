import CorrectedSentence from "./CorrectedSentence";

export default function CorrectedSentenceCell({ sentence, annotations }) {
  function transformSentence(sentence) {
    const transformedSentence = new Map();
    sentence.split(" ").forEach((element, index) => {
      const key = [index, index + 1, -1];
      const value = {
        content: element,
        status: "initial",
      };
      transformedSentence.set(key, value);
    });
    return transformedSentence;
  }

  const transformAnnotation = (annotation) => {
    const key = [
      parseInt(annotation.scopeStart),
      parseInt(annotation.scopeEnd),
      parseInt(annotation.annotatorId),
    ];
    const value = annotation;
    return { key, value };
  };

  const groupAnnotations = (annotations) => {
    const groupedAnnotations = [];
    annotations.forEach((annotation) => {
      if (!groupedAnnotations[annotation.annotatorId]) {
        groupedAnnotations[annotation.annotatorId] = new Map();
      }
      const { key, value } = transformAnnotation(annotation);
      groupedAnnotations[annotation.annotatorId].set(key, value);
    });
    return groupedAnnotations.filter(Boolean);
  };

  const transformedSentence = transformSentence(sentence);
  const groupedAnnotations = groupAnnotations(annotations);

  return (
    <span>
      {groupedAnnotations.map((annotationGroup, index) => (
        <CorrectedSentence
          key={index}
          annotations={annotationGroup}
          sentence={transformedSentence}
        />
      ))}
    </span>
  );
}
