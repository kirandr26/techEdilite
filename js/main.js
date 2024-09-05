
$(document).ready(function () {
    
    $('.banner-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false, 
        arrows: false 
    });

    
    $('.banner-slider .slick-slide img').css('height', '100vh');

    // $('#loginForm').submit(function (event) {
    //     event.preventDefault();
    //     alert('Login form submitted!');
    //     $('#loginModal').modal('hide');
    // });

    // $('#registerForm').submit(function (event) {
    //     event.preventDefault();
    //     alert('Register form submitted!');
    //     $('#registerModal').modal('hide');
    // });
});
