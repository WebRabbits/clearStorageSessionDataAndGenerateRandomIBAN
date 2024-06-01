'use strict';

// const num1 = BigInt(Math.round(Math.random() * 999999999999999999999999));

// const text = '7174981917325157071993589';
// console.log(num1, `-`, String(num1).length);

// // Генерация Turkey IBAN
// let resultIban = '';
// let countryCode = 'TR';

// function randomNUmber(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   const result = Math.round(Math.random() * (max - min) + min);
//   console.log(result);
// }

// randomNUmber(100000000000000000000000, 999999999999999999999999);

// console.log(BigInt(Math.round(Math.random() * 999999999999999999999999)));

//---------------

// let num2 = '';
// for (let i = 0; i < 24; i++) {
//   num2 += BigInt(Math.floor(Math.random() * 10));
// }
// console.log(num2, `-`, num2.length);

// Создаём разметку плагина
const body = document.querySelector('body');
body.insertAdjacentHTML(
  'afterbegin',
  `
<div class="mainBlock">
  <div class="containerBtn">
  <button type="button" class="resetBtn">Clear all storage</button>
  <p class="outText-1">Clear all storage DONE!!!</p>
</div>

<div class="randomIban-block">
<select name="" id="country">
      <option disabled selected="selected">Select country</option>
      <option value="26">TR - Turkey</option>
      <option value="16">BE - Belgium</option>
      <option value="20">AT - Austria</option>
    </select>
    <button type="button" class="copy">Copy</button>
<!--<button class="get-random-iban-btn">Получить IBAN</button>-->
<p class="result-random-iban-block"></p>
</div>
</div>
`
);

// Выбираем данные из HTML-разметки
const bodyElement = document.querySelector('body');
const resetBtn = document.querySelector('.resetBtn');
const selectCountry = document.querySelector('#country');
const btnCopy = document.querySelector('.copy');

// Созадём ивенты
resetBtn.addEventListener('click', handleClearAllStorage);
selectCountry.addEventListener('change', getCountryData);
btnCopy.addEventListener('click', doCopy);

/*-------------------------------------------------------------------------------------------------------*/

function handleClearAllStorage() {
  localStorage.clear(); // Очищаем полностью Locale storage
  sessionStorage.clear(); // Очищаем полностью Session storage

  // Получаем названия ключей из Cache storage и производим удаление всех ключей из полученного массива данных
  caches.keys().then((nameKeys) => {
    nameKeys.forEach((elem) => {
      console.log(elem);
      caches.delete(elem);
    });
  });

  // Вызываем функцию показа сообщения об успешности очистки памяти
  notificationDone();
}

// Добавляем нотифкацию об очистке
function notificationDone() {
  const outTextP = document.querySelector('.outText-1');
  outTextP.classList.add('on_outText-1');
  if (outTextP.classList.contains('on_outText-1')) {
    setTimeout(() => outTextP.classList.remove('on_outText-1'), 1500);
  }
  rebutPage();
}

// Перезагружаем страницу с сбросам данных памяти
function rebutPage() {
  setTimeout(() => location.reload(true), 1600);
}

/*-------------------------------------------------------------------------------------------------------*/

//// Функционал выбора селектора
function getCountryData() {
  let countryIBANName = this.options[this.selectedIndex].text.slice(0, 2);
  let countryIBANCount = this.options[this.selectedIndex].value;
  // console.log(countryIBANName, countryIBANCount);
  generateIban(countryIBANName, countryIBANCount);
}

// Автоматически генерируем IBAN в зависимости от выбраранного значения в селекторе
function generateIban(countryCode, lenghtSymbol) {
  console.log(countryCode);
  // console.log(lenghtSymbol);
  let resRandomNumber = '';
  for (let i = 0; i < lenghtSymbol - countryCode.length; i++) {
    resRandomNumber += BigInt(Math.floor(Math.random() * 10));
  }

  const characters = countryCode + resRandomNumber;
  viewGenerateIban(lenghtSymbol, characters);
}

// Отображаем результат сгенерированного значения IBAN на странице
function viewGenerateIban(lenghtSymbol, characters) {
  const resCharacters =
    characters.length < lenghtSymbol || characters.length > lenghtSymbol
      ? false
      : (document.querySelector('.result-random-iban-block').innerHTML =
          characters);

  return resCharacters;
}

//// Функционал кнокпки копирования полученных данных из селектора IBAN
// Копируем значением IBAN в буфер обмена
function doCopy(event) {
  const resultIban = document.querySelector(
    '.result-random-iban-block'
  ).innerHTML;
  navigator.clipboard
    .writeText(resultIban)
    .then((copyText) => {
      if (copyText === undefined) {
        if (event.type == 'click') {
          event.target.textContent = 'Copied';
          setTimeout(() => {
            event.target.textContent = 'Copy';
          }, 1000);
        }
        // alert(`text "${resultIban}" copied is DONE!!!`);
      } else {
        throw new Error('Error! This text result IBAN not copied!');
      }
    })
    .catch((error) => error);
}

// navigator.clipboard
//   .writeText(`This copied text!!! bla-bla-bla`)
//   .then(() => {
//     console.log(`Text copied!`);
//   })
//   .catch((error) => {
//     console.log(`Error>>> ${error}`);
//   });

// const countryDataArr = new Array();
// for (const iso2 of selectCountry) {
//   // console.log(iso2.value, iso2.label);
//   if (iso2.label) {
//     countryDataArr.push([iso2.label, iso2.value]);
//   }
// }
// console.log(countryDataArr);

// console.log(
//   this.options[this.selectedIndex].text,
//   this.options[this.selectedIndex].value
// );

// let col = 3;
// let resu = '';
// for (let q = 0; q < col; q++) {
//   for (let w = 0; w < 4; w++) {
//     resu += Math.floor(Math.random() * 2);
//   }
// }
// console.log(resu);

// var numReserve = [];
// while (numReserve.length < 12) {
//   var randomNumber = Math.ceil(Math.random() * 1000);
//   var found = false;
//   for (var i = 0; i < numReserve.length; i++) {
//     if (numReserve[i] === randomNumber) {
//       found = true;
//       break;
//     }
//   }
//   if (!found) {
//     numReserve[numReserve.length] = randomNumber;
//   }
// }

// console.log(numReserve);