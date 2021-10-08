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
