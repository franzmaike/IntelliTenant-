function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if username and password match specific values for admin and superadmin
    if (email === "admin@gmail.com" && password === "admin123") {
        window.location.href = "admin.html"; // Redirect to admin dashboard
    } else if (email === "guard@gmail.com" && password === "guard123") {
        window.location.href = "Guard.html"; // Redirect to superadmin dashboard
    } else if (email === "tenant@gmail.com" && password === "tenant123") {
        window.location.href = "Tenant.html"; // Redirect to Tenant dashboard
    }
      
    else {
        alert("Invalid email or password. Please try again.");
    }
}
  
