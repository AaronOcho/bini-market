const utils = {
    formatPrice: (price) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(price);
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showError: (message) => {
        alert(message);
    },

    validateImage: (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024; 

        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Please upload a JPEG or PNG image.');
        }

        if (file.size > maxSize) {
            throw new Error('File size too large. Maximum size is 5MB.');
        }

        return true;
    },

    createImagePreview: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    }
};