/* stylelint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import domReady from '@wordpress/dom-ready';
import App from './components/app';

const rootEl = document.getElementById('mercury-workflow-ui');

if (rootEl) {
  const { postId } = rootEl.dataset;

  // Do something after DOM loads.
  domReady(() => {
    ReactDOM.render(
      <App postId={postId} />,
      rootEl
    );
  });

  if (module.hot) {
    module.hot.accept('./components/app', () => {
      const NextApp = require('./components/app').default; // eslint-disable-line global-require

      ReactDOM.render(<NextApp postId={postId} />, rootEl);
    });
  }
}
