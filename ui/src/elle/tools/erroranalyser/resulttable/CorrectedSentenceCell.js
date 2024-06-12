import { useCallback, useEffect, useState } from 'react';
import CorrectedSentence from './CorrectedSentence';

export default function CorrectedSentenceCell({
                                                sentence,
                                                annotationVersions,
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
  const getCategory = (errorTypes) => {
    if (errorTypes.length > 1) {
      return 'compound-error';
    }
    const errorType = errorTypes[0];
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
      return 'white-space';
    }
    if (errorType.includes('R:WO')) {
      return 'word-order';
    }
    return null;
  };

  //teisendab märgendid
  const initializeAnnotation = useCallback((annotation) => {
    const key = [
      annotation.scopeStart,
      annotation.scopeEnd,
      annotation.annotatorId,
    ].join('::');
    const value = {
      content: annotation.content,
      errorType: annotation.errorType,
      extractedErrorTypes: annotation.extractedErrorTypes,
      annotatorId: parseInt(annotation.annotatorId),
      scopeStart: parseInt(annotation.scopeStart),
      scopeEnd: parseInt(annotation.scopeEnd),
      category: getCategory(annotation.extractedErrorTypes),
    };
    //console.log(key, value, annotation);
    return {key, value};
  }, []);


  const transformAnnotationVersions = useCallback(
    (annotationVersions, transformedSentence) => {
      annotationVersions.forEach((annotationVersion) => {
        annotationVersion.forEach((annotation) => {
          if (annotation.scopeEnd - annotation.scopeStart > 1) {
            let sourceContent = [];
            for (let i = annotation.scopeStart; i < annotation.scopeEnd; i++) {
              const targetKey1 = [i, i, annotation.annotatorId].join('::');
              const sourceKey1 = [i, i, -1].join('::');

              const targetKey2 = [i, i + 1, annotation.annotatorId].join('::');
              const sourceKey2 = [i, i + 1, -1].join('::');

              if (annotationVersion.has('5::5:1')) {
                console.log('eureka');
              }


              //KAS SEE ON VAJALIK
              /*        if (annotationVersion.has(targetKey1)) {
                        console.log(annotation);
                        if (!annotation.nested) {
                          annotation.nested = [];
                        }
                        annotation.nested.push(annotationVersion.get(targetKey1));
                        //annotationVersion.delete(targetKey1);
                      }*/

              if (annotationVersion.has(targetKey2)) {
                if (!annotation.nested) {
                  annotation.nested = [];
                }
                annotation.nested.push(annotationVersion.get(targetKey2));
                annotationVersion.delete(targetKey2);
              }

              /*     if (transformedSentence.has(sourceKey1)) {
                     sourceContent.push(transformedSentence.get(sourceKey1).content);
                   }*/

              if (transformedSentence.has(sourceKey2)) {
                sourceContent.push(transformedSentence.get(sourceKey2).content);
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
      //annotationVersions.forEach(x => (x.forEach(y => console.log(y))));
      return annotationVersions;
    },
    []
  );

  const processAnnotations = useCallback((annotationVersions, transformedSentence) => {
    const initialAnnotationVersions = [];
    annotationVersions.forEach((annotationVersion) => {
      const initialAnnotationVersion = new Map();
      annotationVersion.annotations.forEach((annotation) => {
        const {key, value} = initializeAnnotation(annotation);
        initialAnnotationVersion.set(key, value);
      });
      initialAnnotationVersions.push(initialAnnotationVersion);
    });

    //initialAnnotationVersions.forEach(x => (x.forEach(y => console.log(y))));

    return transformAnnotationVersions(
      initialAnnotationVersions,
      transformedSentence
    );
  }, [initializeAnnotation, transformAnnotationVersions]);

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
      .map((entry) => {
        //console.log(entry);
        return entry[1];
      });
  };

  const applyAnnotations = (annotations, sentence) => {
    const modifiedSentence = structuredClone(sentence);
    annotations.forEach((annotation, key) => {
      const errorType = annotation.errorType;

      //console.log(annotation);

      switch (errorType[0]) {
        case 'M': //missing => added / replaced-deleted
          const addedItem = {
            ...annotation,
            status: 'added',
          };
          //console.log(addedItem.content, key);
          modifiedSentence.set(key, addedItem);

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
    const transformedAnnotationVersions = processAnnotations(annotationVersions, transformedSentence);

    //console.log(transformedAnnotationVersions.valueOf());
    //transformedAnnotationVersions.forEach(x => (x.forEach(y => console.log(y))));
    let sortedSentences = [];
    transformedAnnotationVersions.forEach((annotationVersion, index) => {
      //annotationVersion.forEach((x) => console.log(x));
      sortedSentences[index] = applyAnnotations(
        annotationVersion,
        transformedSentence,
        index
      );
    });
    setSortedSentences(sortedSentences);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentence, annotationVersions]);

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
