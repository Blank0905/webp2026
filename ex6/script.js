var ddd=document.getElementById('container');

window.onload = function() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    // 產生 0 到 2 個字元 (Math.random() * 3 會得到 0, 1, 2)
    const count = Math.floor(Math.random() * 3); 
    
    let newChars = "";
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        newChars += alphabet[randomIndex];
    }
    
    // 把新產生的字串加進去 (看你是要蓋掉還是累加，作業要求 onload 時產生)
    ddd.textContent += newChars;
}

window.addEventListener("keyup", function(e){
    console.log(e.key);
    let currentStr = ddd.textContent;
    if (currentStr.length > 0 && e.key === currentStr[0]) {
        
        // 2. 一樣的話把第一個字元消除 (保留索引 1 之後的所有字)
        container.textContent = currentStr.substring(1);
        
        console.log("消掉一個字！剩餘：", container.textContent);
    }
    add_new_char();
});

function add_new_char() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    // 產生 0 到 2 個字元 (Math.random() * 3 會得到 0, 1, 2)
    const count = Math.floor(Math.random() * (4-1)+1); 
    
    let newChars = "";
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        newChars += alphabet[randomIndex];
    }
    
    // 把新產生的字串加進去 (看你是要蓋掉還是累加，作業要求 onload 時產生)
    ddd.textContent += newChars;
};