const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Define your environment variables (these should be added in Render)
const BOT_TOKEN = process.env.BOT_TOKEN;
const GROUP_ID = process.env.GROUP_ID;

// POST endpoint to check subscription
app.post('/checkSubscription', async (req, res) => {
  const { user_id } = req.body;

  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember`,
      {
        params: {
          chat_id: GROUP_ID,
          user_id: user_id,
        },
      }
    );

    const isMember = response.data.result.status !== 'left';
    res.json({ is_subscribed: isMember });
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ error: 'Failed to check subscription status' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
