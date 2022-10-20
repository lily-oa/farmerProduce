const url = "https://hexschool.github.io/js-filter-data/data.json";
const productList = document.querySelector('.show-list');

const btnGroup = document.querySelector('.btn-group');
const btnCropsType = document.querySelector('.btn-group a');
const inputTxt = document.querySelector('.input-txt');
const inputBtn = document.querySelector('.input-btn');
const resultName = document.querySelector('.result-name');
const selectList = document.querySelector('.select-group');
const tableSortGroup = document.querySelector('.table-title');

let data;
let filterData = [];

//---- axios撈取資料 ---- //
function getData(){
  axios.get(url)
  .then(function(response){
    data = response.data.filter(item => item.作物名稱);
    console.log(data);
    // init(); //非同步
  });
}

// 預設渲染畫面

getData();