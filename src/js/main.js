window.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll('.modal');
  const popup = document.querySelector('.popup');
  let modalName;
  let scrollPosition;

  function disableBodyScroll() {
      if (typeof scrollPosition === 'undefined') {
          // Сохраняем текущую позицию прокрутки только при первом открытии модального окна
          scrollPosition = window.scrollY || window.pageYOffset;

          // Добавляем класс для блокировки прокрутки
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.top = `-${scrollPosition}px`;
      }
  }

  function enableBodyScroll() {
      // Для закрытия модального окна, восстанавливаем прокрутку только если позиция была сохранена
      if (typeof scrollPosition !== 'undefined') {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.top = '';
          window.scrollTo(0, scrollPosition);

          // Сбрасываем сохраненную позицию прокрутки
          scrollPosition = undefined;
      }
  }
  const header = document.querySelector('header');
  const navToggler = header.querySelector('.nav-toggler');
  
  if (navToggler) {

    const navTogglerText = navToggler.querySelector('.nav-toggler__text');
    const headerContent = header.querySelector('.header-content');
    navToggler.onclick = () => {
        header.classList.toggle('active');
        headerContent.classList.toggle('bg-white');

        if(!header.classList.contains('active')) {
          enableBodyScroll();
        } else {
          disableBodyScroll();
        }
    };
  }
});


// Шкала процентов вероятности одобрения flow 

const probability = document.querySelector('.js-probability');

if (probability) {
    let probabilityValue = probability.querySelector('.js-probability__percent span').textContent;
    let probabilityScale = probability.querySelector('.js-probability-scale__fill');

    probabilityScale.setAttribute('style', 'width: '+ probabilityValue + '%')
    
}

// Таймер отправки смс-кода

const smsTimer = document.getElementById('js-timer');
const updateTimerBtn = document.getElementById('js-update-timer');
let timerCount = 59;
let timerInterval;

function updateTimer() {
    if (timerCount >= 0) {
        const secondsText = getSecondsText(timerCount);
        smsTimer.textContent = timerCount < 10 ? '0' + timerCount  + ' ' + secondsText : timerCount  + ' ' + secondsText;
        timerCount--;
    } else {
        smsTimer.style.display = 'none';
        updateTimerBtn.classList.remove('text-gray_text', 'pointer-events-none');
        clearInterval(timerInterval);
    }
}

if (smsTimer) {
    timerInterval = setInterval(updateTimer, 1000);

    function sendSms() {
        timerCount = 10;
        timerInterval = setInterval(updateTimer, 1000);
        smsTimer.style.display = 'block';
        updateTimerBtn.classList.add('text-gray_text', 'pointer-events-none');
    }
}

// Функция определения правильного окончания для слова "секунда"
function getSecondsText(timerCount) {
    if (timerCount === 1 || (timerCount > 20 && timerCount % 10 === 1)) {
        return 'секунда';
    } else if ((timerCount >= 2 && timerCount <= 4) || (timerCount > 20 && timerCount % 10 >= 2 && timerCount % 10 <= 4)) {
        return 'секунды';
    } else {
        return 'секунд';
    }
}

// Показ/скрытие поля password

const passwordField = document.querySelector('.show-password');

if (passwordField) {
    let formInputs = document.querySelectorAll('.js-password-wrapper');

    formInputs.forEach(function(formInput) {
        var showPassword = formInput.querySelector('.show-password'); 
        var input = formInput.querySelector('input[type="password"]');

        if (showPassword) {
            showPassword.addEventListener('click', function() {
                if (input.type === 'password') {
                    input.type = 'text';
                    showPassword.classList.remove('opacity-60');
                } else {
                    input.type = 'password';
                    showPassword.classList.add('opacity-60');
                }
            });
        }
        
    });
}

// активация кнопки при выборе чекбокса

const rulesCheckbox = document.getElementById('rules');
const nextStepButton = document.querySelector('.js-button');


