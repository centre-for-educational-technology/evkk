import { useEffect } from 'react';
import { H5P } from 'h5p-standalone';

export default function H5PPlayer({ externalId }) {
  useEffect(() => {
    if (!externalId) return;

    window.H5P = H5P;

    const container = document.getElementById('h5p-container');

//    window.H5PIntegration = {
//        baseUrl: "http://localhost:9090",
//        contentId: externalId,
//        url: `uploads/exercises/${externalId}/content/content.json`,
//    };

    setTimeout(() => {
        new window.H5P(container, {
            //h5pJsonPath: `http://localhost:9090/api/exercises/uploads/exercises/${externalId}`,
            // contentJsonPath: `http://localhost:9090/api/exercises/uploads/exercises/${externalId}/content`,
            contentJsonPath: `https://h5p-standalone.44444444.xyz`,
            frameJs: '/h5p/frame.bundle.js',
            frameCss: '/h5p/styles/h5p.css',
            fullscreen: false,
        });
    }, 1000);

  }, [externalId]);

  return <div id="h5p-container" style={{ height: '500px' }} />;
}
