// 全域變數儲存狀態
var allData = [];      // 原始所有資料
var filteredData = []; // 搜尋後的資料
var currentPage = 1;   // 目前頁碼
const pageSize = 10;   // 每頁顯示 10 筆

var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        allData = JSON.parse(this.responseText);
        filteredData = allData; // 初始狀態下，篩選資料等於所有資料
        renderTable();          // 執行渲染
    }
};

// 核心功能：渲染表格畫面
function renderTable() {
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // 先清空舊資料

    // 計算分頁範圍
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var pageItems = filteredData.slice(startIndex, endIndex);

    // 填入表格
    pageItems.forEach(function (data) {
        var row = tableBody.insertRow(-1);
        row.insertCell(0).innerHTML = data['title'];
        row.insertCell(1).innerHTML = data['showInfo'][0] ? data['showInfo'][0]['location'] : "無資訊";
        row.insertCell(2).innerHTML = data['showInfo'][0] ? data['showInfo'][0]['price'] : "無資訊";
    });

    updatePaginationInfo();
}

// 更新分頁文字與按鈕狀態
function updatePaginationInfo() {
    var totalPages = Math.ceil(filteredData.length / pageSize) || 1;
    document.getElementById("pageDisplay").innerText = `第 ${currentPage} 頁 / 共 ${totalPages} 頁`;
}

// 分頁切換邏輯
function changePage(direction) {
    var totalPages = Math.ceil(filteredData.length / pageSize);
    var nextStep = currentPage + direction;

    if (nextStep >= 1 && nextStep <= totalPages) {
        currentPage = nextStep;
        renderTable();
    }
}

// 搜尋功能：對應 Onchange 事件
function searchData() {
    var keyword = document.getElementById("searchInput").value.toLowerCase();

    // 根據關鍵字過濾名稱
    filteredData = allData.filter(function (item) {
        return item['title'].toLowerCase().includes(keyword);
    });

    currentPage = 1; // 搜尋後回到第一頁
    renderTable();
}