if (rulesCheckbox && nextStepButton) {
    function checkRulesCheckbox() {
        if (rulesCheckbox.checked) {
            nextStepButton.classList.remove('btn-disabled');
        } else {
            nextStepButton.classList.add('btn-disabled');
        }
    }

    rulesCheckbox.addEventListener('change', checkRulesCheckbox);

    checkRulesCheckbox();
}

// Показ дополнительных опций в калькуляторе на лендинге

const rulesShow = document.querySelector('.js-show-rules');
const rulesHide = document.querySelector('.js-hide-rules');
const hiddenCheckbox = document.querySelector('.js-hidden-checkbox');

if (rulesShow) {
    rulesShow.addEventListener('click', function () {
        hiddenCheckbox.classList.remove('hidden')
    });
    rulesHide.addEventListener('click', function () {
        hiddenCheckbox.classList.add('hidden')
    })
}


// Меню в личном кабинете
const accountMenuBtns = document.querySelectorAll('.btn-account-menu');
const accountMenu = document.querySelector('.js-account-menu');
if(accountMenuBtns) {

    accountMenuBtns.forEach( function(btn) {
        btn.onclick = () => {
            accountMenu.classList.toggle('translate-y-full');
            if(!accountMenu.classList.contains('translate-y-full')) {
                disableBodyScroll();
            } else {
                enableBodyScroll();
            }
        }
    })
    
}

// кастомный селект (ЛК и flow)

const customSelects = document.querySelectorAll('.custom-select');

if (customSelects) {
    customSelects.forEach(function(customSelect) {
        let customSelectToggler = customSelect.querySelector('.custom-select__head');
        let customSelectResult = customSelect.querySelector('.custom-select__result');
        let customSelectOptions = customSelect.querySelectorAll('.custom-option');
        
        customSelectToggler.addEventListener('click', function() {
            this.parentNode.classList.toggle('active')
        })

        customSelectOptions.forEach(function(customSelectOption) {
            customSelectOption.addEventListener('click', function() {
                let customValue = customSelectOption.querySelector('.custom-select__value').textContent;
                customSelectOptions.forEach(function(item) {
                    item.removeAttribute('selected');
                })
                this.setAttribute('selected', '');
                customSelectResult.textContent = customValue;
                customSelect.classList.remove('active');
                customSelectToggler.classList.add('selected');
            })
        })
    })
}

// Открытие графика платежей

const scheduleButtons = document.querySelectorAll('.schedule-btn');
const scheduleModal = document.querySelector('.schedule-modal');
const scheduleClose = document.querySelector('.schedule-close');

if(scheduleButtons) {
    scheduleButtons.forEach(function (scheduleBtn) {
        scheduleBtn.addEventListener('click', function () {
          scheduleModal.classList.remove('translate-y-full');

        });
        scheduleClose.addEventListener('click', function () {
            scheduleModal.classList.add('translate-y-full');

        })
    })
    
}


// Открытие информации о заеме в multiple

const loanCards = document.querySelectorAll('.js-loan-card');

if(loanCards) {

    loanCards.forEach(function(card) {
        let infoButton = card.querySelector('.js-show-info');
        let loanInfo = card.querySelector('.js-loan-info');
        infoButton.addEventListener('click', function () {
            loanInfo.classList.toggle('max-h-96');
            if(loanInfo.classList.contains('max-h-96')) {
                this.textContent="Свернуть";
            } else {
                this.textContent="Подробнее о займе";
            }
            
        });
    })
    
}

const accountSwiper = new Swiper('.loans-slider', {
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
    },

    pagination: {
        el: '.slider-counter',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<div class="current-slide ' + currentClass + '"></div>' +
                ' <div class="line border-b border-black w-8"></div> ' +
                '<div class=" total-slide ' + totalClass + '"></div>';
        },
    },
});

// Модальное окно
const modals = document.querySelectorAll('.modal');
const popup = document.querySelector('.popup');
let modalName;
let scrollPosition;

