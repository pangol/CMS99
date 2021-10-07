function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('CMS정기이체')
    .addItem('기본 설정', 'showSidebar')
    .addItem('단체 정보 설정', 'showOrg')
    .addItem('문서만들기', 'showMakeDoc')
    .addToUi();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('ViewSettingPage')
    .evaluate()
    .setTitle('CMS 정기이체 설정하기');
  SpreadsheetApp.getUi().showSidebar(html);
}

function showOrg() {
  var html = HtmlService.createTemplateFromFile('ViewSettingOrg')
    .evaluate()
    .setTitle('단체 정보 설정');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}

function showMakeDoc() {
  var html = HtmlService.createTemplateFromFile('ViewMakeDoc')
    .evaluate()
    .setTitle('문서만들기');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}

