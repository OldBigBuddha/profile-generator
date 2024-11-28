import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI || '');
    const clientId = process.env.DISCORD_CLIENT_ID || '';
    const scope = 'identify';

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    res.redirect(discordAuthUrl);
};

export default handler;
