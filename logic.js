const numbers = [...document.querySelectorAll(".nums button")].splice(0, 9).concat([...document.querySelectorAll(".nums button")].splice(10, 10));
const prevPara = document.querySelector(".outprev");
const para = document.querySelector(".out");
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const signs = [...document.querySelectorAll(".signs button")].splice(1);
const signValue = signs.map((item) => item.value);
const equal = document.querySelector(".equal");
const opositeSign = document.querySelector(".oposite");
let called = false;
let nums = [];

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (Number.isInteger(+e.key)) {
        numGetter(e.key);
    } else if (e.key == ","){
        numGetter(".");
    } else if (e.key == "Backspace"){
        deletor();
    } else if (e.key == "-" || e.key == "+" || e.key == "/" || e.key == "*"){
        signer(e.key);
    } else if (e.key == "Enter"){
        equaliser();
    }
})

numbers.forEach(item => {
    item.addEventListener("click", () => {
        numGetter(item.value);
    });
});
signs.forEach(item => {
    item.addEventListener("click", () => {
        signer(item.value);
    });
});

clear.addEventListener("click", () => {prevPara.textContent = ""; nums = []; para.textContent = ''});
del.addEventListener('click', () => {
    deletor();
})

opositeSign.addEventListener("click", () => {
    if (para.textContent == '') return;
    para.textContent = -para.textContent; 
})

equal.addEventListener("click", () => {
    equaliser();
})

function equaliser () {
    if (para.textContent == "" || nums.length != 2) return alert("No");
    nums.push(para.textContent);
    count("");
    para.textContent = nums[0];
    prevPara.textContent = "";
    nums = [];
}

function count(sign) {
    called = true;
    if (nums[1] == "/") {
        nums.splice(0, 3, Math.round((+nums[0] / +nums[2]) *100) /100);
    } else if (nums[1] == "*") {
        nums.splice(0, 3, Math.round(+nums[0] * +nums[2] *100) /100);
    } else if (nums[1] == "-") {
        nums.splice(0, 3, Math.round((+nums[0] - +nums[2]) *100) /100);
    } else if (nums[1] == "+") {
        nums.splice(0, 3, Math.round((+nums[0] + +nums[2]) *100) /100);
    }
    prevPara.textContent = nums[0] + sign;
    para.textContent = "";
}

function deletor () {
    let last = para.textContent.split('');
    last.splice(-1);
    para.textContent = last.join('');
}

function signer(signn) {
    if(para.textContent.length > 10 
        || para.textContent == '' 
        || signValue.includes(para.textContent.slice(-1))){return alert("Not Allowed")}
        nums.push(para.textContent);
        if (nums.length == 3) {
            count(signn);
            nums.push(signn);
            return
        }
        nums.push(signn);
        prevPara.textContent =  para.textContent + signn;
        para.textContent =  '';
} 

function numGetter (nnums) {
    if(para.textContent.length >= 10){return alert("No more 10 digits")};
        if(nnums == '.' && para.textContent.split('').includes('.') || nnums == '.' && para.textContent == "") {return alert("Not allowed")}
        if (called) {
            para.textContent = '';
            called = false;}
    para.textContent =  para.textContent + nnums;
}