import React, { useEffect } from 'react';
import { H5P } from 'h5p-standalone';
import { successEmitter } from '../../../../App';

export function H5PPlayer({ externalId, setResults, setDuration }) {

  useEffect(() => {
    if (!externalId) return;

    window.H5PIntegration = {
      baseUrl: "/api",
      contentId: externalId,
      url: `/exercises/uploads/exercises/${externalId}/`
    };

    const container = document.getElementById('h5p-container');

    const options = {
      h5pJsonPath: `/api/exercises/uploads/exercises/${externalId}`,
      contentJsonPath: `/api/exercises/uploads/exercises/${externalId}/content`,
      urlLibraries: `/api/exercises/uploads/exercises/${externalId}`, //peab viitama kataloogile
      frameJs: '/dist-h5p/frame.bundle.js',
      frameCss: '/dist-h5p/styles/h5p.css',
      fullscreen: false,
    };

    new H5P(container, options)
      .then(() => {
        if (window.H5P && window.H5P.externalDispatcher) {
          window.H5P.externalDispatcher.on('xAPI', function (event) {
            // console.log('xAPI event:', event.data.statement);
            const isAnswered = event.getVerb() === "answered";
            if (isAnswered) {
              const result = {
                score: event.getScore() ?? 0,
                maxScore: event.getMaxScore() ?? 0,
              };
              const duration = event.getVerifiedStatementValue(["result", "duration"]) ?? '';

              setResults((prevResult) => {
                return [...prevResult, result];
              });

              setDuration((prevDuration) => {
                return [...prevDuration, duration];
              });
            };
            const isCompleted = event.getVerb() === "completed";
            if (isCompleted) {
              const duration = event.getVerifiedStatementValue(["result", "duration"]) ?? ''
              setDuration([duration]);
            };
          });
        }
      })
      .catch(e => console.error('H5P error:', e));

  }, [externalId]);


  return <div id="h5p-container" style={{ width: '100%' }} />;
};
