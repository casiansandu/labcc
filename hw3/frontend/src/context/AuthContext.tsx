import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockAuthMeEndpoint, mockUsersMeEndpoint } from '../mocks/mockApi';

type AuthUser = {
  userId: number;
  username: string;
  profilePictureUrl: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    setLoading(true);

    try {
      const authData = await mockAuthMeEndpoint();
      const profile = await mockUsersMeEndpoint();

      setUser({
        userId: authData.userId,
        username: authData.username,
        profilePictureUrl: profile.profile_picture_url,
      });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshAuth();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      refreshAuth,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
