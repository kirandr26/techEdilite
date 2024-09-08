<?php
include('includes/header.php');

if (isset($_SESSION['user']['role']) && isset($_SESSION['user']['id'])) { 
    // Sample data for cart (replace with actual data from your database)
    $cart = [
        ['id' => 1, 'product' => 'Product 3', 'price' => 19.99, 'quantity' => 2, 'image' => 'https://dummyimage.com/100x100/000/fff.png&text=Product+3'],
        ['id' => 2, 'product' => 'Product 4', 'price' => 29.99, 'quantity' => 1, 'image' => 'https://dummyimage.com/100x100/000/fff.png&text=Product+4'],
    ];

    // Calculate total price
    $totalPrice = 0;
    foreach ($cart as $item) {
        $totalPrice += $item['price'] * $item['quantity'];
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle form submission for checkout
        $paymentMethod = $_POST['payment_method'] ?? '';
        $name = $_POST['name'] ?? '';
        $address = $_POST['address'] ?? '';
        $contact = $_POST['contact'] ?? '';

        if ($paymentMethod === 'cod') {
            // Process COD payment (placeholder logic)
            // For example, you might save the order to the database and clear the cart
            $_SESSION['checkout_message'] = "Your order has been placed successfully with Cash on Delivery!";
            // Redirect or show a confirmation message
            header('Location: confirmation.php');
            exit;
        } else {
            $_SESSION['checkout_message'] = "Invalid payment method.";
            // Redirect or show an error message
            header('Location: checkout.php');
            exit;
        }
    }
?>

<div class="container mt-5">
    <h1 class="text-center">Checkout</h1>

    <!-- Cart Items -->
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="card-title">Your Cart</h5>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($cart as $item): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($item['product']); ?></td>
                            <td>$<?php echo htmlspecialchars(number_format($item['price'], 2)); ?></td>
                            <td><?php echo htmlspecialchars($item['quantity']); ?></td>
                            <td>$<?php echo htmlspecialchars(number_format($item['price'] * $item['quantity'], 2)); ?></td>
                            <td><img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['product']); ?>" class="img-thumbnail" width="100"></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <h3 class="text-end">Total: $<?php echo htmlspecialchars(number_format($totalPrice, 2)); ?></h3>
        </div>
    </div>

    <!-- Checkout Form -->
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="card-title">Checkout Details</h5>
        </div>
        <div class="card-body">
            <form method="post" action="">
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" id="name" name="name" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Shipping Address</label>
                    <textarea id="address" name="address" class="form-control" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="contact" class="form-label">Contact Number</label>
                    <input type="text" id="contact" name="contact" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="paymentMethod" class="form-label">Select Payment Method</label>
                    <select id="paymentMethod" name="payment_method" class="form-select" required>
                        <option value="cod">Cash on Delivery</option>
                        <!-- Add other payment methods if needed -->
                    </select>
                </div>
                <button type="submit" class="btn btn-primary w-100">Place Order</button>
            </form>
        </div>
    </div>
</div>

<?php } else {
    include('notLoggedIn.php');
}
include('includes/footer.php'); ?>
