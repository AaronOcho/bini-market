const api = {
    getPosts: async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/posts`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            return await response.json();
        } catch (error) {
            utils.showError('Error loading posts');
            throw error;
        }
    },

    createPost: async (postData) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'email': CONFIG.ADMIN_EMAIL,
                    'password': CONFIG.ADMIN_PASSWORD
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) throw new Error('Failed to create post');
            return await response.json();
        } catch (error) {
            utils.showError('Error creating post');
            throw error;
        }
    },

    submitPayment: async (formData) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/submit-payment`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Failed to submit payment');
            return await response.json();
        } catch (error) {
            utils.showError('Error submitting payment');
            throw error;
        }
    }
};