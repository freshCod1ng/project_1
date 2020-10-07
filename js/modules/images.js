const images = () => {
    
    // модальное окно
    const imgPopup = document.createElement('div');
    // блок с картинками
    const workSection = document.querySelector('.works');
    // сама картинка
    const bigImg = document.createElement('img');


    imgPopup.classList.add('popup_img');
    workSection.appendChild(imgPopup);

    // размещение окна по центру
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImg);


    workSection.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        // target - означает 'если поддерживает клик'
        // если пользователь кликнул в картинку, а не мимо
        if(target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path);

            document.body.style.overflow = "hidden";

            bigImg.style.width = '500px';
            bigImg.style.height = '500px';

        }

        // matches - совпадение
        if(target && target.matches('div.popup_img')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = "";
        }
    })
}

images();