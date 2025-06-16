import React, { useEffect } from 'react';
import { H5P } from 'h5p-standalone';

export default function H5PPlayer({ externalId }) {
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


    new H5P(container, options).catch(e => console.error('H5P error:', e));
  }, [externalId]);

  return <div id="h5p-container" style={{ height: '500px' }} />;
}
