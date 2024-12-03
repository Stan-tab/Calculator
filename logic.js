const numbers = [...document.querySelectorAll(".nums button")];
const para = document.querySelector(".out");
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const signs = [...document.querySelectorAll(".signs button")];
const signValue = signs.map((item) => item.value);

numbers.forEach(item => {
    item.addEventListener("click", () => {if(para.textContent.length >= 10){return alert("No more 10 digits")} 
    para.textContent =  para.textContent + item.value});
});
signs.forEach(item => {
    item.addEventListener("click", () => {if(para.textContent.length >= 10 
        || para.textContent == '' 
        || signValue.includes(para.textContent.slice(-1))){return alert("Not Allowed")}
    para.textContent =  para.textContent + item.value;});
});

clear.addEventListener("click", () => para.textContent = '');
del.addEventListener('click', () => {
    let last = para.textContent.split('');
    last.splice(-1);
    para.textContent = last.join('')
})