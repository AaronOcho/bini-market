const multer = require('multer');
const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


async function initializeTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                user_id INTEGER REFERENCES users(id),
                status VARCHAR(50) DEFAULT 'available',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS images (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
                image_data BYTEA NOT NULL,
                mime_type VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES posts(id),
                buyer_telegram VARCHAR(255) NOT NULL,
                payment_method VARCHAR(50) NOT NULL,
                payment_proof BYTEA,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id),
                content TEXT NOT NULL,
                sender VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        
        await pool.query(`
            INSERT INTO users (username, email, password, is_admin)
            VALUES ('admin', 'coletbini2025@gmail.com', 'coletbini2025', true)
            ON CONFLICT (email) DO NOTHING;
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
}


initializeTables().catch(console.error);


const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});


async function saveFileToDatabase(file, postId) {
    const query = `
        INSERT INTO images (post_id, image_data, mime_type)
        VALUES ($1, $2, $3)
        RETURNING id
    `;
    
    try {
        const result = await pool.query(query, [
            postId,
            file.buffer,
            file.mimetype
        ]);
        return result.rows[0].id;
    } catch (error) {
        throw error;
    }
}


async function getFileFromDatabase(imageId) {
    const query = `
        SELECT image_data, mime_type
        FROM images
        WHERE id = $1
    `;
    
    try {
        const result = await pool.query(query, [imageId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}


async function savePaymentProof(file, orderId) {
    const query = `
        UPDATE orders
        SET payment_proof = $1
        WHERE id = $2
        RETURNING id
    `;
    
    try {
        const result = await pool.query(query, [
            file.buffer,
            orderId
        ]);
        return result.rows[0].id;
    } catch (error) {
        throw error;
    }
}


async function getPaymentProof(orderId) {
    const query = `
        SELECT payment_proof
        FROM orders
        WHERE id = $1
    `;
    
    try {
        const result = await pool.query(query, [orderId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    upload,
    saveFileToDatabase,
    getFileFromDatabase,
    savePaymentProof,
    getPaymentProof,
    pool
};