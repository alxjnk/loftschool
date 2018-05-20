/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadTowns() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cit11ies.json');
        xhr.send();
        xhr.responseType = 'json';
        
        xhr.addEventListener('error', () => {
            console.log('eroro');
            reject();
        } )
        xhr.addEventListener('load', ()=> {
            if (xhr.status >= 400) {
                console.log('something went wrong');
                reject();
            } else {
                const obj = xhr.response;

                obj.sort((a, b) => {
                    let textA = a.name.toUpperCase();
                    let textB = b.name.toUpperCase();
            
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                loadingBlock.style.display = 'none';
                filterInput.style.display = 'block';
                filterBlock.style.display = 'block';
                resolve(obj);
            } 
        });
    
    });    
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
var loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
var filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
var filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
var filterResult = homeworkContainer.querySelector('#filter-result');

var cities;
let load = () => {
    loadTowns().then( obj => {
        cities = obj;
    }, () => {
        loadingBlock.textContent = 'Не удалось загрузить города ';
        let button = document.createElement('button');

        button.textContent = 'Повторить';
        loadingBlock.appendChild(button);
        button.addEventListener('click', () => {
            load();
        });
    });
};

filterInput.addEventListener('keyup', event => {
    // это обработчик нажатия клавиш в текстовом поле
    filterResult.innerHTML = '';
    if (filterInput.value === '') {
        filterResult.innerHTML = ''; 
    } else {
        for (let town of cities) {
            if (isMatching(town.name, filterInput.value)) {                    
                let li = document.createElement('li');

                li.textContent = town.name;
                filterResult.appendChild(li);

            }

        } 
    }
});

load();

export {
    loadTowns,
    isMatching
};
