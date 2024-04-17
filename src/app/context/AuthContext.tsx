"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "~/firebase/config";

type AuthUser = {
  firebaseId: string;
  email: string;
  phone?: string;
  name?: string;
  photoURL?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      setLoading(true);
      if (authUser) {
        if (pathname === "/signin") router.push("/gallery");
        const formattedUser: AuthUser = {
          firebaseId: authUser.uid,
          email: authUser.email || "",
          phone: authUser.phoneNumber || "",
          name: authUser.displayName || "",
          photoURL: authUser.photoURL || "",
        };
        setUser(formattedUser);
        // axios.post('/api/headOffice/login', {
        //   ...formattedUser
        // }).then((res) => {
        //   setUser(res.data.user);
        // })
      } else {
        if (pathname === "/gallery") router.push("/signin");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!user;

  const contextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
