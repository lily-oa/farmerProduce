"use strict";

var url = "https://hexschool.github.io/js-filter-data/data.json";
var productList = document.querySelector('.show-list');
var btnGroup = document.querySelector('.btn-group');
var btnCropsType = document.querySelector('.btn-group a');
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
} // 搜尋資料


function searchCrops(e) {
  if (inputTxt.value.trim() !== "") {
    inputBtn.classList.add('btn-active');
  } else {
    return;
  } // 過濾輸入值的空白


  filterData = data.filter(function (item) {
    return item.作物名稱.match(inputTxt.value.trim());
  });
}

getData();
//# sourceMappingURL=all.js.map
