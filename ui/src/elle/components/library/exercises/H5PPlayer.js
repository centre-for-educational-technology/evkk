import React, { useEffect } from 'react';
import { H5P } from 'h5p-standalone';
import { successEmitter } from '../../../../App';

export function H5PPlayer({ externalId, onFinish, setResults }) {

  useEffect(() => {
    if (!externalId) return;

    window.H5PIntegration = {
      baseUrl: "http://localhost:9090/api",
      contentId: externalId,
      url: `/exercises/uploads/exercises/${externalId}/`
    };

    const container = document.getElementById('h5p-container');

    const options = {
      h5pJsonPath: `http://localhost:9090/api/exercises/uploads/exercises/${externalId}`,
      contentJsonPath: `http://localhost:9090/api/exercises/uploads/exercises/${externalId}/content`,
      urlLibraries: `http://localhost:9090/api/exercises/uploads/exercises/${externalId}`, //peab viitama kataloogile
      frameJs: '/dist/frame.bundle.js',
      frameCss: '/dist/styles/h5p.css',
      fullscreen: false,
    };

    new H5P(container, options)
      .then(() => {
        if (window.H5P && window.H5P.externalDispatcher) {
          window.H5P.externalDispatcher.on('xAPI', function (event) {
            // console.log('xAPI event:', event.data.statement);
            const isCompleted = event.getVerb() === "completed";
            if (isCompleted) {
              const results = {
                score: event.getScore() ?? 0,
                maxScore: event.getMaxScore() ?? 0,
                duration: event.getVerifiedStatementValue(["result", "duration"]) ?? 0,
              };

              setResults(results);

              successEmitter.emit("success_exercise_completed");

              onFinish();
            };
          });
        }
      })
      .catch(e => console.error('H5P error:', e));

  }, [externalId]);


  return <div id="h5p-container" style={{ width: '100%' }} />;
  //return <div id="h5p-container" style={{ height: '500px' }} />;
};
