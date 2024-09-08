<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"/>
    <link href="css/main.css" rel="stylesheet">
</head>
<body>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/pers/pro-2">YourLogo</a>
    <div class="ms-auto rightMenu">
        <?php if (isset($_SESSION['user']['role']) && isset($_SESSION['user']['id'])) { 
            ?><a href="profile.php" class="menuLink" >Profile</a>
            <button type="button" class="btn btn-danger" id="logoutUser">Logout</button>
            <?php
        }else{
            ?>
            <button class="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
            <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
            <?php 
        }?>
    </div>
</nav>
