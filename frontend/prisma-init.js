const { execSync } = require('child_process');
require('dotenv').config();

try {
    console.log('Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

    console.log('Running prisma db push...');
    execSync('npx prisma db push', { stdio: 'inherit', env: process.env });

    console.log('Success!');
} catch (error) {
    console.error('Failed:', error.message);
}
