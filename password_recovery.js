// Toggle password visibility for reset password page
if (document.getElementById('toggleNewPassword')) {
    document.getElementById('toggleNewPassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('txtNewPassword');
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.textContent = isPassword ? 'Hide Password' : 'Show Password';
    });
}

if (document.getElementById('toggleConfirmNewPassword')) {
    document.getElementById('toggleConfirmNewPassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('txtConfirmNewPassword');
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.textContent = isPassword ? 'Hide Password' : 'Show Password';
    });
}

// Handle forgot password functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only run this code if we're on the index page with the forgot password button
    if (document.getElementById('btnForgotPassword')) {
        document.getElementById('btnForgotPassword').addEventListener('click', function() {
            loadPage('frmForgotPassword', 'frmLogin');
        });

        document.getElementById('btnBackToLogin').addEventListener('click', function() {
            loadPage('frmLogin', 'frmForgotPassword');
        });

        document.getElementById('btnVerifyEmail').addEventListener('click', function() {
            const email = document.getElementById('text-RecoveryEmail').value.trim();
            const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!regEmail.test(email)) {
                Swal.fire({
                    title: "Invalid Email",
                    text: "Please enter a valid email address",
                    icon: "error"
                });
                return;
            }

            // Instead of redirecting to a separate page, we can add the reset password form to index.html
            // and show it dynamically
            Swal.fire({
                title: "Email Verified!",
                text: "You can now reset your password",
                icon: "success"
            }).then(() => {
                // Store the recovery email
                sessionStorage.setItem('recoveryEmail', email);
                
                // Creating a form dynamically for password reset instead of redirecting
                const formHtml = `
                <div class="card-body">
                    <h1 class="text-center mb-0 text-primary">RateMyGroup</h1>
                    <h3 class="text-center mb-4">Reset Password</h3>
                    
                    <label for="txtNewPassword" class="required mt-1">New Password</label>
                    <input id="txtNewPassword" class="form-control" type="password" placeholder="New password">
                    <button type="button" id="toggleNewPassword" class="btn btn-outline-light mt-2 mb-3">Show Password</button>
                    <div class="invalid-feedback">Password must be 8-64 characters</div>
                    
                    <label for="txtConfirmNewPassword" class="required mt-1">Confirm New Password</label>
                    <input id="txtConfirmNewPassword" class="form-control" type="password" placeholder="Confirm new password">
                    <button type="button" id="toggleConfirmNewPassword" class="btn btn-outline-light mt-2">Show Password</button>
                    <div class="invalid-feedback">Passwords must match</div>
                    
                    <div class="d-grid gap-2 mt-4">
                        <button class="btn btn-primary" type="button" id="btnResetPassword">Reset Password</button>
                        <button class="btn btn-outline-secondary" type="button" id="btnCancelReset">Cancel</button>
                    </div>
                </div>`;
                
                // Replace the content of the forgot password form with the reset password form
                document.getElementById('frmForgotPassword').innerHTML = formHtml;
                
                // Set up the toggle password handlers
                document.getElementById('toggleNewPassword').addEventListener('click', function() {
                    const passwordInput = document.getElementById('txtNewPassword');
                    const isPassword = passwordInput.type === 'password';
                    passwordInput.type = isPassword ? 'text' : 'password';
                    this.textContent = isPassword ? 'Hide Password' : 'Show Password';
                });
                
                document.getElementById('toggleConfirmNewPassword').addEventListener('click', function() {
                    const passwordInput = document.getElementById('txtConfirmNewPassword');
                    const isPassword = passwordInput.type === 'password';
                    passwordInput.type = isPassword ? 'text' : 'password';
                    this.textContent = isPassword ? 'Hide Password' : 'Show Password';
                });
                
                // Set up reset password button handler
                document.getElementById('btnResetPassword').addEventListener('click', function() {
                    const newPassword = document.getElementById('txtNewPassword').value;
                    const confirmPassword = document.getElementById('txtConfirmNewPassword').value;
                    let hasError = false;
                    
                    if (newPassword.length < 8 || newPassword.length > 64) {
                        document.getElementById('txtNewPassword').classList.add('is-invalid');
                        hasError = true;
                    } else {
                        document.getElementById('txtNewPassword').classList.remove('is-invalid');
                    }
                    
                    if (newPassword !== confirmPassword) {
                        document.getElementById('txtConfirmNewPassword').classList.add('is-invalid');
                        hasError = true;
                    } else {
                        document.getElementById('txtConfirmNewPassword').classList.remove('is-invalid');
                    }
                    
                    if (hasError) {
                        return;
                    }
                    
                    // Simulate successful password reset
                    Swal.fire({
                        title: "Password Reset Successful!",
                        text: "Your password has been updated. You can now log in with your new password.",
                        icon: "success"
                    }).then(() => {
                        loadPage('frmLogin', 'frmForgotPassword');
                    });
                });
                
                // Set up cancel button handler
                document.getElementById('btnCancelReset').addEventListener('click', function() {
                    loadPage('frmLogin', 'frmForgotPassword');
                });
            });
        });
    }
});