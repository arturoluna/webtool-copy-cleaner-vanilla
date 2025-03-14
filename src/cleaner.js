export function cleanText(text) {
  const inputCopy = document.getElementById('copyInput');
 
  let cleanTxt = text.trim();
  // Replace special characters in HTML
  cleanTxt = cleanTxt.replace(/\n{3,}/gm, '\n\n'); //max 2 line breaks in a row
  cleanTxt = cleanTxt.replace(/ {2,}/gm, ' '); //kill multiple spaces
  cleanTxt = cleanTxt.replace(/ {1,}\n/gm, '\n'); //kill trailing spaces
  cleanTxt = cleanTxt.replace(/[\000-\011]|[\016-\037]/gm, '[*******]'); //replace hidden characters with something 
  cleanTxt = cleanTxt.replace(/(\r\n|\n|\r)/gm, '\n<br />'); //convert new lines to html

  // Check which radio button is selected and log it
  const selectedRadio = document.querySelector('input[name="htmlType"]:checked');
  if (selectedRadio) {
    console.log(selectedRadio)
    // console.log(`Currently selected radio button: ${selectedRadio.value}`);
    // You can modify cleanTxt based on selected radio value here if needed
  }
  // Set up event listeners for radio buttons
  document.querySelectorAll('input[name="htmlType"]').forEach(radio => {
    radio.addEventListener('change', () => {
      console.log(`Radio selection changed to: ${radio.value}`);

    });
  });


  
  let html = cleanTxt;
  return { html };
}