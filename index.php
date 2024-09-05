<!-- index.php -->
<?php include('includes/header.php'); ?>

<!-- Banner Section -->
<div class="container-fluid p-0">
    <div class="banner-slider">
        <div><img src="https://dummyimage.com/1920x980/000/fff.png&text=Banner+01" alt="Banner 1" class="img-fluid"></div>
        <div><img src="https://dummyimage.com/1920x980/000/fff.png&text=Banner+02" alt="Banner 2" class="img-fluid"></div>
        <div><img src="https://dummyimage.com/1920x980/000/fff.png&text=Banner+03" alt="Banner 3" class="img-fluid"></div>
    </div>
</div>

<!-- Main content -->
<div class="container mt-5">
    <h1 class="text-center">Welcome to Our Store</h1>
    <p class="text-center mb-5">Explore our amazing products!</p>

    <!-- Product Grid -->
    <div class="row">
        <?php for ($i = 1; $i <= 8; $i++): ?>
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="images/product<?php echo $i; ?>.jpg" class="card-img-top" alt="Product <?php echo $i; ?>">
                    <div class="card-body">
                        <h5 class="card-title">Product <?php echo $i; ?></h5>
                        <p class="card-text">This is a short description of product <?php echo $i; ?>.</p>
                        <a href="#" class="btn btn-primary">View Product</a>
                    </div>
                </div>
            </div>
        <?php endfor; ?>
    </div>
</div>

<?php include('includes/footer.php'); ?>
