import { useRouter } from 'next/router';
import ProfileCard from '@/components/ProfileCard';

const Profile: React.FC = () => {
    const router = useRouter();
    const { avatarUrl, username } = router.query;

    if (!avatarUrl || !username || typeof avatarUrl !== 'string' || typeof username !== 'string') {
        return <p>Invalid user data</p>;
    }

    return (
        <div>
            <h1>Profile Card</h1>
            <ProfileCard avatarUrl={avatarUrl} username={username} />
        </div>
    );
};

export default Profile;
