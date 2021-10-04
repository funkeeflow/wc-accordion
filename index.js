import './style.css';
import './wc-accordion.js';
import './wc-toggle.js';

const accordion = document.querySelector('wc-accordion');

document.getElementById('toggle-all').addEventListener('change', (event) => {
  if (event.detail.checked) {
    accordion.openAll();
  } else {
    accordion.closeAll();
  }
});

document.getElementById('toggle-1').addEventListener('change', (event) => {
  if (event.detail.checked) {
    accordion.open(0);
  } else {
    accordion.close(0);
  }
});

document.getElementById('mode').addEventListener('change', (event) => {
  if (event.detail.checked) {
    accordion.setAttribute('mode', 'exclusive');
  } else {
    accordion.removeAttribute('mode');
  }
});
