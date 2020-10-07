const timer = (id, deadline) => {


    // Функция подставляет 0 неред цифрой от 0 до 9
    const addZero = (num) => {
        if(num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };
    

    // Функция получает deadline и выдает оставшееся время до конца акции
    // Получение оставшегося времени
    const getTimeRemaining = (endTime) => {
        // время в js измеряется в миллисикундах


        // разница между endTime и между текущим временем
        const time = Date.parse(endTime) - Date.parse(new Date());
        // переводим миллисекунды в секунды, берем остаток от деления на 1 мин(60 сек.) и получаем секунды
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor((time / (1000 * 60 * 60 * 24)));


        return {
            'total': time, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    };


    // Функция отвечает за помещение определенных значений в поределенные элементы на странице
    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        
        const timeInterval = setInterval(updateClock, 1000);



        // Фнукция, которая каждую секунду будет устанавливать новое значение
        function updateClock() {
            const time = getTimeRemaining(endTime);


            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);


            // если дедлайн прошёл
            if(time.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";


                clearInterval(timeInterval);
            };
        };
    };

    setClock(id, deadline)
};

let deadline = '2020-10-09';

timer('.container1', deadline);