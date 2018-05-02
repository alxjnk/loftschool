/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;
}
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let previousValue,
        counter;

    if (initial) {
        previousValue = initial;
        counter = 0;
    } else {
        previousValue = array[0];
        counter = 1;
    }

    for (let i = counter; i< array.length; i++) {
        previousValue = fn(previousValue, array[i], i, array);
    }

    return previousValue; 
} 

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let result = [];

    for (var prop in obj) {
        result.push(prop.toUpperCase());
    }
    
    return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let result = [];

    to = (to < 0) ? array.length + to: to;
    from = (from < 0) ? array.length + from: from;

    for (let i=from; i<to; i++) {
        if (typeof array[i] != 'undefined') {
            result.push(array[i]);
        }
    }    
    
    return result;
}
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = Math.pow(value, 2);
            
            return target[prop];
        }
    });

    return proxy;   
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
