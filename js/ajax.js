// js/main.js

$(document).ready(function () {
    // Login Form Submission
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        var formData = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        };

        $.ajax({
            type: "POST",
            url: "http://13.233.14.66:3001/login", // Your API endpoint for login
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {

                if(response.status == 200){
                    
                    $('#loginInfoMessage').html('<h6 class="success errMess">'+response.message+'</h6>');
                    setTimeout(function(){
                        $('#loginForm')[0].reset(); 
                        $('#loginInfoMessage').html('');
                        $('#loginModal').modal('hide');
                    },3000)
                }else{
                    
                    $('#loginInfoMessage').html('<h6 class="error errMess">'+response.message+'</h6>');
                    setTimeout(function(){
                        $('#loginForm')[0].reset(); 
                        $('#loginInfoMessage').html('');
                        $('#loginModal').modal('hide');
                    },3000)
                }
            },
            error: function (response) {
                console.log(response)
                $('#loginInfoMessage').html('<h6 class="error errMess">'+response.responseJSON.message+'</h6>');
                setTimeout(function(){
                    $('#loginForm')[0].reset(); 
                    $('#loginInfoMessage').html('');
                    $('#loginModal').modal('hide');
                },3000)
            }
        });
    });

    // Register Form Submission
    $('#registerForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        var formData = {
            name: $('#registerName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()
        };

        $.ajax({
            type: "POST",
            url: "http://13.233.14.66:3001/register", // Your API endpoint for register
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
                
                if(response.status == 200){
                    
                    $('#registerInfoMessage').html('<h6 class="success errMess">'+response.message+'</h6>');
                    setTimeout(function(){
                        $('#registerForm')[0].reset(); 
                        $('#registerInfoMessage').html('');
                        $('#registerModal').modal('hide');
                    },3000)
                }else{
                    
                    $('#registerInfoMessage').html('<h6 class="error errMess">'+response.message+'</h6>');
                    setTimeout(function(){
                        $('#registerForm')[0].reset(); 
                        $('#registerInfoMessage').html('');
                        $('#registerModal').modal('hide');
                    },3000)
                }
                
                
                // You can redirect or update UI here
            },
            error: function (response) {
                
                
                $('#registerInfoMessage').html('<h6 class="error errMess">'+response.responseJSON.message+'</h6>');
                setTimeout(function(){
                    $('#registerForm')[0].reset(); 
                    $('#registerInfoMessage').html('');
                    $('#registerModal').modal('hide');
                },3000)
            }
        });
    });
});
