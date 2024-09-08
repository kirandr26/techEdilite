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
    <div class="filterProducts">
        <div class="searchBar">
            <input type="text" name="searchProducts" id="searchProducts">
        </div>
        <div class="selectBar">
            <select name="selectProducts" id="selectProducts">
                <option value="">Select Category</option>
            </select>
        </div>
    </div>
    <!-- Product Grid -->
    <div class="row" id="product-list"></div>
</div>

<?php include('includes/footer.php'); ?>
