function saveSettingValue(settingValues, type) {
  let obj = createSaveObj(type)
  obj.saveSheet(settingValues)
  return {
    'success': 'success',
    'type': 'save'
  }
}

function createSaveObj(type){
  switch(type){
    case 'org':
      return new OrgSaveSheet()
    default :
      return new SaveSheet()
  }
}