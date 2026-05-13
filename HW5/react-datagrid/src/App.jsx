import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Container, Typography } from '@mui/material';

// 定義欄位 (對應原本 table 的 th)
const columns = [
  { field: 'title', headerName: '名稱', width: 300 },
  { field: 'location', headerName: '地點', width: 400 },
  { field: 'price', headerName: '票價', width: 200 },
];

function App() {
  const [allData, setAllData] = useState([]); // 存儲原始所有資料
  const [searchText, setSearchText] = useState(""); // 搜尋關鍵字

  // 使用 useEffect 呼叫 API 並更新狀態 [cite: 2067, 2068]
  useEffect(() => {
    const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    
    fetch(openUrl)
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((item, index) => ({
          id: index, 
          title: item.title,
          location: item.showInfo[0]?.location || "無資訊",
          price: item.showInfo[0]?.price || "無資訊"
        }));
        setAllData(formattedData);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []); // 空陣列代表只在組件掛載時執行一次 [cite: 1756, 1760]

  //搜尋過濾邏輯
  const filteredRows = allData.filter((row) =>
    row.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        景點觀光資訊
      </Typography>

      {/* 搜尋框 */}
      <TextField
        label="搜尋景點名稱"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* 使用 DataGrid 呈現資料 [cite: 2066] */}
      <div style={{ height: 631, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </div>
    </Container>
  );
}

export default App;