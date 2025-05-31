import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { UserProfile } from '../../server/routes/types';

export const Profile: FC = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile');
      setLoading(false);

      if(response.ok) {
        const data = await response.json();
        setProfileData(data);
        setIsAuthenticated(true);
        return;
      } 
      
      if (response.status === 401) {
        setIsAuthenticated(false);
        setProfileData(null);
        return;
      } 

      throw new Error(`Failed to fetch profile data. response status: ${response.status}`);
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile">
      {loading && <LoadingState />}
      {!loading && !isAuthenticated && <UnauthenticatedState />}
      {profileData && <ProfileData data={profileData} />}
    </div>
  );
};

const LoadingState: FC = () => {
  return <h1>Loading profile...</h1>;
};

const UnauthenticatedState: FC = () => {
  return <h1>Not authenticated. Please log in.</h1>;
};

interface ProfileDataProps {
  data: UserProfile;
}

const ProfileData: FC<ProfileDataProps> = ({ data }) => {
  return (
    <>
      {data.profilePhoto && (
        <div className="profile-image">
          <img 
            src={data.profilePhoto} 
            alt="Profile Photo" 
            style={{ 
              width: '96px', 
              height: '96px', 
              borderRadius: '50%', 
              objectFit: 'cover' 
            }} 
          />
        </div>
      )}
      <h1>Welcome {data.givenName}</h1>
    </>
  );
};
