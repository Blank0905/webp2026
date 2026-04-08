var count = 1;

function addfunction() {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = `CLICK ME (${count})`;
    btn.setAttribute("id", "btn" + count);
    btn.setAttribute("class", "btn btn-outline-danger");
    count++;
    document.body.appendChild(btn);
};

function delfunction(){
    if(count > 1) {
        var btn = document.getElementById("btn" + --count);
        document.body.removeChild(btn);
    }
    else{
        alert("要變FOOD了")
    }
    
};