function disableBodyScroll() {
    if (typeof scrollPosition === 'undefined') {
        // Сохраняем текущую позицию прокрутки только при первом открытии модального окна
        scrollPosition = window.scrollY || window.pageYOffset;

        // Добавляем класс для блокировки прокрутки
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
    }
}

function enableBodyScroll() {
    // Для закрытия модального окна, восстанавливаем прокрутку только если позиция была сохранена
    if (typeof scrollPosition !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);

        // Сбрасываем сохраненную позицию прокрутки
        scrollPosition = undefined;
    }
}
// Клик вне .popup
document.addEventListener('mouseup', function (e) {
    const popups = document.querySelectorAll('.popup');
    let headerNav = document.querySelector('.header-nav');

    popups.forEach(popup => {
        const modal = popup.closest('.modal'); // Получаем ближайший родитель .modal для текущего .popup

        // Проверяем наличие .active у родителя .modal
        if (modal && modal.classList.contains('active')) {
            if (!popup.contains(e.target)) {
                closeModal();
            }
        }
    });

    
});


// Открыть модальное окно
function openModal(modalName) {
    let modal = document.getElementById(modalName);
    modal.classList.add("active");
    disableBodyScroll();

    
}

// Переключить модальное окно
let modal1, modal2;
function changeModal(modal1, modal2) {
    let openingModal = document.getElementById(modal2);
    let closingModal = document.getElementById(modal1);
    openingModal.classList.add("active");
    closingModal.classList.remove("active");

}

// Закрыть модальное окно
function closeModal() {
    
    modals.forEach(function(item) {
        item.classList.remove("active");
    })
    enableBodyScroll();
}


// Таймер отправки email/sms

let timer;

function startEmailTimer() {
    clearInterval(timer); // Остановка предыдущего таймера, если он существует
    
    let seconds = 59;
    const button = document.querySelector('.js-email-button');
    button.classList.add('btn-disabled');
    // Функция обновления таймера
    function updateTimer() {
        const timerElement = document.querySelector('.js-popup-timer');
        timerElement.classList.remove('hidden');
        

        if (seconds >= 0) {
            const secondsText = getSecondsText(seconds);
            timerElement.textContent = seconds + ' ' + secondsText;
            seconds--;
        } else {
            clearInterval(timer);
            button.classList.remove('btn-disabled');
            timerElement.classList.add('hidden');
        }
    }

    updateTimer();

    timer = setInterval(updateTimer, 1000);
}

// скрытие поля адреса если фактический совпадает с регистрацией

const sameAddress = document.querySelector('#same-address');
const factAddress = document.querySelector('.js-fact-address');

if (sameAddress) {
    sameAddress.addEventListener('click', function() {
        factAddress.classList.toggle('hidden');
    })
}

// скрытие лишних полей на странице Место работы если Пенсионер

const customOptions = document.querySelectorAll('.custom-option');

if (document.querySelector('.job-retiree')) {
    customOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            const selectValue = this.querySelector('.custom-select__value');

            if (selectValue) {
                if (selectValue.classList.contains('job-retiree')) {
                    // Если есть класс .job-retiree, добавляем класс .hidden к элементам .retiree-hide
                    const retireeHideElements = document.querySelectorAll('.retiree-hide');
                    retireeHideElements.forEach(function (element) {
                        element.classList.add('hidden');
                    });
                } else {
                    // Если нет класса .job-retiree, удаляем класс .hidden у элементов .retiree-hide
                    const retireeHideElements = document.querySelectorAll('.retiree-hide');
                    retireeHideElements.forEach(function (element) {
                        element.classList.remove('hidden');
                    });
                }
            }
        });
    });
}


// скрипт для работы input[type="range"]
const sliders = document.querySelectorAll('input[type="range"]');

