import './style.css'
import javascriptLogo from './javascript.svg'

import { cleanText } from './cleaner';

document.getElementById('cleanText').addEventListener('click', () => {
  let text = document.getElementById('copyInput').value;
   cleanText(text);

}
);