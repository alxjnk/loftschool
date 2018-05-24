
/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = () => {
    return document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        if (filterNameInput.value !== '') {
            name = (name.toLowerCase().includes(filterNameInput.value.toLowerCase())) ? name : '';
            value = (name.toLowerCase().includes(filterNameInput.value.toLowerCase())) ? value : '';
        }
        if (name !== '' || value !== '') {
            prev[name] = value;
        }
    
        return prev;
    }, {}); 
};

function renderCookies(cookies) {
    listTable.innerHTML = '';
    for (let key of Object.keys(cookies)) {
        if (!key) return;
        let tr = document.createElement('tr'),
            tdName = document.createElement('td'),
            tdValue = document.createElement('td'),
            tdDelete = document.createElement('td'),
            button = document.createElement('button');
    
        tdName.textContent = key;
        tdValue.textContent = cookies[key];

        tdDelete.appendChild(button);
        tr.appendChild(tdName);
        tr.appendChild(tdValue);
        tr.appendChild(tdDelete);

        listTable.appendChild(tr); 
    }

}

function deleteCookies(cookies, name) {
    let date = new Date(0);
    
    document.cookie = `${name}=${cookies[name]}; expires=${date}`;
}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie    
    renderCookies(cookies());
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (Object.keys(cookies()).includes(addNameInput.value)) {
        deleteCookies(cookies(), addNameInput.value); 
    }
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    addNameInput.value = '';
    addValueInput.value = '';
    renderCookies(cookies());
});

listTable.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    let tr = e.target.closest('tr'),
        name = tr.childNodes[0].innerHTML;

    deleteCookies(cookies(), name);
    listTable.removeChild(tr);
    renderCookies(cookies());
});

renderCookies(cookies());