sliders.forEach(function(slider) {
    const updateSlider = () => {
        const min = slider.min;
        const max = slider.max;
        const value = slider.value;
        const range = max - min;
        const ratio = (value - min) / range;
        const sx = `calc(0.5 * 2em + ${ratio} * (100% - 2em))`;

        slider.style.setProperty('--sx', sx);
    };

    slider.addEventListener('input', updateSlider);
    updateSlider(); // Initialize on page load
})
        
const accountSlider = document.querySelector('.account-slider');

if (accountSlider) {
    const accountSwiper = new Swiper('.account-slider', {
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },

        pagination: {
            el: '.slider-counter',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<div class="current-slide ' + currentClass + '"></div>' +
                    ' <div class="line border-b border-black w-8"></div> ' +
                    '<div class=" total-slide ' + totalClass + '"></div>';
            },
        },
    });
}

// Показать/скрыть обращения на account-my-apepals

const appeals = document.querySelectorAll('.js-appeals-row');

if(appeals) {
    function hideAppeals() {
        for(let i = 0; i<= appeals.length-1 ; i++) {
            if (i > 4) {
                appeals[i].classList.add('hidden')
            }
        }
    }

    hideAppeals();
    
    
    const showAppeals = document.querySelector('.js-show-appeals');

    if(showAppeals) {
        showAppeals.addEventListener('click', function () {
            if(!this.classList.contains('active')) {
                appeals.forEach(function(appeal) {
                    appeal.classList.remove('hidden');
                });
                this.classList.add('active');
                this.textContent = 'Свернуть';
            } else {
                hideAppeals();
                this.classList.remove('active');
                this.textContent = 'Показать все обращения';
            }
        })
    }
}

// Вывод названия загруженного файла для input[type="file"] и переключение между загржаемыми фото

const fileInputs = document.querySelectorAll('input[type="file"]');


if (fileInputs) {
    
    fileInputs.forEach(function (fileInput) {
        fileInput.addEventListener('change', function () {
            

            var filesContainer = document.querySelector('.loaded-files');

            if(filesContainer) {
                filesContainer.classList.add('mt-7');
                var files = fileInput.files;
        
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    let fileName = file.name;
                    var fileItem = document.createElement('div');
                    let deleteButton = document.createElement('img');
                    deleteButton.src = '../img/icons/delete-file.svg';
                    deleteButton.classList.add('delete-file');
                    fileItem.classList.add('loaded-files__item');

                    let fileNameBlock = document.createElement('div');
                    fileNameBlock.classList.add('appeal-file');
                    fileNameBlock.textContent = fileName;
                    fileItem.appendChild(fileNameBlock);
                    fileItem.appendChild(deleteButton);
                    filesContainer.appendChild(fileItem);

                    deleteButton.addEventListener('click', function() {
                        let fileItems = filesContainer.querySelectorAll('.loaded-files__item');

                        if(fileItems.length == 1) {
                            filesContainer.classList.remove('mt-7');
                        }

                        this.parentNode.parentNode.removeChild(this.parentNode);
                        
                    })
                }
            }
        });
    });
}

// Input маски
let phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs) {
    Inputmask({"mask": "+7 (999) 999-99-99"}).mask(phoneInputs);
}

let numberInput = document.getElementById('passport-number');
if (numberInput) {
    Inputmask({"mask": "99 99 999999"}).mask(numberInput);

}

let dateInputs = document.getElementsByClassName('input-date');
if (dateInputs) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let year18YearsAgo = currentYear - 18;
    Inputmask(
    {
        alias: 'datetime',
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        digits: 0,
        placeholder: "__.__.____",
        inputFormat: "dd.mm.yyyy",
        min: "01.01.1900",
        max: "31.12."+year18YearsAgo // ограничил ввод даты с 1900 до того года который был 18 лет назад
    }).mask(dateInputs);
}


let emailInputs = document.getElementsByClassName('email-input');

if (emailInputs) {

        Inputmask(
        {
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}].*{1,20}[.*{2,6}][.*{1,2}]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
            },
            definitions: {
                '*': {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                    casing: "lower"
                }
            }
        }).mask(emailInputs);
}

