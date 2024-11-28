import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Authorization code is missing or invalid' });
    }

    try {
        const tokenResponse = await axios.post(
            'https://discord.com/api/oauth2/token',
            new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID || '',
                client_secret: process.env.DISCORD_CLIENT_SECRET || '',
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.DISCORD_REDIRECT_URI || '',
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token } = tokenResponse.data;

        const userResponse = await axios.get<DiscordUser>('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const user = userResponse.data;

        res.redirect(`/profile?avatarUrl=https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png&username=${user.username}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to authenticate with Discord' });
    }
};

export default handler;
