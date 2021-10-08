// License: MIT 라이센스
// 해당 코드는 서명문서를 만드는 프로세스를 가지고 있습니다

function myFunction(makingNum) {
  try {
    const envObj = new Setup()
    const objObj = new OrgSetup()
    envObj.startRow = makingNum
    const docProperties = getValuesFromSheet(envObj.startRow, 'env')
    const orgProperties = getValuesFromSheet(2, 'org')
    makeDoc(docProperties, orgProperties, envObj.fileEnvironment)
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

function getValuesFromSheet(startRow, type) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  let result, rowValues

  if(type == 'env'){
    const sheet = spreadSheet.getSheetByName('후원리스트')
    const range = sheet.getRange(startRow, 1, 1, 8)
    const values = range.getValues()
    const emptyCheck = values[0].filter(value => value == '')
    
    if(emptyCheck.length > 0){
      throw new SettingException('선택하신 번호에 값들이 존재하지 않습니다')
    }
    rowValues = values[0]
  }else{
    const sheet = spreadSheet.getSheetByName('단체정보')
    const range = sheet.getRange(startRow, 1, 1, 4)
    const values = range.getValues()
    const emptyCheck = values[0].filter(value => value == '')
    
    if(emptyCheck.length > 0){
      throw new SettingException('단체 정보 값들이 존재하지 않습니다')
    }
    
    rowValues = values[0]
  }
  result = convertObj(rowValues, type)
  return result

}

function makeDoc(docProperties, orgProperties, fileEnvironment) {
  const sigFolder = DriveApp.getFolderById(fileEnvironment.sigFolderId);
  const outputFolder = DriveApp.getFolderById(fileEnvironment.outputFolderId);
  const imgSize = 150
  const sigFileNameF = 'CMS정기이체_'

  const copiedTemplateDoc = DriveApp.getFileById(fileEnvironment.templateId)
    .makeCopy(sigFileNameF + docProperties.name, outputFolder);

  const docId = copiedTemplateDoc.getId();
  const doc = DocumentApp.openById(docId);

  
  const body = doc.getBody();

  convertDateBirthAndDate(docProperties)

  let sigImgFileId;
  fileList = sigFolder.getFilesByName(docProperties.sig)
  while (fileList.hasNext()) {
    sigImgFileId = fileList.next().getId()
  }

  replaceDoc(body, docProperties, orgProperties)

  const sigImg = DriveApp.getFileById(sigImgFileId).getBlob();
  replaceTextToImage(body, '{sig}', sigImg, imgSize)

  doc.saveAndClose()
}

function replaceDoc(body, docProperties, orgProperties) {
  body.replaceText('{orgName}', orgProperties.orgName);
  body.replaceText('{representName}', orgProperties.representName);
  body.replaceText('{officeAddress}', orgProperties.officeAddress);
  body.replaceText('{orgNumber}', orgProperties.orgNumber);

  body.replaceText('{name}', docProperties.name);
  body.replaceText('{birth}', docProperties.birth);
  body.replaceText('{bank}', docProperties.bank);
  body.replaceText('{account}', docProperties.account);
  body.replaceText('{email}', docProperties.email);
  body.replaceText('{phone}', docProperties.phone);
  body.replaceText('{date}', docProperties.date);
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
