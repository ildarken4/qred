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
let timerCount = 10;
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
                enableBodyScroll();
            } else {
                disableBodyScroll();
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

const scheduleButton = document.querySelector('.schedule-btn');
const scheduleModal = document.querySelector('.schedule-modal');
const scheduleClose = document.querySelector('.schedule-close');

if(scheduleButton) {
    scheduleButton.addEventListener('click', function () {
        scheduleModal.classList.remove('translate-y-full');
    });
    scheduleClose.addEventListener('click', function () {
        scheduleModal.classList.add('translate-y-full');
    })
}


// Открытие информации о заеме в multiple

const loanCards = document.querySelectorAll('.js-loan-card');
const infoButton = document.querySelector('.js-show-info');
const loanInfo = document.querySelector('.js-loan-info');

if(loanCards) {

    loanCards.forEach(function(card) {
        let infoButton = card.querySelector('.js-show-info');
        let loanInfo = card.querySelector('.js-loan-info');
        infoButton.addEventListener('click', function () {
            loanInfo.classList.toggle('max-h-96');
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
                ' <div class="line"></div> ' +
                '<div class=" total-slide ' + totalClass + '"></div>';
        },
    },
});