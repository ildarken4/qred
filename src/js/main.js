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
  const navTogglerText = navToggler.querySelector('.nav-toggler__text');
  const headerContent = header.querySelector('.header-content');

  if (navToggler) {
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