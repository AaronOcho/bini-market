const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://Ocho%20Database_owner:npg_5BDhT1UzSWRA@ep-morning-frog-a10qopdc-pooler.ap-southeast-1.aws.neon.tech/Ocho%20Database?sslmode=require'
});

module.exports = pool;