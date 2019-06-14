import React from 'react';
import ReactDOM from 'react-dom';
import domReady from '@wordpress/dom-ready';
import App from 'components/app';
import * as meta from 'services/meta';
import * as tasks from 'services/tasks';
import * as users from 'services/users';
import * as workflows from 'services/workflows';
import './stores';

const mercuryObj = window.wp.mercury;
window.wp.mercury = (mercuryObj && Object.keys(mercuryObj).length)
  ? mercuryObj
  : {
    meta,
    tasks,
    users,
    workflows,
  };

const rootEl = document.getElementById('mercury-workflow-ui');

if (rootEl) {
  // Do something after DOM loads.
  domReady(() => {
    ReactDOM.render(
      <App />,
      rootEl
    );

    if (module.hot) {
      module.hot.accept('./components/app', () => {
        const NextApp = require('./components/app').default; // eslint-disable-line global-require

        ReactDOM.render(<NextApp />, rootEl);
      });
    }
  });
}
