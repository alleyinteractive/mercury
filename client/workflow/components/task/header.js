import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="mercury__settings__footer">
        <div className="mercury__settings__footer__assigned">
          <span>Assigned To: James Burke</span>
          <span>Due Date: June 03</span>
        </div>
        <div className="mercury__settings__footer__complete">
          <small>Next Task: Write Draft</small>
          <label
            className="mercury__footer__next-assignee__label"
            htmlFor="next-assignee"
          >
            <span className="mercury__field_label_text">Assigned To</span>
            <select id="next-assignee" name="next-assignee">
              <option>Test</option>
            </select>
          </label>
          <button type="button">Complete Task</button>
        </div>
      </footer>
    );
  }
}

export default Footer;
