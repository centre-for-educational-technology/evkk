import {useCallback, useEffect, useState} from 'react';
import CorrectedSentence from './CorrectedSentence';

export default function CorrectedSentenceCell({
                                                sentence,
                                                annotationGroups,
                                                showAllErrors,
                                                filters,
                                              }) {
  const [sortedSentences, setSortedSentences] = useState([]);

  //sõnestab algse lause
  const transformSentence = (sentence) => {
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
  };

  //määrab vea kategooria TULEB KOHENDADA LIITVIGADELE
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
      return 'punctuation';
    }
    if (errorType.includes('R:WS')) {
      return 'word-separation';
    }
    if (errorType.includes('R:WO')) {
      return 'word-order';
    }
    return null;
  };

  //teisendab märgendid VEALIIGID ON MASSIIV
  const initializeAnnotation = useCallback((annotation) => {
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
    return {key, value};
  }, []);

  const transformAnnotationGroups = useCallback(
    (annotationGroups, transformedSentence) => {
      annotationGroups.forEach((annotationGroup) => {
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

              if (transformedSentence.has(sourceKey)) {
                sourceContent.push(transformedSentence.get(sourceKey).content);
              }
            }
            annotation.sourceContent = sourceContent.join(' ');
          } else {
            const sourceKey = [
              annotation.scopeStart,
              annotation.scopeEnd,
              -1,
            ].join('::');
            if (transformedSentence.has(sourceKey)) {
              annotation.sourceContent =
                transformedSentence.get(sourceKey).content;
            }
          }
        });
      });
      return annotationGroups;
    },
    []
  );

  const processAnnotations = useCallback((annotationGroups, transformedSentence) => {
    const initialAnnotationGroups = [];
    annotationGroups.forEach((annotationGroup) => {
      const initialAnnotationGroup = new Map();
      annotationGroup.annotations.forEach((annotation) => {
        const {key, value} = initializeAnnotation(annotation);
        initialAnnotationGroup.set(key, value);
      });
      initialAnnotationGroups.push(initialAnnotationGroup);
    });

    return transformAnnotationGroups(
      initialAnnotationGroups,
      transformedSentence
    );
  }, [initializeAnnotation, transformAnnotationGroups]);

  const sortSentence = (sentence) => {
    return Array.from(sentence.entries())
      .map(([key, value]) => {
        const intKey = key.split('::').map(Number);
        return [intKey, value];
      })
      .sort((a, b) => {
        for (let i = 0; i < 3; i++) {
          if (a[0][i] !== b[0][i]) {
            return a[0][i] - b[0][i];
          }
        }
        return 0;
      })
      .map((entry) => entry[1]);
  };

  const applyAnnotations = (annotations, sentence) => {
    const modifiedSentence = structuredClone(sentence);
    annotations.forEach((annotation, key) => {
      const errorType = annotation.errorType;

      switch (errorType[0]) {
        case 'M': //missing => added
          const addedItem = {
            ...annotation,
            status: 'added',
          };
          modifiedSentence.set(key, addedItem);
          break;
        case 'U': //unnecessary => deleted / partially-deleted
          const deletedItemKey = [
            annotation.scopeStart,
            annotation.scopeEnd,
            -1,
          ].join('::');

          const sourceDeletedItem = sentence.get(deletedItemKey);
          if (sourceDeletedItem) {
            const deletedItem = {
              ...annotation,
              ...sourceDeletedItem,
              content:
                annotation.content === '-NONE-'
                  ? sourceDeletedItem.content
                  : annotation.content,
              status:
                annotation.content === '-NONE-'
                  ? 'deleted'
                  : 'partially-deleted',
            };
            modifiedSentence.set(deletedItemKey, deletedItem);
          }
          break;
        default: //"R" => replaced
          for (let i = annotation.scopeStart; i < annotation.scopeEnd; i++) {
            const replacedItemKey = [i, i + 1, -1].join('::');
            const sourceReplacedItem = sentence.get(replacedItemKey);
            if (sourceReplacedItem) {
              const replacedDeletedItem = {
                ...sourceReplacedItem,
                status: 'replaced-deleted',
              };
              modifiedSentence.set(replacedItemKey, replacedDeletedItem);
            }
          }
          const replacedAddedItem = {
            ...annotation,
            status: 'replaced-added',
          };
          modifiedSentence.set(key, replacedAddedItem);
      }
    });
    return sortSentence(modifiedSentence);
  };

  useEffect(() => {
    const transformedSentence = transformSentence(sentence);
    const transformedAnnotationGroups = processAnnotations(annotationGroups, transformedSentence);

    let sortedSentences = [];
    transformedAnnotationGroups.forEach((annotationGroup, index) => {
      sortedSentences[index] = applyAnnotations(
        annotationGroup,
        transformedSentence,
        index
      );
    });
    setSortedSentences(sortedSentences);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentence, annotationGroups]);

  useEffect(() => {
    //console.log(sortedSentences);
  }, [sortedSentences]);

  return (
    <>
      {sortedSentences &&
        sortedSentences.map((sortedSentence, index) => (
          <CorrectedSentence
            key={index}
            sentence={sortedSentence}
            filters={filters}
            showAllErrors={showAllErrors}
          />
        ))}
    </>
  );
}
