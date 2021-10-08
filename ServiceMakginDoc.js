// License: MIT 라이센스
// 해당 코드는 서명문서를 만드는 프로세스를 가지고 있습니다

function myFunction(makingNum) {
  try {
    const docObj = new DocSetup()
    const orgObj = new OrgSetup()
    const peopleObj = new PeopleSetup()

    docObj.setValues()
    orgObj.setValues()
    peopleObj.setValues(makingNum)

    // const peopleProperties = getValuesFromSheet(docObj.startRow)
    // const orgProperties = getValuesFromSheet(2, 'org')

    makeDoc(peopleObj.sheetValues, orgObj.sheetValues, docObj.sheetValues)
    return {
      error: false
    }
  } catch (e) {
    return {
      error: true,
      type: e
    }
  }
}

function getValuesFromSheet(startRow) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  let result, rowValues

  const sheet = spreadSheet.getSheetByName('후원리스트')
  const range = sheet.getRange(startRow, 1, 1, 8)
  const values = range.getValues()
  const emptyCheck = values[0].filter(value => value == '')
  
  if(emptyCheck.length > 0){
    throw new SettingException('선택하신 번호에 값들이 존재하지 않습니다')
  }
  rowValues = values[0]
  
  result = convertObj(rowValues)
  return result

}

function makeDoc(peopleProperties, orgProperties, docValues) {
  const sigFolder = DriveApp.getFolderById(docValues.sigFolderId);
  const outputFolder = DriveApp.getFolderById(docValues.outputFolderId);
  const imgSize = 150
  const sigFileNameF = 'CMS정기이체_'

  const copiedTemplateDoc = DriveApp.getFileById(docValues.templateId)
    .makeCopy(sigFileNameF + peopleProperties.name, outputFolder);

  const docId = copiedTemplateDoc.getId();
  const doc = DocumentApp.openById(docId);

  
  const body = doc.getBody();

  convertDateBirthAndDate(peopleProperties)

  let sigImgFileId;
  fileList = sigFolder.getFilesByName(peopleProperties.sig)
  while (fileList.hasNext()) {
    sigImgFileId = fileList.next().getId()
  }

  replaceDoc(body, peopleProperties, orgProperties)

  const sigImg = DriveApp.getFileById(sigImgFileId).getBlob();
  replaceTextToImage(body, '{sig}', sigImg, imgSize)

  doc.saveAndClose()
}

function replaceDoc(body, peopleProperties, orgProperties) {
  body.replaceText('{orgName}', orgProperties.orgName);
  body.replaceText('{representName}', orgProperties.representName);
  body.replaceText('{officeAddress}', orgProperties.officeAddress);
  body.replaceText('{orgNumber}', orgProperties.orgNumber);

  body.replaceText('{name}', peopleProperties.name);
  body.replaceText('{birth}', peopleProperties.birth);
  body.replaceText('{bank}', peopleProperties.bank);
  body.replaceText('{account}', peopleProperties.account);
  body.replaceText('{email}', peopleProperties.email);
  body.replaceText('{phone}', peopleProperties.phone);
  body.replaceText('{date}', peopleProperties.date);
}

function replaceTextToImage(body, searchText, image, width) {
  var next = body.findText(searchText)
  if (!next) return
  var r = next.getElement()
  r.asText().setText("")

  var img = r.getParent().asParagraph().addPositionedImage(image)
  if (width && typeof width == "number") {
    var w = img.getWidth()
    var h = img.getHeight()
    img.setWidth(width)
    img.setHeight(width * h / w)
  }
  return next
}
