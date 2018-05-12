/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

const w = document.documentElement.clientWidth;

const h = document.documentElement.clientHeight;

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let newDiv = document.createElement('div'); 

    newDiv.className = 'draggable-div';
    newDiv.style.backgroundColor = '#' + Math.random().toString(16).slice(-3);
    newDiv.style.height = Math.random() * h / 2 + 'px';
    newDiv.style.width = Math.random() * w / 2 + 'px';
    newDiv.style.position = 'absolute';
    newDiv.style.top = Math.random() * h / 2 + 'px';
    newDiv.style.left = Math.random() * w / 2 + 'px';     

    return newDiv;
}

function getCoords(elem) { 
    var box = elem.getBoundingClientRect();
  
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
  
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', (e) => {
        console.log(e);
        
        target.ondragstart = function() {
            return false;
        };

        let targetCoords = getCoords(target);
        let shiftX = e.pageX - targetCoords.left;
        let shiftY = e.pageY - targetCoords.top;

        function moveAt(e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
            target.style.zIndex = 1000;
            
        }

        document.onmousemove = function(e) { 
            moveAt(e);
        };

        target.onmouseup = () => {
            document.onmousemove = null;
            target.onmouseup = null;
            target.style.zIndex = 1;
            
        };
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
