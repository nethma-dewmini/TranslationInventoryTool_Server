require('dotenv').config();
const connectDB = require('./src/config/db');
const cron = require('node-cron');
const User = require('./src/models/User');

async function startCronJobs() {
    await connectDB();

    cron.schedule('0 2 * * *', async () => {
        const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        try {
            const result = await User.deleteMany({
                roleStatus: 'Rejected',
                deletedAt: { $lte: cutoff }
            });

            console.log(`[CRON] Deleted ${result.deletedCount} rejected users older than 30 days.`);
        } catch (err) {
            console.error('[CRON] Failed to delete rejected users:', err);
        }
    });

    console.log('Cron job scheduled for deleting rejected users daily at 2:00 AM');
};

startCronJobs().catch(err => {
    console.error('Cron failed to start:', err);
    process.exit(1);
});