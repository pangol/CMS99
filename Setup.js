class Setup {
  constructor(){
    if (this.obj == null){
      this.obj = {}
      const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadSheet.getSheetByName('설정')
      if(sheet == null){
        throw new SettingException('설정 시트가 존재하지 않습니다')
      }
      const range = sheet.getRange(2,1,1,4)
      const values = range.getValues()

      this.obj.fileEnvironment = {
        templateFolderId : values[0][0],
        templateId :values[0][1],
        sigFolderId : values[0][2],
        outputFolderId : values[0][3],
      }
    }
    return this.obj 
  }
}

class OrgSetup{
  constructor(){
     if (this.obj == null){
      this.obj = {}
      const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadSheet.getSheetByName('단체정보')
      if(sheet == null){
        throw new SettingException('단체정보 시트가 존재하지 않습니다')
      }
      const range = sheet.getRange(2,1,1,4)
      const values = range.getValues()

      this.obj.fileEnvironment = {
        orgName : values[0][0],
        representName :values[0][1],
        officeAddress : values[0][2],
        orgNumber : values[0][3],
      }
    }
    return this.obj 
  }
}

