// js/main.js

$(document).ready(function () {
    
    $('#loginForm').submit(function (event) {
        event.preventDefault(); 

        var formData = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        };
        
        $.ajax({
            type: "POST",
            url: "http://13.233.14.66:3001/login", 
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
                
                if(response.status == 200){
                    var userData = response.data.userData.Users;
                    $.ajax({
                        type: "POST",
                        url: "./includes/sessions/session_handler.php",
                        data: {
                            action: 'login',
                            uid: userData.id,
                            name: userData.name,
                            email: userData.email
                        },
                        success: function (phpResponse) {
                            if (phpResponse.status == 'success') {
                                $('#loginInfoMessage').html('<h6 class="success errMess">'+response.message+'</h6>');
                                localStorage.setItem('uid', userData.id);
                                setTimeout(function(){
                                    $('#loginForm')[0].reset(); 
                                    $('#loginInfoMessage').html('');
                                    $('#loginModal').modal('hide');
                                    window.location.reload();
                                },3000);
                            } else {
                                $('#loginInfoMessage').html('<h6 class="error errMess">'+phpResponse.message+'</h6>');
                            }
                        },
                        error: function () {
                            $('#loginInfoMessage').html('<h6 class="error errMess">Failed to handle session.</h6>');
                        }
                    });
                   
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
                // console.log(response)
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
        event.preventDefault(); 

        var formData = {
            name: $('#registerName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()
        };

        $.ajax({
            type: "POST",
            url: "http://13.233.14.66:3001/register", 
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


    //Logout
    
    $('#logoutUser').click(function(){
        localStorage.clear();
        window.location.href = 'logout.php';
    })


    // Get products

       function loadProducts(){
            var productsData = {
                type:"",
                id:""
            }
            
            var uid = localStorage.getItem("uid"); 
            $.ajax({
                type: "POST",
                url: "http://13.233.14.66:3000/products", 
                data: JSON.stringify(productsData),
                contentType: "application/json",
                success: function(response) {
                    if (response.status === 200 && response.data.length > 0) {
                        var productListHtml = '';
                        response.data.forEach(function(item) {
                            
                            var product = item.products;
                            productListHtml += `
                            <div class="col-md-3 mb-4">
                                <div class="product card h-100">
                                    <div class="card-body">
                                    <img src="http://13.233.14.66:3000/product_images/${product.id}" alt="${product.name}" class="card-img-top"/>
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">${product.description}</p>
                                    <button type="button" class="btn btn-primary addToCart" data-pid="${product.id}" data-uid="${uid}" id="addToCart">Add to Cart</button>
                                    </div>
                                
                                </div>
                            </div>
                            `;
                        });
                        $('#product-list').html(productListHtml);
                    } else {
                        $('#product-list').html('<p>No products found.</p>');
                    }
                },
                error: function(xhr, status, error) {
                    console.log("Error fetching products:", error);
                    $('#product-list').html('<p>Error fetching products.</p>');
                }
            });
       }
       loadProducts()

    // Add to cart

    $(document).on('click', '.addToCart', function(e) {
        e.preventDefault(); 
        
        var $this = $(this);
        var uid = $this.attr('data-uid');
        var pid = $this.attr('data-pid');
        console.log($this);
        if (uid != 'null') {
            var cartData = {
                items: [pid],
            };
    
            $.ajax({
                type: "POST",
                url: `http://13.233.14.66:3001/users/${uid}/cart`,
                data: JSON.stringify(cartData),
                contentType: "application/json",
                success: function(response) {
                    console.log(response)
                    if (response.status == 200) {
                        console.log('working fine');
                        $this.removeClass('addToCart');
                        $this.text('Added to Cart');
                        var toastEl = document.getElementById('toast');
                        var toast = new bootstrap.Toast(toastEl);
                        $('.toast-header').addClass('bg-success text-white');
                        $('#toastTitle').html('Success');
                        $('#toastBody').html(response.message);
                        $('#toast').removeClass('bg-warning').addClass('bg-success text-white');
                        toast.show();
                       setTimeout(function(){
                            window.location.href="profile.php";
                       },3000)
                       
                    }
                },
                error: function(xhr, status, error) {
                    // Handle error here if needed
                }
            });
        } else {
            $('#loginModal').modal('show');
        }
    });
    


    // get cart

    function loadMyCart(){
        var uid = localStorage.getItem("uid");
        $("#myCartTable tbody").append(`<td colspan="6" style="text-align:center"> Loading....</td>`);
        $.ajax({
            type: "GET",
            url: `http://13.233.14.66:3001/users/${uid}/get-cart`,
            contentType: "application/json",
            success: function(response) {
                var itemLength = response.data.cart.items.length;
                console.log(itemLength);
                console.log(itemLength == 0)
                if(itemLength == 0){
                    $("#myCartTable tbody").html('');
                    $("#myCartTable tbody").append(`<td colspan="6" style="text-align:center">No Products found</td>`);
                    $('.checkoutWrap').remove();
                }else{
                    $('#totalPrice').text(response.data.totalPrice);
                var cartItems = response.data.cart.items;
                var productDetailsPromises = cartItems.map(function(itemId) {
                    return $.ajax({
                        type: "POST",
                        url: `http://13.233.14.66:3000/products`,
                        contentType: "application/json",
                        data: JSON.stringify({ id: itemId })
                    });
                });
        
                    Promise.all(productDetailsPromises).then(function(productsResponses) {
                        var tableBody = $("#myCartTable tbody");
                        tableBody.empty(); // Clear existing rows
            
                        productsResponses.forEach(function(productResponse) {
                            var product = productResponse.data;
                            // console.log(product);
                            tableBody.append(`
                                <tr>
                                    <td>${product.id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.price}</td>
                                    <td>${product.quantity}</td>
                                    <td> <img src="http://13.233.14.66:3000/product_images/${product.id}" alt="${product.name}" class="mycartImg"/></td>
                                    <td><button type="button" class="btn btn-danger removeFromCart" data-uid=${uid} data-pid=${product.id}>Remove</button></td>
                                </tr>
                            `);
                        });
                    }).catch(function(error) {
                        $("#myCartTable tbody").html('');
                        $("#myCartTable tbody").append(`<td colspan="6" style="text-align:center">No Products found</td>`);
                        $('.checkoutWrap').remove();
                        
                    });
                }
                
            },
            error: function(xhr, status, error) {
                $("#myCartTable tbody").html('');
                $("#myCartTable tbody").append(`<td colspan="6" style="text-align:center">No Products found</td>`);
                $('.checkoutWrap').remove();
                
            }
        });
    }
   
    loadMyCart()

    // Remove cart 

   

    $(document).on('click', '.removeFromCart', function() {
        
        var uid = $(this).attr('data-uid');
        var pid = $(this).attr('data-pid');

        $.ajax({
            type: "DELETE",
            url: `http://13.233.14.66:3001/users/${uid}/cart/${pid}`, 
            contentType: "application/json",
            success: function(response) {
               console.log(response);
               $("#myCartTable tbody").html('');
               loadMyCart()
               
            },
            error: function(xhr, status, error) {
                
            }
        });
    })



    // select option
    var optionData = {
       
    };
    
    $.ajax({
        type: 'POST',
        url: `http://13.233.14.66:3000/products`, 
        data: JSON.stringify(optionData),
        contentType: "application/json",
        success: function(response) {
            //console.log(response.data);
            var uniqueProductTypes = new Set();
    
            response.data.forEach(function(item) {
                var productType = item.products.type;
                if (!uniqueProductTypes.has(productType)) {
                    uniqueProductTypes.add(productType);
                    $('#selectProducts').append(`<option value="${productType}">${productType}</option>`);
                }
            });
        },
        error: function(xhr, status, error) {
            console.log("Error fetching product details:", error);
        }
    });

    //onchange Category
    

    $('#selectProducts').on('change',function(){
        var cat = $(this).val();
        var productsData = {
            type:cat,
            id:""
        }
        
        var uid = localStorage.getItem("uid"); 
        $.ajax({
            type: "POST",
            url: "http://13.233.14.66:3000/products", 
            data: JSON.stringify(productsData),
            contentType: "application/json",
            success: function(response) {
                // console.log(response);
                if (response.status === 200) {
                    var productListHtml = '';
                    response.data.forEach(function(item) {
                        var product = item;
                       if(cat != '' ){
                            product = item;
                       }else{
                            product = item.products
                       }
                        productListHtml += `
                        <div class="col-md-3 mb-4">
                            <div class="product card h-100">
                                <div class="card-body">
                                 <img src="http://13.233.14.66:3000/product_images/${product.id}" alt="${product.name}" class="card-img-top"/>
                                 <h5 class="card-title">${product.name}</h5>
                                 <p class="card-text">${product.description}</p>
                                 <button type="button" class="btn btn-primary addToCart" data-pid="${product.id}" data-uid="${uid}" id="addToCart">Add to Cart</button>
                                </div>
                              
                            </div>
                        </div>
                        `;
                    });
                    $('#product-list').html(productListHtml);
                } else {
                    $('#product-list').html('<p>No products found.</p>');
                }
            },
            error: function(xhr, status, error) {
                // console.log("Error fetching products:", error);
                $('#product-list').html('<p>Error fetching products.</p>');
            }
        });
       
    })


    $('#checkoutButton').click(function() {
        var uid = localStorage.getItem("uid"); 
        var address = $('#checkoutAddress').val().trim();
    
        if (address !== '') {
            var addressData = {
                userId: uid,
                address: address
            };
    
            $.ajax({
                type: "POST",
                url: "http://13.233.14.66:3002/orders", 
                data: JSON.stringify(addressData),
                contentType: "application/json",
                success: function(response) {
                    // console.log(response);
                    var toastEl = document.getElementById('toast');
                    var toast = new bootstrap.Toast(toastEl);
    
                    $('#toastTitle').html(response.status === 201 ? 'Success' : 'Warning');
                    $('#toastBody').html(response.message);
    
                    if (response.status === 201) {
                        $('.toast-header').addClass('bg-success text-white');
                        $('#toast').removeClass('bg-success').addClass('bg-success text-white');
                        setTimeout(function(){
                            window.location.reload();
                        },3000)
                    } else {
                        $('.toast-header').addClass('bg-danger text-white');
                        $('#toast').removeClass('bg-success text-white').addClass('bg-warning text-dark');
                    }
    
                    toast.show();
                },
                error: function(xhr, status, error) {
                    var toastEl = document.getElementById('toast');
                    var toast = new bootstrap.Toast(toastEl);
    
                    $('#toastTitle').html('Error');
                    $('#toastBody').html('An error occurred. Please try again.');
    
                    $('#toast').removeClass('bg-success text-white').addClass('bg-warning text-dark');
    
                    toast.show();
                }
            });
        } else {
            var toastEl = document.getElementById('toast');
            var toast = new bootstrap.Toast(toastEl);
    
            $('#toastTitle').html('Warning');
            $('.toast-header').addClass('bg-danger text-white');
            $('#toastBody').html('Please enter your address.');
    
            $('#toast').removeClass('bg-success text-white').addClass('bg-danger text-white');
    
            toast.show();
        }
    });
    

    //Load Orders
    
    function loadOrders() {
        var uid = localStorage.getItem("uid");
        var serialNo = 1;
        $("#myOrderTable tbody").append(`<tr><td colspan="5" style="text-align:center">Loading...</td></tr>`);
    
        $.ajax({
            type: "GET",
            url: `http://13.233.14.66:3002/orders/${uid}`,
            contentType: "application/json",
            success: function(response) {
              
                var tableBody = $("#myOrderTable tbody");
                tableBody.empty(); 
    
                if (response.data.length === 0) {
                    tableBody.append(`<tr><td colspan="5" style="text-align:center">No Orders Found</td></tr>`);
                } else {
                    var orders = response.data;
                    
                    orders.forEach(function(item) {
                        var timestamp = new Date(item.orders.timestamp);
                        var formattedDate = timestamp.toLocaleDateString('en-GB');
                        var proData = { id: item.orders.items[0] }; 
                        
                        $.ajax({
                            type: "POST",
                            url: "http://13.233.14.66:3000/products", 
                            data: JSON.stringify(proData),
                            contentType: "application/json",
                            success: function(productResponse) {
                                var product = productResponse.data;
                                tableBody.append(`
                                    <tr>
                                        <td>${serialNo++}</td>
                                        <td>${product.name}</td>
                                        <td>${formattedDate}</td>
                                        <td></td>
                                        <td>${item.orders.status}</td>
                                    </tr>
                                `);
                            },
                            error: function(xhr, status, error) {
                                console.error("Error fetching product details:", error);
                            }
                        });
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching orders:", error);
            }
        });
    }
    
    loadOrders();
    
    
    
});

