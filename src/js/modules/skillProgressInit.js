////Анимация svg колец для элементов 'скилы'

module.exports = (container, bar, attr) => {

    console.log('skillProgressInit start');

    let skill = [...document.querySelectorAll('.'+container)];//получение всех оберток где хранится data-pct
    let svgCircles = [...document.querySelectorAll('.'+bar)];//получение всех колец
    let percent = []; // массив значений взятых из html кода - которые туда были вставлены из админки через backend
    let currentCircle; //контейнер для отельного кольца
    let circleButton = document.querySelector('#circleButton')//выбрали кнопку
    //событие, которое присваивает значение кольцам
    let handleClick = () => {
        skill.forEach((item, i) => {
            percent[i] = parseInt(item.getAttribute(attr)); //получили значение процентов и перевели в number
            currentCircle = item.getElementsByClassName(bar); //выбрали кольцо из текущей обертки
            currentCircle[0].style.strokeDashoffset = ((100-percent[i])/100)*Math.PI*180; // присваивание текущему кольцу значения переведенному для спец свойства svg из процентов
        })
    }
    //обнуление значений во всех кольцах
    svgCircles.forEach(i => {
        i.style.strokeDashoffset = Math.PI*180;
    })
    circleButton.addEventListener('click', handleClick);

    console.log('skillProgressInit done');
    
};