import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

interface ProfileCardProps {
    avatarUrl: string;
    username: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ avatarUrl, username }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const downloadImage = async () => {
        if (!cardRef.current) return;

        const dataUrl = await toPng(cardRef.current);
        const link = document.createElement('a');
        link.download = `${username}-profile.png`;
        link.href = dataUrl;
        link.click();
    };

    return (
        <div>
            <div
                ref={cardRef}
                style={{
                    width: '400px',
                    height: '200px',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f3f3f3',
                    position: 'relative',
                    flexDirection: 'column',
                }}
            >
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                <h3>{username}</h3>
            </div>
            <button onClick={downloadImage}>Download as PNG</button>
        </div>
    );
};

export default ProfileCard;
