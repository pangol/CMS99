class DocSetup {
  constructor(){
    this.rangeA = {
      startRow: 2,
      numOfRow: 1,
      startCol: 1,
      numOfCol:4
    }
    this.sheetName = '설정'
    this.fields = ['templateFolderId', 'templateId', 'sigFolderId', 'outputFolderId']
    this.errorText = '설정 시트가 존재하지 않습니다'
    this.sheetValues = {}
  }

  setValues(makingNum){
    if(makingNum){
      this.rangeA.startRow = makingNum
    }
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadSheet.getSheetByName(this.sheetName)
    if(sheet == null){
      throw new SettingException(this.errorText)
    }
    const range = sheet.getRange(this.rangeA.startRow, this.rangeA.numOfRow,this.rangeA.startCol,this.rangeA.numOfCol)
    const values = range.getValues()
    
    for(let i= 0; i < values[0].length; i++){
      this.sheetValues[this.fields[i]] = values[0][i]
    }
    this.startRow = makingNum
  }
}

class OrgSetup extends DocSetup{
  constructor(){
    super()
    this.sheetName = '단체정보'
    this.fields = ['orgName', 'representName', 'officeAddress', 'orgNumber']
    this.errorText = '단체정보 시트가 존재하지 않습니다'
  }
}

class PeopleSetup extends DocSetup{
  constructor(){
    super()
    this.sheetName = '후원리스트'
    this.fields = ['name', 'birth', 'bank', 'account', 'email', 'phone', 'date', 'sig']
    this.errorText = '후원리스트 시트가 존재하지 않습니다'
    this.rangeA = {
      startRow: 2,
      numOfRow: 1,
      startCol: 1,
      numOfCol: 8
    }
  }
}

