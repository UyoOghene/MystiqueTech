document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('login-form')) {
        setupLoginForm();
    } else if (document.getElementById('signup-form')) {
        setupSignupForm();
    }
});

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
            window.location.href = 'shop.html';
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
        
        const emailExists = users.some(u => u.email === email);
        
        if (emailExists) {
            errorElement.textContent = 'Email already in use';
            errorElement.style.display = 'block';
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Login the new user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'shop.html';
    });
}
