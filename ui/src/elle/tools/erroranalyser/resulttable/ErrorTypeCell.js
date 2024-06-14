import { errorTypeOptionsShort } from '../../../const/Constants';
import { useTranslation } from 'react-i18next';


export default function CorrectedSentence({ annotationVersions, showAllErrors, queriedErrorTypes }) {
  const { t } = useTranslation();

  const insertErrorTypes = (errorTypeCount) => {
    const insertedErrorTypes = [];
    Object.entries(errorTypeCount).forEach(([errorType, errorCount], index) => {
      (queriedErrorTypes.includes(errorType) || showAllErrors) &&
      insertedErrorTypes.push(
        <div key={index}>
          {t(errorTypeOptionsShort[errorType]).toLowerCase()} ({errorCount})
        </div>
      );
    });
    return insertedErrorTypes;
  };

  const displayErrorTypes = (annotationVersions) => {
    const extractedErrorTypes = [];

    annotationVersions.forEach((annotationVersion, index) => {
      extractedErrorTypes.push(<div key={index}
                                    className="nested-cell">{insertErrorTypes(annotationVersion.errorTypeCount)}</div>);
    });

    return extractedErrorTypes;
  };

  return displayErrorTypes(annotationVersions);

}
