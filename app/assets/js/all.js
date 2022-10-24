const url = "https://hexschool.github.io/js-filter-data/data.json";
const productList = document.querySelector('.show-list');
const btnGroup = document.querySelector('.btn-group');
const btnCropsType = document.querySelectorAll('.btn-group a');  //共三顆按鈕要用"querySelectorAll
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
    // console.log(data);
    init(); //非同步
  });
}

// 預設渲染畫面  初始值
function init(){
  productList.innerHTML = `
  <tr class="table-waiting">
    <td colspan="7">請輸入並搜尋想比價的作物名稱^_^</td>
  </tr>`;

  inputBtn.addEventListener('click', searchCrops, false);
  inputTxt.addEventListener('keyup', searchCropsKey, false );  //鍵盤搜尋
  btnGroup.addEventListener('click', filterCropType, false);   //按鈕分類篩選資料
  tableSortGroup.addEventListener('click', sortTableBytitle, false); //nav上的按鈕功能

}

getData();

// 更新渲染畫面使用
function update(showData) {

  let str = '';
  showData.forEach(function(item){
    let content = `
      <tr>
        <td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
      </tr>
    `;
    str += content;
  });
  productList.innerHTML = str;
}

// 按鈕分類篩選資料
function filterCropType(e){
  e.preventDefault();
  if(e.target.nodeName !== 'A'){
    return;
  };

  btnCropsType.forEach(item =>{
    item.classList.remove('active');
    e.target.classList.add('active');
  });

  let type = e.target.dataset.type;
  filterData = data.filter(item => type === item.種類代碼);

  resultName.textContent = e.target.textContent;
  resetSelect();
  update(filterData);
}

// 搜尋資料
function searchCrops(e){
  if(inputTxt.value.trim() !== ""){
    inputBtn.classList.add('btn-active');
  }else{
    return;
  }

  // 過濾輸入值的空白
  filterData = data.filter(item => item.作物名稱.match(inputTxt.value.trim()));
  btnCropsType.forEach(item => item.classList.remove('active'));

  resultName.textContent = inputTxt.value.trim();
  inputTxt.value = '';
  inputBtn.classList.remove('btn-active');
  resetSelect();

  if(filterData.length === 0){
    let content = `<tr class="table-waiting"><td colspan="7">查詢不到交易資訊</td></tr>`;
    productList.innerHTML = content;
    return;
  };
  update(filterData);
}

//鍵盤搜尋事件
  function searchCropsKey(e){
    if(inputTxt.value.trim() ==''){
      return;
    };
    inputBtn.classList.add('btn-active');
    if(e.key === 'Enter'){
      searchCrops(e);
    };
  }

// select change 下拉選單 
function changeSelect(e){
  filterData.sort(a, b) => a[e]-b[e];
  update(filterData);
}

// 進階篩選 表單內排序
function sortTableBytitle(e){
  if(e.target.nodeName !== 'I'){
    return;
  }else{
    let sortTitle = e.target.dataset.title;
    let sortDirection = e.target.dataset.sort;
    
    if(sortDirection === 'up'){
      filterData.sort((a, b) => b[sortTitle] - a[sortTitle]);
    }else if(sortDirection === 'down'){
      filterData.sort((a, b) => a[sortTitle] - b[sortTitle]);
    };

    selectList.forEach(function(item, index){
      selectList[index].value = `依${sortTitle}排序`;
    });
    update(filterData);
  }
}


// 清空下拉選單
function resetSelect() {
  selectList[0].value = '排序篩選';
  selectList[1].value = '排序';
}
