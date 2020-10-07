    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
        const header = document.querySelector(headerSelector);
        const tab = document.querySelectorAll(tabSelector);
        const content = document.querySelectorAll(contentSelector);


        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });

            tab.forEach(item => {
                item.classList.remove(activeClass);
            })
        }

        function showTabContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        }

        hideTabContent();
        showTabContent();

        // header - блок, который объединяет все табы
        header.addEventListener('click', event => {
            // єлемент, куда кликнул полбьзователь
            const target = event.target;
            // проверяем содержит ли место нашего клика класс в TabSerlector 
            // и убираем точку у класса
            // УЗНАЕМ ПОПАЛИ ЛИ МЫ В ТАБ
            if (target && (target.classList.contains(tabSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                // ПЕРЕБИРАЕМ ТАБЫ
                tab.forEach((item, i) => {
                    if(target === item || target.parentNode === item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            }
        })
    };

    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
