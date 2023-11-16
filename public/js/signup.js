document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const signInLink = document.getElementById('signInLink');
    const signUpLink = document.getElementById('signUpLink');

    signInLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginSection.style.opacity = '0';
        loginSection.style.animation = 'fade-out 500ms forwards';

        setTimeout(() => {
            loginSection.style.display = 'none';
            signupSection.style.display = 'block';
            signupSection.style.opacity = '1';
            signupSection.style.animation = 'fade-out 500ms forwards';
        }, 500);
    });

    signUpLink.addEventListener('click', function(event) {
        event.preventDefault();
        signupSection.style.opacity = '0';
        signupSection.style.animation = 'fade-out 500ms forwards';

        setTimeout(() => {
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
            loginSection.style.opacity = '1';
            loginSection.style.animation = 'fade-out 500ms forwards';
        }, 500);
    });
});
