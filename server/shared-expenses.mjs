import {createHash} from 'node:crypto';
import {validId} from './ledger-entry.mjs';

const members = ['Judy', 'Jennifer', 'Vito', 'Amy'];
const columns = ['日期', '費用項目', '代墊人', '幣別', '代墊金額', ...members, '備註',
  '狀態', '人數', ...members.map(name => name + ' 分攤')];
const tab = '代墊明細';
const metadataKey = 'tokyo-trip-expense-id';
const base = 'https://sheets.googleapis.com/v4/spreadsheets/';

export function cleanExpense(row, now) {
  if (!row || typeof row !== 'object') return null;
  const {id, name, amount, currency, payer, people, date = ''} = row;
  if (!validId(id) || typeof name !== 'string' || !name.trim() || name.length > 100 ||
      !Number.isInteger(amount) || amount < 1 || amount > 99999999 ||
      !['JPY','TWD'].includes(currency) || !members.includes(payer) ||
      !Array.isArray(people) || people.length < 1 || people.length > members.length ||
      new Set(people).size !== people.length || people.some(person=>!members.includes(person))) return null;
  if (date !== '') {
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    const time = Date.parse(date);
    const today = new Date(now+8*3600000).toISOString().slice(0,10);
    if (!Number.isFinite(time) || new Date(time).toISOString().slice(0,10)!==date || date>today) return null;
  }
  return {id, name:name.trim(), amount, currency, payer, people, date};
}

const string = value => ({userEnteredValue:{stringValue:value}});
const number = value => ({userEnteredValue:{numberValue:value}});
const flag = (cell, checked) => {
  if (!checked) return {};
  const condition = cell.dataValidation?.condition;
  if (condition?.type === 'BOOLEAN' && !condition.values?.length) return {userEnteredValue:{boolValue:true}};
  if (condition && (condition.type !== 'ONE_OF_LIST' || !condition.values?.some(option=>option.userEnteredValue==='分攤'))) {
    throw new Error('Unsupported split member validation');
  }
  return string('分攤');
};

function validateLayout(layout) {
  const [header, exemplar] = (layout.rowData??[]).map(row=>row.values);
  if (!header || !exemplar || layout.startRow !== 3 || (layout.startColumn ?? 0)!==0 ||
      !columns.every((column,index)=>header[index]?.userEnteredValue?.stringValue===column) ||
      !exemplar.slice(10,16).every(cell=>cell.userEnteredValue?.formulaValue) || exemplar.length < 16) {
    throw new Error('Shared sheet layout changed');
  }
  return exemplar;
}

export function rowBatch(sheetId, layout, expense, metadataId, digest) {
  const exemplar = validateLayout(layout);
  const sourceIndex = layout.startRow+1;
  const rowIndex = sourceIndex+1;
  const grid = (startRowIndex, startColumnIndex, endColumnIndex) =>
    ({sheetId, startRowIndex, endRowIndex:startRowIndex+1, startColumnIndex, endColumnIndex});
  const copy = (start, end, pasteType) => ({copyPaste:{
    source:grid(sourceIndex,start,end), destination:grid(rowIndex,start,end), pasteType
  }});
  const values = [
    expense.date ? number(Date.parse(expense.date)/86400000+25569) : {},
    string(expense.name), string(expense.payer), string(expense.currency), number(expense.amount),
    ...members.map((member,index)=>flag(exemplar[5+index]??{},expense.people.includes(member))), {}
  ];
  return [
    {createDeveloperMetadata:{developerMetadata:{
      metadataId, metadataKey, metadataValue:digest, visibility:'PROJECT', location:{spreadsheet:true}
    }}},
    {insertDimension:{
      range:{sheetId, dimension:'ROWS',startIndex:rowIndex,endIndex:rowIndex+1},inheritFromBefore:true
    }},
    copy(0,16,'PASTE_FORMAT'),
    copy(0,10,'PASTE_DATA_VALIDATION'),
    copy(10,16,'PASTE_FORMULA'),
    {updateCells:{range:grid(rowIndex,0,10),rows:[{values}],fields:'userEnteredValue'}}
  ];
}

export function sheetExpenses({spreadsheetId,sheetId,request}) {
  if (!/^[A-Za-z0-9_-]+$/.test(spreadsheetId) || !/^\d+$/.test(sheetId)) throw new Error('Invalid expense sheet configuration');
  const path=base+spreadsheetId;
  const gridFields='sheets(properties(sheetId,title),data(startRow,startColumn,rowData(values(userEnteredValue,dataValidation(condition)))))';
  const params=new URLSearchParams({ranges:"'"+tab+"'!A4:P5",fields:gridFields});
  async function layout() {
    const result=await request(path+'?'+params);
    const match=result.sheets?.find(sheet=>sheet.properties?.sheetId===Number(sheetId) && sheet.properties.title===tab);
    if (!match?.data?.length) throw new Error('Shared expense tab unavailable');
    const resultLayout=match.data[0];
    validateLayout(resultLayout);
    return resultLayout;
  }
  async function marker(id) {
    try { return await request(path+'/developerMetadata/'+id); }
    catch (error) { if (error.response?.status!==404) throw error; return null; }
  }
  const matches=(value,digest)=>value?.metadataKey===metadataKey && value.metadataValue===digest;

  return {
    check: layout,
    async add(sub,expense) {
      const digest=createHash('sha256').update(sub+':'+expense.id).digest('hex');
      for(let attempt=0;attempt<4;attempt++){
        const key=createHash('sha256').update(digest+':'+attempt).digest().readUInt32BE(0)>>>1;
        const id=key||1;
        const existing=await marker(id);
        if(matches(existing,digest))return {added:false};
        if(existing)continue;
        const requests=rowBatch(Number(sheetId),await layout(),expense,id,digest);
        try{
          await request(path+':batchUpdate',{requests});
          return {added:true};
        }catch(error){
          const after=await marker(id).catch(()=>null);
          if(matches(after,digest))return {added:false};
          if(!after)throw error;
        }
      }
      throw new Error('Unable to allocate expense marker');
    }
  };
}
