<?php include('includes/header.php'); ?>

<?php
if (isset($_SESSION['user']['role']) && isset($_SESSION['user']['id'])) {
    $userId = htmlspecialchars($_SESSION['user']['id']);
    $role = htmlspecialchars($_SESSION['user']['role']);
    ?>

    <div class="container mt-5">
        <h1 class="text-center">Session Information</h1>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Session Details</h5>
                        <p class="card-text"><strong>Session ID:</strong> <?php echo session_id(); ?></p>
                        <p class="card-text"><strong>User ID:</strong> <?php echo $userId; ?></p>
                        <p class="card-text"><strong>Role:</strong> <?php echo $role; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php
} else {
    include('notLoggedIn.php');
}
?>

<?php include('includes/footer.php'); ?>
