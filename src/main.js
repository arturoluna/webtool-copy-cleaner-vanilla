import './style.css'
import javascriptLogo from './javascript.svg'

import { cleanText } from './cleaner';

// Get reference to the textarea
const copyInput = document.getElementById('copyInput');

// Function to handle text cleaning
const handleCleanText = () => {
  const text = copyInput.value;
  let { html } = cleanText(text);
  console.log(html);
  // Display the cleaned text
  document.getElementById('htmlOutput').innerHTML = html;

};

document.getElementById('cleanText').addEventListener('click', handleCleanText);