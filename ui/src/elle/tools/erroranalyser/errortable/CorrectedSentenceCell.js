import CorrectedSentence from './CorrectedSentence';

export default function CorrectedSentenceCell({ sentence, annotations }) {
  function transformSentence(sentence) {
    const transformedSentence = new Map();
    sentence.split(' ').forEach((element, index) => {
      const key = [index, index + 1, -1].join('::');
      const value = {
        content: element,
        status: 'initial',
      };
      transformedSentence.set(key, value);
    });
    return transformedSentence;
  }

  const transformAnnotation = (annotation) => {
    const key = [
      annotation.scopeStart,
      annotation.scopeEnd,
      annotation.annotatorId,
    ].join('::');
    const value = {
      content: annotation.correction,
      errorType: annotation.errorType,
      annotatorId: parseInt(annotation.annotatorId),
      scopeStart: parseInt(annotation.scopeStart),
      scopeEnd: parseInt(annotation.scopeEnd),
    };
    return { key, value };
  };

  const transformGroupedAnnotations = (groupedAnnotations) => {
    //tagastan massiivi findNestedAnnotations
    groupedAnnotations.forEach((annotations) => {
      // console.log(annotations);
      annotations.forEach((annotation) => {
        if (annotation.scopeEnd - annotation.scopeStart > 1) {
          // console.log(annotation);
          annotation.nested = [];
          for (let i = annotation.scopeStart; i < annotation.scopeEnd; i++) {
            const key = [i, i + 1, annotation.annotatorId].join('::');
            if (annotations.has(key)) {
              annotation.nested.push(annotations.get(key));
              // console.log('tere');
              annotations.delete(key);
            }
          }
        }
      });
      // console.log(annotations);
    });
    // console.log(groupedAnnotations);
    return groupedAnnotations;
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

    return transformGroupedAnnotations(groupedAnnotations.filter(Boolean));
  };

  const transformedSentence = transformSentence(sentence);
  const groupedAnnotations = groupAnnotations(annotations);
  // console.log(groupedAnnotations);

  return (
    <>
      {groupedAnnotations.map((annotationGroup, index) => (
        <CorrectedSentence
          key={index}
          annotations={annotationGroup}
          sentence={transformedSentence}
        />
      ))}
    </>
  );
}
