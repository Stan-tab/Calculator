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

console.log(numbers)

numbers.forEach(item => {
    item.addEventListener("click", () => {
        if(para.textContent.length >= 10){return alert("No more 10 digits")};
        if(item.value == '.' && para.textContent.split('').includes('.') || item.value == '.' && para.textContent == "") {return alert("Not allowed")}
        if (called) {
            para.textContent = '';
            called = false;}
    para.textContent =  para.textContent + item.value});
});
signs.forEach(item => {
    item.addEventListener("click", () => {if(para.textContent.length > 10 
        || para.textContent == '' 
        || signValue.includes(para.textContent.slice(-1))){return alert("Not Allowed")}
        nums.push(para.textContent);
        if (nums.length == 3) {
            count(item.value);
            nums.push(item.value);
            return
        }
        nums.push(item.value);
        prevPara.textContent =  para.textContent + item.value;
        para.textContent =  '';
    });
});

clear.addEventListener("click", () => {prevPara.textContent = ""; nums = []; para.textContent = ''});
del.addEventListener('click', () => {
    let last = para.textContent.split('');
    last.splice(-1);
    para.textContent = last.join('');
})

opositeSign.addEventListener("click", () => {
    if (para.textContent == '') return;
    para.textContent = -para.textContent; 
})

equal.addEventListener("click", () => {
    if (para.textContent == "" || nums.length != 2) return alert("No");
    nums.push(para.textContent);
    count("");
    para.textContent = nums[0];
    prevPara.textContent = "";
    nums = [];
})

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