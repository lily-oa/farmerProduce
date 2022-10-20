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
    });
    console.log(data); // init(); //非同步
  });
} // 預設渲染畫面


getData();
//# sourceMappingURL=all.js.map
