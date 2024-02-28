import { useCallback, useEffect, useState } from 'react';
import CorrectedSentence from './CorrectedSentence';

export default function CorrectedSentenceCell({ sentence, annotations }) {
  const [transformedSentence, setTransformedSentence] = useState();
  const [groupedAnnotations, setGroupedAnnotations] = useState();

  function transformSentence(sentence) {
    const tempSentence = new Map();
    sentence.split(' ').forEach((element, index) => {
      const key = [index, index + 1, -1].join('::');
      const value = {
        content: element,
        status: 'initial',
      };
      tempSentence.set(key, value);
    });
    // console.log(tempSentence);
    setTransformedSentence(tempSentence);
    return tempSentence;
  }

  const getCategory = (errorType) => {
    if (
      errorType.includes('R:SPELL') ||
      errorType.includes('R:CASE') ||
      errorType.includes('R:NOM:FORM') ||
      errorType.includes('R:VERB:FORM') ||
      errorType.includes('LEX')
    ) {
      return 'word-error';
    }
    if (errorType.includes('PUNCT')) {
      return 'puntuation';
    }
    if (errorType.includes('R:WS')) {
      return 'word-separation';
    }
    if (errorType.includes('R:WO')) {
      return 'word-order';
    }
    return null;
  };

  const transformAnnotation = useCallback((annotation) => {
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
      category: getCategory(annotation.errorType),
    };
    return { key, value };
  }, []);

  const transformGroupedAnnotations = useCallback(
    (groupedAnnotations, _transoformedSentence) => {
      groupedAnnotations.forEach((annotationGroup) => {
        annotationGroup.forEach((annotation) => {
          if (annotation.scopeEnd - annotation.scopeStart > 1) {
            let sourceContent = [];
            for (let i = annotation.scopeStart; i < annotation.scopeEnd; i++) {
              const targetKey = [i, i + 1, annotation.annotatorId].join('::');
              const sourceKey = [i, i + 1, -1].join('::');

              if (annotationGroup.has(targetKey)) {
                if (!annotation.nested) {
                  annotation.nested = [];
                }
                annotation.nested.push(annotationGroup.get(targetKey));

                annotationGroup.delete(targetKey);
              }

              if (_transoformedSentence.has(sourceKey)) {
                sourceContent.push(
                  _transoformedSentence.get(sourceKey).content
                );
              }
            }
            annotation.sourceContent = sourceContent.join(' ');
          } else {
            const sourceKey = [
              annotation.scopeStart,
              annotation.scopeEnd,
              -1,
            ].join('::');
            if (_transoformedSentence.has(sourceKey)) {
              annotation.sourceContent =
                _transoformedSentence.get(sourceKey).content;
            }
          }
        });
      });
      return groupedAnnotations;
    },
    []
  );

  const groupAnnotations = useCallback(
    (annotations, transoformedSentence) => {
      const groupedAnnotations = [];
      annotations.forEach((annotation) => {
        if (!groupedAnnotations[annotation.annotatorId]) {
          groupedAnnotations[annotation.annotatorId] = new Map();
        }
        const { key, value } = transformAnnotation(annotation);
        groupedAnnotations[annotation.annotatorId].set(key, value);
      });
      return transformGroupedAnnotations(
        groupedAnnotations.filter(Boolean),
        transoformedSentence
      );
    },
    [transformAnnotation, transformGroupedAnnotations]
  );

  useEffect(() => {
    const transoformedSentence = transformSentence(sentence);
    const groupedAnnotations = groupAnnotations(
      annotations,
      transoformedSentence
    );
    setGroupedAnnotations(groupedAnnotations);
  }, [sentence, annotations, groupAnnotations]);

  return (
    <>
      {groupedAnnotations &&
        groupedAnnotations.map((annotationGroup, index) => (
          <CorrectedSentence
            key={index}
            annotations={annotationGroup}
            sentence={transformedSentence}
          />
        ))}
    </>
  );
}
