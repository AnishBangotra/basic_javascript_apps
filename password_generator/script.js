const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lenEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerLetters = "abcdefghijklmnopqrstuvwxyz"
const numbers = '0123456789';
const symbol = "!@#$%^&*()_+=";

function getLowercase() {
  return lowerLetters[Math.floor(Math.random()*lowerLetters.length)];
}
function getUppercase() {
  return upperLetters[Math.floor(Math.random()*upperLetters.length)];
}

function getNumber(){
  return numbers[Math.floor(Math.random()*numbers.length)];
}

function getSymbol(){
  return symbol[Math.floor(Math.random()*symbol.length)];
}

function generatePassword() {
  const len = lenEl.value

  let password = '';
  if(upperEl.checked) {
    password += getUppercase()
  }

  if(lowerEl.checked) {
    password += getLowercase()
  }

  if(numberEl.checked) {
    password += getNumber()
  }

  if(symbolsEl.checked) {
    password += getSymbol()
  }
  for(let i=password.length; i<len; i++) {
      const x = generateX();
      password += x;
  }
  pwEl.innerText = password;
}
function generateX() {
  const xs = [];
  if(upperEl.checked) {
    xs.push(getUppercase())
  }

  if(lowerEl.checked) {
    xs.push(getLowercase())
  }

  if(numberEl.checked) {
    xs.push(getNumber())
  }

  if(symbolsEl.checked) {
    xs.push(getSymbol())
  }
  if (xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)];
}
generateEl.addEventListener('click', generatePassword)

copyEl.addEventListener('click',()=> {
    const textarea = document.createElement('textarea');
    const password = pwEl.innerText;
    if(!password) {
      return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});