////Анимация svg колец для элементов 'скилы'

module.exports = () => {

    console.log('skillProgressInit start');

    //обнуление значений
    let skill = document.querySelectorAll('.skill');//получение всех оберток где хранится data-pct
    let svgCircles = document.querySelectorAll('.skill__bar');//получение всех колец
    for(let i=0; i<svgCircles.length; i++){
        svgCircles[i].style.strokeDashoffset = Math.PI*180;//обнуление
    }

    let percent = []; // массив значений взятых из html кода - которые туда были вставлены из админки через php
    let svgCircle; //контейнер для отельного кольца
    let offsetVal = 0;//новый показатель

    document.querySelector('#circleButton').addEventListener('click', () => { // событие когда все анимируется
        for(let i=0; i<skill.length; i++){
            percent[i] = parseInt(skill[i].getAttribute('data-pct'));//берем значение 
            console.log(percent[i]);
            svgCircle = skill[i].getElementsByClassName('skill__bar');//берем отдельное кольцо
            offsetVal = ((100-percent[i])/100)*Math.PI*180;//значение для присвоения кольцу
            svgCircle[0].style.strokeDashoffset = offsetVal;//запихиваем и происходит анимация через transition
        }
    });

    console.log('skillProgressInit done');
    
};