
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем отправку формы на сервер

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    

    // Получаем значения полей
    var email = document.querySelector('input[name="email"]').value;
    var fullName = document.querySelector('input[name="full_name"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var rePassword = document.querySelector('input[name="re_password"]').value;

    // Проверяем данные на корректность
    var isValid = true;

    // Проверка email
    if (!isValidEmail(email)) {
        document.getElementById('emailError').innerText = 'Введите корректный email';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Проверка имени
    if (!fullName) {
        document.getElementById('fullNameError').innerText = 'Введите полное имя';
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('fullNameError').style.display = 'none';
    }

    
    if (!password) {
        document.getElementById('passwordError').innerText = 'Введите пароль ';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    if(password.length > 8){
        document.getElementById('passwordError').style.display = 'none'
    }else{
        document.getElementById('passwordError').innerText = 'Введите пароль больше 8 символов ';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Проверка совпадения паролей
    if (password !== rePassword) {
        document.getElementById('rePasswordError').innerText = 'Пароли не совпадают';
        document.getElementById('rePasswordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('rePasswordError').style.display = 'none';
    }

    // Если данные правильные, отправляем форму на сервер
    if (isValid) {
        this.submit();
    }
});


