const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img');
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height');
    const windowType = document.querySelectorAll('#view_type');
    const windowProfile = document.querySelectorAll('.checkbox');


    // Функция по вводу в инпуты только чисел
    const checkNumInputs = (selector) => {
        numInputs = document.querySelectorAll(selector);

        // Делаю так, чтобы в инпуты можно было писать только цифры
        numInputs.forEach(itemNumInputs => {
            // когда пользователь что-то вводит в инпут
            itemNumInputs.addEventListener('input', () => {
                // если пользователь вводит не число, введенный знак заменяется пустым местом
                itemNumInputs.value = itemNumInputs.value.replace(/\D/, '');
            });
        });
    }


    checkNumInputs('#width');
    checkNumInputs('#height');
    
    // Функция по добавлению в state данных с модальных окон
    function bindActionToElem(event, elem, property) {
        elem.forEach((itemElem, i) => {
            itemElem.addEventListener(event, () => {
                switch(itemElem.nodeName) {
                    case 'SPAN':
                        // записываем в property номер изображения
                        state[property] = i;
                        console.log('span');
                        break;
                    
                    case 'INPUT':

                        // checkbox
                        if(itemElem.getAttribute('type') === 'checkbox') {
                            if (i === 0) {
                                state[property] = 'Холодное';
                            } else {
                                state[property] = 'Тёплое';
                            }

                            // делаем так, чтобы пользователь мог выбрать только 1 чекбокс
                            elem.forEach((itemCheckbox, j) => {
                                if(i === j) {
                                    itemCheckbox.checked = true;
                                } else {
                                    itemCheckbox.checked = false;
                                }
                            })
                            console.log('checkbox');
                        } 
                        // input
                        else {
                            state[property] = itemElem.value;
                            console.log('input');
                        }
                        break;
                    
                    case 'SELECT':
                        state[property] = itemElem.value;
                        console.log('select');
                        break;
                }

                console.log(state);
            });
        });
    };

    bindActionToElem('click', windowForm, 'form');
    bindActionToElem('input', windowHeight, 'height');
    bindActionToElem('input', windowWidth, 'width');
    bindActionToElem('change', windowType, 'type');
    bindActionToElem('change', windowProfile, 'profile');
};



// функция по отправке всех собранных данных на сервер
const formsAndFormsChangeModalState = (state) => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const phoneInputs = document.querySelectorAll('input[name="user_phone"]');


    // Делаю так, чтобы в инпуты можно было писать только цифры
    phoneInputs.forEach(itemPhoneInput => {
        // когда пользователь что-то вводит в инпут
        itemPhoneInput.addEventListener('input', () => {
            // если пользователь вводит не число, введенный знак заменяется пустым местом
            itemPhoneInput.value = itemPhoneInput.value.replace(/\D/, '');
        });
    });

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы свяжемся с вами.',
        failure: 'Что-то пошло не так...',
    }
    
    form.forEach(itemForm => {
        itemForm.addEventListener('submit', event => {
            event.preventDefault();


            // добавляем статус на страницу
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            itemForm.appendChild(statusMessage);


            // данные из формы
            const formData = new FormData(itemForm);


            // добавление данных из state
            if(itemForm.getAttribute('data-calc') === "end") {
                for(let key in state) {
                    formData.append(key, state[key])
                }
            }


            // отправка запроса на сервер
            const postData = async (url, data) => {


                // говорим пользователю о загрузке
                document.querySelector('.status').textContent = message.loading;


                let result = await fetch(url, {
                    method: 'POST',
                    body: data
                });

                return await result.text()
            };


            // очистка инпутов
            const clearInputs = () => {
                inputs.forEach(ItemInput => {
                    ItemInput.value = '';
                })
            }


            postData('assets/server.php', formData)
                .then((result) => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();

                    // удаляем statusMessage с течением времени
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000)
                })
        });

    });
};


// создаем объект, в который будут заполняться данные которые выбрал пользователь
let modalState = {};



changeModalState(modalState)
formsAndFormsChangeModalState(modalState);