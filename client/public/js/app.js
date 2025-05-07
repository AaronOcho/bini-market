document.addEventListener('DOMContentLoaded', () => {
    
    ui.init();

    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
});


function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function closePaymentModal() {
    ui.closePaymentModal();
}

function submitPayment() {
    ui.submitPayment();
}


document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    if (email === CONFIG.ADMIN_EMAIL && password === CONFIG.ADMIN_PASSWORD) {
        window.location.href = '/admin';
    } else {
        utils.showError('Invalid credentials');
    }
});