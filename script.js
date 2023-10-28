// Навигация

const burgerBtn = document.querySelector('.header__nav-burger');
const nav = document.querySelector('.header__nav');
const body = document.querySelector('body');
const header = document.getElementById('header');
const arrowUp = document.querySelector('.arrow-up');
const anchors = document.querySelectorAll('.anchor');

burgerBtn.addEventListener('click', function () {
  nav.classList.toggle('active');
  burgerBtn.setAttribute('aria-expanded', nav.classList.contains('active'));
  body.classList.toggle('_lock');
});

anchors.forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    nav.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    body.classList.remove('_lock');
  });
});

window.addEventListener('scroll', function() {
  if (window.scrollY >= 750) {
    header.classList.add('scrolled');
    arrowUp.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    arrowUp.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        anchors.forEach(function(anchor) {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                let fromTop = window.scrollY + 80;
                if (target.offsetTop <= fromTop && (target.offsetTop + target.offsetHeight) > fromTop) {
                    anchor.classList.add('active');
                } else {
                    anchor.classList.remove('active');
                }
            }
        });
    });
});



// Форма и её отправка

const form = document.getElementById("req__form");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const telephoneInput = form.querySelector('.telephone');

telephoneInput.addEventListener('focus', function () {
    if (!this.value.startsWith('+7')) {
        this.value = '+7 (';
    }
});

telephoneInput.addEventListener('input', function (event) {
    let numbers = this.value.replace(/\D/g, '');

    if (numbers.length > 11) {
        numbers = numbers.substring(0, 11);
    }

    let formattedNumber = '+7';

    if (numbers.length >= 1) {
        formattedNumber += ' (' + numbers.substring(1, 4);
    }

    if (numbers.length >= 4) {
        formattedNumber += ') ' + numbers.substring(4, 7);
    }

    if (numbers.length >= 7) {
        formattedNumber += '-' + numbers.substring(7);
    }

    this.value = formattedNumber;
});

telephoneInput.addEventListener('blur', function () {
    if (this.value === '+7 (' || this.value === '+7') {
        this.value = '';
    }
});

telephoneInput.addEventListener('keydown', function (event) {
    let key = event.key;
    if (key === 'Backspace' || key === 'Delete') {
        event.preventDefault();
        let numbers = this.value.replace(/\D/g, '');
        numbers = numbers.slice(0, -1);

        let formattedNumber = '+7';

        if (numbers.length >= 1) {
            formattedNumber += ' (' + numbers.substring(1, 4);
        }

        if (numbers.length >= 4) {
            formattedNumber += ') ' + numbers.substring(4, 7);
        }

        if (numbers.length >= 7) {
            formattedNumber += '-' + numbers.substring(7);
        }

        this.value = formattedNumber;
    }
});

function isValidTelephone(telephone) {
    const telephoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{4}$/;
    return telephoneRegex.test(telephone);
}

let isTimerActive = false;
const status = document.querySelector(".req__form-status");

function clearStatus(time) {
    if (!isTimerActive) {
        isTimerActive = true;

        setTimeout(() => {
            status.innerHTML = "&nbsp;";
            isTimerActive = false;
        }, time * 1000);
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    let isFormValid = true;

    const inputs = form.querySelectorAll('.req__input');
    inputs.forEach(input => {
        input.classList.remove('invalid');
    });

    const invalidFields = [];

    function handleInput(event) {
    const input = event.target;
    input.classList.remove('invalid');
    }

    for (let pair of data.entries()) {
        const fieldName = pair[0];
        const fieldValue = pair[1];
        const correspondingInput = form.querySelector(`[name="${fieldName}"]`);

        correspondingInput.addEventListener('input', handleInput);
        
        if (!fieldValue) {
            isFormValid = false;
            invalidFields.push(correspondingInput);
            status.innerHTML = 'Пожалуйста, заполните все поля формы.';
            clearStatus(4);
        } else if (fieldName === 'email' && !isValidEmail(fieldValue)) {
            isFormValid = false;
            invalidFields.push(correspondingInput);
            status.innerHTML = 'Пожалуйста, введите корректный адрес электронной почты.';
            clearStatus(4);
        } else if (fieldName === 'telephone' && !isValidTelephone(fieldValue)) {
            isFormValid = false;
            invalidFields.push(correspondingInput);
            status.innerHTML = 'Пожалуйста, введите корректный номер телефона.';
            clearStatus(4);
        } else if (fieldName === 'message' && fieldValue.length <= 8) {
            isFormValid = false;
            invalidFields.push(correspondingInput);
            status.innerHTML = 'Сообщение должно содержать более 8 символов.';
            clearStatus(4);
        }
    }

    invalidFields.forEach(field => {
        field.classList.add('invalid');
    });


    if (!isFormValid) {
        return;
    }

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = 'Спасибо за обращение, мы ответим на Ваше письмо!';
            form.reset()
            clearStatus(8)
        } else {
            const responseData = await response.json();
            if (Object.hasOwnProperty.call(responseData, 'errors')) {
                status.innerHTML = responseData.errors.map(error => error.message).join(", ");
            } else {
                status.innerHTML = 'При отправке возникла проблема, <a href="mailto:sale@rpr.org.ru">напишите</a> или <a href="tel:+7(812)998-74-42">позвоните</a> нам!';
            }
        }
    } catch (error) {
        status.innerHTML = 'При отправке возникла проблема, <a href="mailto:sale@rpr.org.ru">напишите</a> или <a href="tel:+7(812)998-74-42">позвоните</a> нам!';
    }
}

form.addEventListener("submit", handleSubmit);

// Коопирайт

document.getElementById('currentYear').innerHTML = new Date().getFullYear();