import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface ProfileData {
  [key: string]: any;
}

export const Profile: FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          if (response.status === 401) {
            setError('Not authenticated. Please log in.');
          } else {
            const error = await response.json();
            throw new Error(`HTTP error! status: ${error.message ?? 'unknown error'}`);
          }
          setProfileData(null); // Clear data on auth error
        } else {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile"><h1>Loading profile...</h1></div>;
  }

  if (error) {
    return <div className="profile"><h1>Error</h1><p>{error}</p></div>;
  }

  if (!profileData) {
    return <div className="profile"><h1>Profile page</h1><p>No profile data available.</p></div>;
  }

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(profileData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
