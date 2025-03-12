export function cleanText(text) {
 // Replace <b> and <ul> with <a>
 let html = text
 .replace(/<b>(.*?)<\/b>/gi, '<a>$1</a>')
 .replace(/<ul>(.*?)<\/ul>/gi, '<a>$1</a>');

 // Remove all HTML tags for plain text output
 let plain = html.replace(/<\/?[^>]+(>|$)/g, '');

  return {html, plain};
}