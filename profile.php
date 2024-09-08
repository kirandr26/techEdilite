<?php include('includes/header.php'); ?>
<?php if (isset($_SESSION['user']['role']) && isset($_SESSION['user']['id'])) { 
    $userId = $_SESSION['user']['id'] ?? null;  // Ensure user is logged in
    $userName = $_SESSION['user']['name'] ?? 'Guest';
    $userEmail = $_SESSION['user']['email'] ?? 'No email';

    // Sample data for orders and cart (replace with actual data from your database)
    $userId = $_SESSION['user']['id'] ?? null;  // Ensure user is logged in
    $userName = $_SESSION['user']['name'] ?? 'Guest';
    $userEmail = $_SESSION['user']['email'] ?? 'No email';

    // Sample data for orders and cart (replace with actual data from your database)
    $orders = [
        ['id' => 1, 'product' => 'Product 1', 'orderDate' => '2024-09-01', 'deliveryDate' => '2024-09-05', 'status' => 'Delivered'],
        ['id' => 2, 'product' => 'Product 2', 'orderDate' => '2024-09-02', 'deliveryDate' => '2024-09-07', 'status' => 'Pending'],
    ];
    $cart = [
        ['id' => 1, 'product' => 'Product 3', 'price' => 19.99, 'quantity' => 2, 'image' => 'https://dummyimage.com/100x100/000/fff.png&text=Product+3'],
        ['id' => 2, 'product' => 'Product 4', 'price' => 29.99, 'quantity' => 1, 'image' => 'https://dummyimage.com/100x100/000/fff.png&text=Product+4'],
    ];
    ?>
    <div class="container mt-5">
        <h1 class="text-center">Profile</h1>

        <!-- Personal Info Section -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title">Personal Information</h5>
            </div>
            <div class="card-body">
                <p><strong>Name:</strong> <?php echo htmlspecialchars($userName); ?></p>
                <p><strong>Email:</strong> <?php echo htmlspecialchars($userEmail); ?></p>
                
            </div>
        </div>

        <!-- Orders Section -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title">My Orders</h5>
            </div>
            <div class="card-body">
                <table class="table" id="myOrderTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Cart Section -->
        <!-- Cart Section -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title">My Cart</h5>
            </div>
            <div class="card-body">
                <table class="table" id="myCartTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
                
                
            </div>
        </div>
        <!-- Checkout Section -->

        <div class="card mb-4 checkoutWrap">
            <div class="card-header">
                <h5 class="card-title">Checkout</h5>
            </div>
            <div class="card-body">
                <h5>Checkout</h5>
                <textarea class="form-control" id="checkoutAddress" rows="3" placeholder="Enter your address"></textarea>
                <button id="checkoutButton" class="btn btn-primary mt-2">Checkout</button>
            </div>
        </div>
    </div>
    <?php
}else{
    include('notLoggedIn.php');
}





include('includes/footer.php'); ?>

