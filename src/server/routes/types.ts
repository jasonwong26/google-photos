
/** User information stored in the session.  For Server use ONLY */
export interface AuthenticatedUser {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  profilePhoto: string;
  accessToken: string;
  refreshToken?: string;
};

/** User Profile information.  For Client UX. */
export type UserProfile = Pick<AuthenticatedUser, 'id' | 'name' | 'profilePhoto' | 'givenName' | 'familyName'>;

/** Profile information returned by the Google Auth API. */ 
export interface GoogleProfile {
  provider: 'google',
  sub: string,
  id: string,
  displayName: string,
  name: { givenName: string, familyName: string},
  given_name: string,
  family_name: string,
  photos: unknown[],
  picture: string,
}