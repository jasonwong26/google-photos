
export interface AuthenticatedUser {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  profilePhoto: string;
  accessToken: string;
  refreshToken?: string;
};

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