let codeInput = document.getElementById('passport-code');
if (codeInput) {
    Inputmask({"mask": "999-999"}).mask(codeInput);
}

let incomeInput = document.getElementsByClassName('input-sum');
if (incomeInput) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(incomeInput);
}

let accountPays = document.querySelectorAll('.account-pay');

if (accountPays) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(accountPays);
}


// radio переключение способа платежа

const paymentBlocks = document.querySelectorAll('.payment-block');

if (paymentBlocks) {
    // Функция для обработки клика
    function handleClick(button) {
        // Получить родительский элемент .payment-block
        const parentBlock = button.closest('.payment-block');
        // Найти .payment-check внутри текущего .js-payment-button или связанного label
        const paymentCheck = parentBlock.querySelector('.payment-check');
        // Найти .js-payment-info внутри родительского .payment-block
        const paymentInfo = parentBlock.querySelector('.js-payment-info');

        // Переключить checked для текущего .payment-check
        paymentCheck.checked = !paymentCheck.checked;

        // Переключить класс active для текущего .js-payment-info
        paymentInfo.classList.toggle('active', paymentCheck.checked);

        // Убрать checked и active для всех остальных блоков
        document.querySelectorAll('.payment-block').forEach(block => {
            if (block !== parentBlock) {
                // Установить checked = false для других .payment-check
                const otherCheck = block.querySelector('.payment-check');
                if (otherCheck) {
                    otherCheck.checked = false;
                }
                // Удалить класс active для других .js-payment-info
                const otherInfo = block.querySelector('.js-payment-info');
                if (otherInfo) {
                    otherInfo.classList.remove('active');
                }
            }
        });
    }

    // Найти все элементы с классом js-payment-button
    const paymentButtons = document.querySelectorAll('.js-payment-button');

    paymentButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            handleClick(button);
        });
    });

}

// переключение вкладок на странице account-my-cards
const cardTableToggler = document.querySelector('.js-card-toggler');

if (cardTableToggler) {
    const cardTab = document.querySelector('.js-cards-table');
    const sbpTab = document.querySelector('.js-sbp-table');
    const sbpTableToggler = document.querySelector('.js-sbp-toggler');

    cardTableToggler.addEventListener('click', function() {
        cardTab.classList.remove('hidden');
        cardTableToggler.classList.add('bg-accent');
        sbpTab.classList.add('hidden');
        sbpTableToggler.classList.remove('bg-accent');
    })

    sbpTableToggler.addEventListener('click', function() {
        sbpTab.classList.remove('hidden');
        sbpTableToggler.classList.add('bg-accent');
        cardTab.classList.add('hidden');
        cardTableToggler.classList.remove('bg-accent');
    })
}

// flow-menu в header-flow

const flowMenuTogglers = document.querySelectorAll('.js-flow-menu-toggler');

if (flowMenuTogglers) {
    const flowMenu = document.querySelector('.js-flow-menu');
    const flowMenuBody = document.querySelector('.js-flow-menu-body');
    const flowMenuIcons = document.querySelectorAll('.js-flow-menu-icon');

    flowMenuTogglers.forEach(function (flowMenuToggler) {
        flowMenuToggler.addEventListener('click', function() {

            if(!flowMenu.classList.contains('active')) {
                flowMenu.classList.add('active');
                flowMenuBody.classList.add('active');
                flowMenuIcons.forEach(function (flowMenuIcon) {
                    flowMenuIcon.setAttribute('d', 'M21 21.5L12 12.5M12 12.5L3 3.5M12 12.5L21.0001 3.5M12 12.5L3 21.5001')
                })
            } else {
            
                flowMenuBody.classList.remove('active');
                flowMenuIcons.forEach(function (flowMenuIcon) {
                    flowMenuIcon.setAttribute('d', 'M3 17H21M3 12H21M3 7H21')
                })

                setTimeout(() => {
                    flowMenu.classList.remove('active');
                }, 200);
            }
        })
    })
    
}