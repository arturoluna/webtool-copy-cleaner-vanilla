export function cleanText(text) {
  // COMMON CLEANING: trim, remove multiple spaces, convert 3 types of new lines to \n
  let cleanStr = text.trim();
  cleanStr = cleanStr.replace(/\003|\011|\u00A0/gm, ' '); // convert ?, tab, nbsp to space
  cleanStr = cleanStr.replace(/(\r\n|\r)/gm, '\n'); // convert all forms of new lines to \n
  cleanStr = cleanStr.replace(/\n{3,}/gm, '\n\n'); // max 2 line breaks in a row
  cleanStr = cleanStr.replace(/ {2,}/gm, ' '); // kill multiple spaces
  cleanStr = cleanStr.replace(/ {1,}\n/gm, '\n'); // kill trailing spaces
  cleanStr = cleanStr.replace(/[\000-\011]|[\016-\037]/gm, '[*******]'); // replace hidden characters with something obvious

  // Replace line breaks with <br> for HTML output
  let html = cleanStr.replace(/\n/g, '<br>');

  // Remove all HTML tags for plain text output
  let plain = cleanStr.replace(/<\/?[^>]+(>|$)/g, '');

  // Get the input and output elements
  let copyInput = document.getElementById('copyInput');
  let htmlOutput = document.getElementById('htmlOutput');
  let plainOutput = document.getElementById('plainOutput');

  // Clean the input value by removing HTML tags
  let inputCleanStr = copyInput.value.replace(/<[^>]*>/g, '');
  copyInput.value = inputCleanStr;

  // Set the HTML and plain text outputs
  htmlOutput.innerHTML = html;
  plainOutput.innerText = plain;

  return { html, plain };
}