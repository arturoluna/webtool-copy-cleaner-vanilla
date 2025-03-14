
$(document).ready(function() {

  var windowHeight = $(window).innerHeight();
  if (windowHeight > 100) {
      windowHeight *= .25;
      $('textarea.bodyCopy').css({
          height: windowHeight
      });
  }
  var htmlReplacers = {
      '’': '&rsquo;',
      '’': '&rsquo;',
      '\'': '&rsquo;',
      '‘': '&lsquo;',
      '—': '&mdash;',
      '--': '&mdash;',
      '–': '&mdash;',
      '­­': '&mdash;',
      '­': '-',
      '& ': '&amp; ',
      //'<': '&lt;',
      //'>': '&gt;',
      '“': '&ldquo;',
      '”': '&rdquo;',
      '©': '&copy;',
      '®': '&reg;',
      '™': '&trade;',
      '·': '&bull;',
      '•': '&bull;',
      '●': '&bull;',
      //'PS\.': 'P.S.',
      '…': '&hellip;',
      '»': '&raquo;',
      '​': ''
  };
  var textReplacers = {
      '’': '\'',
      '&rsquo;': '\'',
      '‘': '\'',
      '—': '--',
      '—': '--',
      '–': '--',
      '­­': '--',
      '­': '-',
      '&mdash;': '--',
      '&amp;': '&',
      '&copy;': '(c)',
      '&reg;': '(r)',
      '&trade;': '(tm)',
      '&nbsp;': ' ',
      '“': '"',
      '”': '"',
      '©': '(c)',
      '®': '(r)',
      '™': '(tm)',
      '·': '-- ',
      '•': '-- ',
      '●': '-- ',
      //'PS\.': 'P.S.',
      '…': '...',
      '»': '>>',
      '​': ''
  };

  var inputBodyCopy = $('textarea.bodyCopy.input');
  var htmlBodyCopy = $('textarea.bodyCopy.html');
  var textBodyCopy = $('textarea.bodyCopy.text');
  var ctr = 0;

  inputBodyCopy.change(function() {
      //COMMON CLEANING ON INPUT FIELD: trim, remove multiple spaces, convert 3 types of new lines to \n
      var cleanStr = inputBodyCopy.val().trim();
      cleanStr = cleanStr.replace(/\003|\011|\u00A0/gm, ' '); //convert ?, tab, nbsp to space
      cleanStr = cleanStr.replace(/(\r\n|\r)/gm, '\n'); //convert all forms of new lines to \n
      cleanStr = cleanStr.replace(/\n{3,}/gm, '\n\n'); //max 2 line breaks in a row
      cleanStr = cleanStr.replace(/ {2,}/gm, ' '); //kill multiple spaces
      cleanStr = cleanStr.replace(/ {1,}\n/gm, '\n'); //kill trailing spaces
      cleanStr = cleanStr.replace(/[\000-\011]|[\016-\037]/gm, '[*******]'); //replace hidden characters with something obvious

      inputBodyCopy.val(cleanStr);

      //CLEAN FOR HTML
      htmlBodyCopy.val(selectCleanHtml(cleanStr));

      //CLEAN FOR TEXT
      textBodyCopy.val(cleanText(cleanStr));
  });

  $('input.htmlType').change(function() {
      var cleanStr = inputBodyCopy.val().trim();
      htmlBodyCopy.val(selectCleanHtml(cleanStr));
  });

  function selectCleanHtml(cleanStr) {
      if ($('input.htmlType.web').prop('checked')) {
          return cleanHtmlWeb(cleanStr);
      } else {
          return cleanHtmlEmail(cleanStr);
      }
  }

  function cleanHtmlEmail(cleanStr) {
      cleanStr = cleanStr.replace(/(\r\n|\n|\r)/gm, '\n<br />'); //convert new lines to html
      return standardReplace(cleanStr, htmlReplacers);
  }

  function cleanHtmlWeb(cleanStr) {
      var lineList = cleanStr.split(/\n/gm);
      for (var i = 0; i < lineList.length; i++) {
          if (typeof lineList[i] === 'string' && lineList[i].trim() !== '') {
              lineList[i] = '<p>' + standardReplace(lineList[i], htmlReplacers) + '</p>';
          }
      }
      return lineList.join('\n');
  }

  function cleanText(cleanStr) {
      return standardReplace(cleanStr, textReplacers);
  }

  function standardReplace(sourceText, replaceList) {
      for (var key in replaceList) {
          var re = new RegExp(key, 'gm');
          sourceText = sourceText.replace(re, replaceList[key]);
      }
      return sourceText;
  }

});
