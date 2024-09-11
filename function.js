const axios = require('axios');
const BOT_TOKEN = '6877447588:AAFMMzmyprOTlGcP9hYfNWzczZkqTE0ChEU';
const GROUP_ID = '6087101457';

exports.checkSubscription = async (req, res) => {
    const userId = req.body.user_id;

    try {
        const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember`, {
            params: {
                chat_id: GROUP_ID,
                user_id: userId
            }
        });

        const isMember = response.data.result.status !== 'left';
        res.json({ is_subscribed: isMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check subscription status' });
    }
};
