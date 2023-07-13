import "../styles/globals.css";
import type { AppProps } from "next/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "../services/firebase";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Constants } from "../constants/constants";
import { useRouter } from "next/router";
import nookies from "nookies";
import axios from "axios";

const auth = getAuth(firebase_app);

interface IAuthContext {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: null,
  isAdmin: false,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState<string | null>(null);
  const router = useRouter();

  const setInterceptor = async (user: User | null) => {
    if (!user) {
      console.log("setInterceptor call", user, null);
      axios.interceptors.request.clear();
      return;
    }
    const token = await user.getIdToken();
    console.log("setInterceptor call", user, token);

    axios.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          // deleted checking if initial state value contains isAuthentificated = true
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Do something before request is sent
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    if (router.asPath.includes("/admin") && !isAdmin && !loading)
      router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, isAdmin]);

  useEffect(() => {
    if (Constants.adminUrls.includes(user?.email ?? "")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, loading]);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setToken(token);
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInterceptor(user);
        setUser(user);
      } else {
        setInterceptor(null);
        setUser(null);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isAdmin, token }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
