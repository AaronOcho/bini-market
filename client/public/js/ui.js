const ui = {
    elements: {
        postsGrid: document.getElementById('postsGrid'),
        searchInput: document.getElementById('searchInput'),
        sortSelect: document.getElementById('sortSelect'),
        loginModal: document.getElementById('loginModal'),
        paymentModal: document.getElementById('paymentModal'),
        paymentDetails: document.getElementById('paymentDetails'),
        telegramUsername: document.getElementById('telegramUsername'),
        paymentScreenshot: document.getElementById('paymentScreenshot'),
        previewImage: document.getElementById('previewImage'),
        themeToggle: document.getElementById('themeToggle')
    },

    currentPost: null,
    currentPaymentMethod: null,

    init() {
        this.setupEventListeners();
        this.loadPosts();
    },

    setupEventListeners() {
        this.elements.searchInput.addEventListener('input', 
            utils.debounce(() => this.filterPosts(), 300)
        );
        this.elements.sortSelect.addEventListener('change', 
            () => this.filterPosts()
        );
        this.elements.paymentScreenshot.addEventListener('change', 
            (e) => this.handleImageUpload(e)
        );
        this.elements.themeToggle.addEventListener('click', 
            () => this.toggleTheme()
        );
    },

    async loadPosts() {
        try {
            const posts = await api.getPosts();
            this.renderPosts(posts);
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    },

    renderPosts(posts) {
        this.elements.postsGrid.innerHTML = posts.map(post => `
            <div class="post-card">
                ${post.media_urls ? `
                    <img src="${post.media_urls[0]}" alt="${post.title}" class="post-image">
                ` : ''}
                <h3 class="post-title">${post.title}</h3>
                <p>${post.description}</p>
                <p class="post-price">${utils.formatPrice(post.price)}</p>
                <p class="post-stock">Stock: ${post.stock}</p>
                <div class="payment-buttons">
                    ${post.payment_methods.map(method => `
                        <button class="payment-btn" 
                            onclick="ui.showPaymentModal('${post.id}', '${method}')">
                            Pay with ${method}
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('');
    },

    showPaymentModal(postId, paymentMethod) {
        this.currentPost = postId;
        this.currentPaymentMethod = paymentMethod;
        
        this.elements.paymentDetails.innerHTML = `
            <h3>${paymentMethod} Payment Details</h3>
            <p class="payment-info">
                ${paymentMethod === PAYMENT_METHODS.GCASH 
                    ? `GCash Number: ${CONFIG.GCASH_NUMBER}`
                    : `Binance ID: ${CONFIG.BINANCE_ID}`}
            </p>
        `;
        
        this.elements.paymentModal.style.display = 'block';
    },

    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            utils.validateImage(file);
            const preview = await utils.createImagePreview(file);
            this.elements.previewImage.innerHTML = `<img src="${preview}" alt="Payment Screenshot">`;
        } catch (error) {
            utils.showError(error.message);
            event.target.value = '';
            this.elements.previewImage.innerHTML = '';
        }
    },

    async submitPayment() {
        const telegramUsername = this.elements.telegramUsername.value;
        const screenshot = this.elements.paymentScreenshot.files[0];

        if (!telegramUsername || !screenshot) {
            utils.showError('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('postId', this.currentPost);
        formData.append('telegramUsername', telegramUsername);
        formData.append('paymentMethod', this.currentPaymentMethod);
        formData.append('screenshot', screenshot);

        try {
            await api.submitPayment(formData);
            alert('Payment submitted successfully! Admin will verify through Telegram.');
            this.closePaymentModal();
        } catch (error) {
            console.error('Error submitting payment:', error);
        }
    },

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    },

    closePaymentModal() {
        this.elements.paymentModal.style.display = 'none';
        this.elements.telegramUsername.value = '';
        this.elements.paymentScreenshot.value = '';
        this.elements.previewImage.innerHTML = '';
    }
};