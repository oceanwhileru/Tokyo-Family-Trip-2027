import assert from 'node:assert/strict';
import {test} from 'node:test';
import {cleanExpense,sheetExpenses,rowBatch} from './shared-expenses.mjs';

const names=['Judy','Jennifer','Vito','Amy'];
const end=['狀態','人數',...names.map(name=>name+' 分攤')];
const reference={
  startRow:3,
  rowData:[
    {values:['日期','費用項目','代墊人','幣別','代墊金額',...names,'備註',...end].map(value=>({userEnteredValue:{stringValue:value}}))},
    {values:[...Array.from({length:10},()=>({})),...end.map(()=>({userEnteredValue:{formulaValue:'=A5'}}))]}
  ]
};
reference.rowData[1].values[5].dataValidation={condition:{type:'ONE_OF_LIST',values:[{userEnteredValue:'分攤'}]}};
const expense={id:'test-expense',name:'餐費',amount:5000,currency:'TWD',payer:'Judy',people:['Judy','Amy'],date:''};
const notFound=()=>Object.assign(new Error('Not found'),{response:{status:404}});

test('shared expense preserves chosen currency and participants, and allows older entries with no date', () => {
  const now=Date.parse('2026-11-28T10:00:00Z');
  assert.deepEqual(cleanExpense(expense,now),expense);
  assert.equal(cleanExpense({...expense,people:['Amy','Amy']},now),null);
  assert.equal(cleanExpense({...expense,currency:'USD'},now),null);
  assert.equal(cleanExpense({...expense,date:'2026-02-31'},now),null);
  assert.equal(cleanExpense({...expense,date:'2026-11-29'},now),null);
  const batch=rowBatch(6,reference,{...expense,name:'=SUM(E5:E9)'},42,'test');
  assert.equal(batch[1].insertDimension.range.startIndex,5);
  assert.deepEqual(batch[4].copyPaste.source,{sheetId:6,startRowIndex:4,endRowIndex:5,startColumnIndex:10,endColumnIndex:16});
  const cells=batch[5].updateCells.rows[0].values;
  assert.deepEqual(cells[0],{});
  assert.deepEqual(cells[1],{userEnteredValue:{stringValue:'=SUM(E5:E9)'}});
  assert.equal(cells[3].userEnteredValue.stringValue,'TWD');
  assert.equal(cells[4].userEnteredValue.numberValue,5000);
  assert.deepEqual(cells.slice(5,9).map(cell=>cell.userEnteredValue?.stringValue),['分攤',undefined,undefined,'分攤']);
});

test('a repeated or uncertain request creates a single sheet row', async () => {
  const written=new Map();
  let count=0;
  const request=async (url,payload)=>{
    if(url.includes('developerMetadata/')){
      const number=Number(url.split('/').at(-1));
      if(written.has(number))return written.get(number);
      throw notFound();
    }
    if(payload){
      const marker=payload.requests[0].createDeveloperMetadata.developerMetadata;
      if(written.has(marker.metadataId))throw Error('Already exists');
      written.set(marker.metadataId,marker);
      count++;
      throw Error('Response was lost after committing');
    }
    const fields=new URL(url).searchParams.get('fields');
    assert.equal([...fields].filter(value=>value==='(').length,[...fields].filter(value=>value===')').length);
    return {sheets:[{properties:{title:'代墊明細',sheetId:42},data:[reference]}]};
  };
  const sync=sheetExpenses({spreadsheetId:'test-sheet',sheetId:'42',request});
  await sync.check();
  await Promise.all([sync.add('judy',expense),sync.add('judy',expense)]);
  assert.deepEqual(await sync.add('judy',expense),{added:false});
  assert.equal(count,1);
});
