import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const ELEMENT_ID = 'kanban-objects';

class WebComponent extends HTMLElement {
  connectedCallback() {
    const root = ReactDOM.createRoot(this);
    const props = {
      objectDefinitionId: this.getAttribute('id'),
      objectDefinitionERC: this.getAttribute('erc'),
    };
    root.render(<App {...props} />);
  }
}

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
