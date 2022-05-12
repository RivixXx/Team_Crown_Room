// бургер меню =================================================================

const burgerMenu = document.querySelector('.burger__menu');
const menuBody = document.querySelector('.header__nav');
if (burgerMenu) {
    burgerMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        burgerMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

try {

    // Слайдер swiper ============================================================

    const swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            sensitivity: 1,
        },
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        freemode: true,
        speed: 1000,
    });

    // скролл до якоря ==================================================================

    const menuLimks = document.querySelectorAll('.navigation__link[data-goto]');
    if(menuLimks.length > 0) {
        menuLimks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick); 
        });
        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                if(burgerMenu.classList.contains('_active')) {
                    document.body.classList.toggle('_lock');
                    burgerMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            };
        };
    };

    // Анимация полета в корзину на jQuery============================================================

    $(document).ready(function(){
        let count = 0;

        $(".card-btn").on("click", function () {
            let card = $(".card__nav");
            let imgToDrag = $(this)
            .parent(".cardsProduct__card-button")
            .parent(".cardsProduct__card-content")
            .parent(".cardsProduct__card")
            .find("img")
            .eq(0);
                if (imgToDrag) {
                    var imgClone = imgToDrag
                        .clone()
                        .offset({
                            top: imgToDrag.offset().top,
                            left: imgToDrag.offset().left,
                        })
                        .css({
                            opacity: "0.8",
                            position: "absolute",
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                            "z-index": "100"
                        })
                        .appendTo($("body"))
                        .animate(
                            {
                                top: card.offset().top + 10,
                                left: card.offset().left + 20,
                                width: 30,
                                height: 30,
                            },
                            500,
                        );

                    setTimeout(function () {
                        count++;
                        $(".item-count").text(count);
                    }, 1000);
                    
                    imgClone.animate(
                        {
                            width: 0,
                            height: 0
                        }
                    );
                };
        });
    });

    // pop up ================================================

    const openPopUp = document.getElementById('open__popup');
    const closePopUp = document.getElementById('close__popup');
    const popUp = document.getElementById('full__popup');
    const bodyPopUp = document.getElementById('body__popup');

    openPopUp.addEventListener('click', function(e) {
        e.preventDefault();
        popUp.classList.add('openPopUp');
            if (popUp.classList.contains('openPopUp')) {
                bodyPopUp.classList.add('ToScale')
            }
    })

    closePopUp.addEventListener('click', () => {
        popUp.classList.remove('openPopUp');
        bodyPopUp.classList.remove('ToScale')
    })

    // Получение данных из API ===========================================================

    const ApiUrl = "https://reqres.in/api/users?per_page=12";

    async function getUsersData() {
        let response = await fetch(ApiUrl);
        let content = await response.json();
        content = content.data;

        let contentBox = document.querySelector('.feedback__card');

        let key;

        for (key in content) {
            contentBox.innerHTML += `
                <div class="feedback__card-content">
                    <h3 class="feedback__card-name">${content[key].first_name}</h3>
                    <p class="feedback__card-email">${content[key].email}</p>
                    <div class="feedback__card-img">
                        <img src="${content[key].avatar}" alt="Фото активного покупателя" title="Фото активного пользователя" class="member-photo">
                    </div>
                </div>
            `
        }
    }

    getUsersData();

    
} catch (err) {

    // Валидация формы ====================================================================

    let form = document.querySelector('.form__box');
    let formInputs = document.querySelectorAll('.js__input');
    let inputEmail = document.querySelector('.js__input-email');
    let inputCheckbox = document.querySelector('.js__input-checkbox');
    let notValidateName = document.querySelector('.notValidateName');
    let notValidateEmail = document.querySelector('.notValidateEmail');
    let notValidateCheckbox = document.querySelector('.sex-agreement');

    function validateEmail (email) {
        let regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regular.test(String(email).toLowerCase());
    }

    function validateCountry (country) {
        let regular = new RegExp('.co$');
        return regular.test(String(country).toLowerCase());
    }

    form.onsubmit = function () {
        let emailVal = inputEmail.value;
        let emptyInputs = Array.from(formInputs).filter(input => input.value === '');
        
        formInputs.forEach(function (input) {
            if (input.value === '') {
                input.classList.add('error');
                notValidateName.classList.add('error');
                notValidateEmail.classList.add('error');
            } else {
                input.classList.remove('error');
                notValidateName.classList.remove('error');
                notValidateEmail.classList.remove('error');
            }
        });

        if (emptyInputs.length !== 0) {
            console.log('тут нет');
            return false;
        }

        if (!validateEmail(emailVal)) {
            console.log('тут нет email');
            inputEmail.classList.add('error');
            notValidateEmail.classList.add('errorType2');
            return false;
        } else {
            inputEmail.classList.remove('error');
            notValidateEmail.classList.remove('errorType2');
        }

        if (validateCountry(emailVal)) {
            console.log('тут нет email country');
            inputEmail.classList.add('error');
            return false;
        } else {
            inputEmail.classList.remove('error');
        }

        if (!inputCheckbox.checked) {
            console.log('тут нет чекбокса');
            inputCheckbox.classList.add('error');
            notValidateCheckbox.classList.add('error');
            return false;
        } else {
            inputCheckbox.classList.remove('error');
            notValidateCheckbox.classList.remove('error');
        }

    }

    // Конвертор байты в нормальный размер ================================================

    function bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (!bytes) {
            return '0 Byte';
        }
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    };

    // Плагин загрузки изображений ============================================================

    const elementBox = (tag, classes = [], content) => {
        const node = document.createElement(tag);

        if (classes.length) {
            node.classList.add(...classes)
        }

        if (content) {
            node.textContent = content;
        }

        return node
    }

    function upload(selector, options = {}) {
        let files = [];
        const input = document.querySelector(selector);

        const preview = elementBox('div', ['preview']);
        const open = elementBox('button', ['download__btn'], 'открыть изображение');
        const upload = elementBox('button', ['download__btn', 'primary'], 'загрузить изображение');
        upload.style.display = 'none';

            if (options.multi) {
                input.setAttribute('multiple', true);
            };
            if (options.accept && Array.isArray(options.accept)) {
                input.setAttribute('accept', options.accept.join(','))
            };

        input.insertAdjacentElement('afterend', preview);
        input.insertAdjacentElement('afterend', upload);
        input.insertAdjacentElement('afterend', open);

        const trigerInput = () => input.click();
        const changeHandler = event => {
            if (!event.target.files.length) {
                return;
            };

        files = Array.from(event.target.files);
            preview.innerHTML = '';
            upload.style.display = 'inline';

            files.forEach(file => {
                if (!file.type.match('image')) {
                    return;
                }
                const reader = new FileReader();

                reader.onload = ev => {
                    const src = ev.target.result;
                    preview.insertAdjacentHTML('afterbegin', `
                        <div class="preview-image">
                        <div class="preview-remove" data-name="${file.name}">&times</div>
                            <img src="${src}" alt="${file.name}"/>
                            <div class="preview-info">
                                <span>${file.name}</span>
                                ${bytesToSize(file.size)}
                            </div>
                        </div>
                    `)
                }
                reader.readAsDataURL(file)
            });
        } 

        const removeHandler = event => {
            if (!event.target.dataset.name) {
                return;
            }
            const {name} = event.target.dataset;
            files = files.filter(file => file.name !== name);

            if (!files.length) {
                upload.style.display = 'none'
            }
            const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-image');

            block.classList.add('removing');
            setTimeout(() => block.remove(), 300);
        }
        const uploadHandler = () => {
        }

        open.addEventListener('click', trigerInput);
        input.addEventListener('change', changeHandler);
        preview.addEventListener('click', removeHandler);
        upload.addEventListener('click', uploadHandler)
    }
    upload('#file', {
        multi: true,
        accept: ['.png', '.jpg', '.jpeg', '.gif']
    });

    // textarea auto resize====================================================================

        const textarea = document.querySelector('textarea');
            textarea.addEventListener('keyup', function() {
                if(this.scrollTop > 0){
                    this.style.height = this.scrollHeight + "px";
                }
        });

    // Обработка кастомного списка ============================================================

    document.querySelectorAll('.select__wrapper-mod').forEach (function (dropDownWrapper) {
        const btnList = dropDownWrapper.querySelector('.dropdown__button');
        const dropdownList = dropDownWrapper.querySelector('.dropdown__list');
        const listItem = dropdownList.querySelectorAll('.dropdown__list-item');
        const reLock = document.querySelector('.sex-where');

            btnList.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                dropdownList.classList.toggle('_visible');
                    if (dropdownList.classList.contains('_visible')) {
                        btnList.classList.add('_selected');
                    } else {
                        btnList.classList.remove('_selected');
                    }
            });

            listItem.forEach(function (listItem) {
                listItem.addEventListener('click', function () {
                    btnList.innerText = this.innerText;
                    reLock.value = this.dataset.value;
                    dropdownList.classList.remove('_visible');
                });
            });

            document.addEventListener('click', function () {
                dropdownList.classList.remove('_visible');
                btnList.classList.remove('_selected');
            });

            dropDownWrapper.addEventListener('keydown', function (event) {
                if (event.key === 'Tab' || event.key === 'Escape') {
                    dropdownList.classList.remove('_visible');
                    btnList.classList.remove('_selected');
                }
            });

            btnList.addEventListener('keydown', function (event) {
                if (event.key === 'ArrowDown') {
                    dropdownList.classList.add('_visible');
                }
            });

            listItem.forEach(function (listItem) {
                listItem.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' && event.target.closest(dropDownWrapper).length) {
                    event.stopPropagation();
                    btnList.innerText = this.innerText;
                    reLock.value = this.dataset.value;
                    dropdownList.classList.remove('_visible');
                    btnList.classList.remove('_selected');
                }
            });
        });
    });
}