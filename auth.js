// Authentication functions
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI(); // Update UI on page load

    // Setup logout functionality
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateAuthUI();
            window.location.href = 'index.html';
        });
    }

    // Check if login form exists and set it up
    if (document.getElementById('login-form')) {
        setupLoginForm();
    }

    // Check if signup form exists and set it up
    if (document.getElementById('signup-form')) {
        setupSignupForm();
    }
});

// Update UI based on authentication state
function updateAuthUI() {
    const userGreeting = document.getElementById('user-greeting');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // User is logged in
        if (userGreeting) userGreeting.textContent = `Hello, ${currentUser.name}`;
        if (logoutLink) logoutLink.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
    } else {
        // User is not logged in
        if (userGreeting) userGreeting.textContent = '';
        if (logoutLink) logoutLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (signupLink) signupLink.style.display = 'block';
    }
}

// Set up login form
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    const errorElement = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            updateAuthUI();
            window.location.href = 'index.html'; // Redirect to home after login
        } else {
            errorElement.textContent = 'Invalid email or password';
            errorElement.style.display = 'block';
        }
    });
}

// Set up signup form
function setupSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const errorElement = document.getElementById('signup-error');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            errorElement.style.display = 'block';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        const emailExists = users.some(u => u.email === email);

        if (emailExists) {
            errorElement.textContent = 'Email already in use';
            errorElement.style.display = 'block';
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Login the new user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        updateAuthUI();
        window.location.href = 'index.html'; // Redirect to home after signup
    });
}