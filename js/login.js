const container = document.querySelector('.container');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');

btnSignUp.addEventListener('click', () => {
    container.classList.remove('toggle');
});

btnSignIn.addEventListener('click', () => {
    container.classList.add('toggle');
});