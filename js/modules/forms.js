const forms = () => {
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

forms();