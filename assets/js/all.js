"use strict";

var url = "https://hexschool.github.io/js-filter-data/data.json";
var productList = document.querySelector('.show-list');
var btnGroup = document.querySelector('.btn-group');
var btnCropsType = document.querySelectorAll('.btn-group a'); //共三顆按鈕要用"querySelectorAll

var inputTxt = document.querySelector('.input-txt');
var inputBtn = document.querySelector('.input-btn');
var resultName = document.querySelector('.result-name');
var selectList = document.querySelector('.select-group');
var tableSortGroup = document.querySelector('.table-title');
var data;
var filterData = []; //---- axios撈取資料 ---- //

function getData() {
  axios.get(url).then(function (response) {
    data = response.data.filter(function (item) {
      return item.作物名稱;
    }); // console.log(data);

    init(); //非同步
  });
} // 預設渲染畫面  初始值


function init() {
  productList.innerHTML = "\n  <tr class=\"table-waiting\">\n    <td colspan=\"7\">\u8ACB\u8F38\u5165\u4E26\u641C\u5C0B\u60F3\u6BD4\u50F9\u7684\u4F5C\u7269\u540D\u7A31^_^</td>\n  </tr>";
  inputBtn.addEventListener('click', searchCrops, false);
  inputTxt.addEventListener('keyup', searchCropsKey, false); //鍵盤搜尋
}

getData(); // 搜尋資料

function searchCrops(e) {
  if (inputTxt.value.trim() !== "") {
    inputBtn.classList.add('btn-active');
  } else {
    return;
  } // 過濾輸入值的空白


  filterData = data.filter(function (item) {
    return item.作物名稱.match(inputTxt.value.trim());
  });
  btnCropsType.forEach(function (item) {
    return item.classList.remove('active');
  });
  resultName.textContent = inputTxt.value.trim();
  inputTxt.value = '';
  inputBtn.classList.remove('btn-active');
  resetSelect();

  if (filterData.length === 0) {
    var content = "<tr class=\"table-waiting\"><td colspan=\"7\">\u67E5\u8A62\u4E0D\u5230\u4EA4\u6613\u8CC7\u8A0A</td></tr>";
    productList.innerHTML = content;
    return;
  }

  ; // update(filterData);
} //鍵盤搜尋事件


function searchCropsKey(e) {
  if (inputTxt.value.trim() == '') {
    return;
  }

  ;
  inputBtn.classList.add('btn-active');

  if (e.key === 'Entre') {
    searchCrops(e);
  }
} // 清空下拉選單


function resetSelect() {
  selectList[0].value = '排序篩選';
  selectList[1].value = '排序';
}
//# sourceMappingURL=all.js.map
