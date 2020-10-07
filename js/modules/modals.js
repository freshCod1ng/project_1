
    const modals = () => {
        function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

            const trigger = document.querySelectorAll(triggerSelector);
            const modal = document.querySelector(modalSelector);
            const close = document.querySelector(closeSelector);
            // Получение всех модальных окон со страницы
            const windows = document.querySelectorAll('[data-modal]');
            scroll = calcScroll();


            trigger.forEach(item => {
                item.addEventListener('click', (event) => {


                    // если элемент существует
                    if(event.target) {
                        event.preventDefault();
                    };
                    

                    // закрытие всех модальных окон
                    windows.forEach(itemWindow => {
                        itemWindow.style.display = 'none';
                    });


                    modal.style.display = "block";
                    // когда мод. окно открыто - мы можем листать только его
                    document.body.style.overflow = "hidden";
                    // используем классы от бутстрапа
                    // document.body.classList.add('modal-open');

                    // убираем прокрутку справа
                    document.body.style.marginRight = `${scroll}px`;
                });
            });
    
            close.addEventListener('click', () => {


                // при клике на крестик закрываются все модальные окна
                windows.forEach(itemWindow => {
                    itemWindow.style.display = 'none';
                })


                modal.style.display = "none";
                // когда мод. окно открыто - мы можем листать только его
                document.body.style.overflow = '';
                // используем классы от бутстрапа
                // document.body.classList.remove('modal-open');

                document.body.style.marginRight = `0px`;
            })
    
            // при клику вне модального окна
            modal.addEventListener('click', event => {
                // если элемент, на который я кликнул будет равен модальному окну
                if(event.target === modal && closeClickOverlay) {


                    // закрытие всех модальных окон
                    windows.forEach(itemWindow => {
                        itemWindow.style.display = 'none';
                    })


                    modal.style.display = "none";
                    // когда мод. окно открыто - мы можем листать только его
                    document.body.style.overflow = '';
                    // используем классы от бутстрапа
                    // document.body.classList.remove('modal-open');

                    document.body.style.marginRight = `0px`;
                }
            });
        }
    
        

        function showModalbyTime(selector, time) {
            setTimeout(() => {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
            }, time)
        }
    
        function calcScroll() {
            const div = document.createElement('div');

            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'higgen';

            document.body.appendChild(div);

            // offsetWidth - полная ширина, с прокруткой
            // clientWidth - только padding и самый главный контент, который есть внутри, без прокрутки
            
            // вычисление прокрутки
            let scrollWidth = div.offsetWidth - div.clientWidth;

            // удаление элемента со страницы, т. к. он больше не нужен
            div.remove();

            return scrollWidth;
        }

        bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
        bindModal('.phone_link', '.popup', '.popup .popup_close')
        bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
        bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
        bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
        showModalbyTime('.popup', 60000)
    };

    modals();
