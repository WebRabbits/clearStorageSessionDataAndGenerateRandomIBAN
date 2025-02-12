'use strict';

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
<div class="randomPhone-block" title="Click on phone number to copy">
  <select name id="randomPhone">
    <option disabled selected="selected">Select phone</option>
    <option value=11>Russia +7</option>
    <option value=11>Belgium +32</option>
    <option value=12>Brazil +55</option>
    <option value=12>Turkey +90</option>
  </select>
<p class="result-random-phone-block"></p>
</div>
</div>
`
);

// Выбираем данные из HTML-разметки
const bodyElement = document.querySelector('body');
const resetBtn = document.querySelector('.resetBtn');
const selectCountry = document.querySelector('#country');
const selectPhone = document.querySelector('#randomPhone');
const resultBlockPhone = document.querySelector('.result-random-phone-block');
const btnCopy = document.querySelector('.copy');

// Созадём ивенты
resetBtn.addEventListener('click', handleClearAllStorage);
selectCountry.addEventListener('change', getCountryData);
btnCopy.addEventListener('click', doCopy);

selectPhone.addEventListener('change', getPhoneData);
resultBlockPhone.addEventListener('click', copyPhone);

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
  generateIban(countryIBANName, countryIBANCount);
}

// Автоматически генерируем IBAN в зависимости от выбраранного значения в селекторе
function generateIban(countryCode, lenghtSymbol) {
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
      } else {
        throw new Error('Error! This text result IBAN not copied!');
      }
    })
    .catch((error) => error);
}

//Функция выбора значения из селектора
function getPhoneData() {
  const phoneCode = this.options[this.selectedIndex].text
    .split(' ')[1]
    .toString();

  const phoneValue = this.options[this.selectedIndex].value;
  generateRandomPhone(phoneCode, phoneValue);
}

//Функция генерирования случаного номера телефона согласно в формате выбранной страны
function generateRandomPhone(phoneCode, lengthPhone) {
  let phoneNumber = String();

  for (let i = 0; i < lengthPhone - phoneCode.length + 1; i++) {
    phoneNumber += BigInt(Math.floor(Math.random() * 10));
  }

  if (
    phoneNumber.length < lengthPhone - phoneCode.length + 1 ||
    phoneNumber.length > lengthPhone - phoneCode.length + 1
  ) {
    throw new Error(
      'Error>>> Something went wrong. The length of the phone number value is not calculated correctly.'
    );
  } else {
    document.querySelector(
      '.result-random-phone-block'
    ).innerHTML = `${phoneCode} ${phoneNumber}`;
  }
}

//Функция копирования значения ТОЛЬКО номера телефона (без кода страны) при клике по строке с значением. Копируем в буфер обмена.
function copyPhone() {
  const valNumberPhone = resultBlockPhone.innerText
    .slice(
      resultBlockPhone.innerText.indexOf(' '),
      resultBlockPhone.innerText.length
    )
    .trimStart();

  navigator.clipboard
    .writeText(valNumberPhone)
    .then((isCopy) => {
      if (isCopy === undefined) {
        window.getSelection().selectAllChildren(resultBlockPhone);
      }
    })
    .catch(() => {
      throw new Error(`Error>>> Something went wrong. Copying failed.`);
    });
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/

// function thisPage() {
//   const page = window.location.hostname;
//   console.log(page);
// }

// thisPage();

// const thisPage = window.location.hostname;

// async function getUserData() {
//   const response = await fetch(
//     'https://test-devcasino.egamings.com/api/v1/userInfo'
//   );
//   const data = await response.json();
//   console.log(data);
// }

// getUserData().then(console.log);

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
