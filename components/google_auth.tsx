import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FC } from "react";
import firebase_app from "../services/firebase";
import { useAuthContext } from "../pages/_app";

export const GoogleAuth: FC = () => {
  const auth = getAuth(firebase_app);
  const { user } = useAuthContext();

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    if (res) {
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = res.user;
      console.log("token", token);
      console.log("user", user);
      
      const jwt = auth.currentUser!.getIdToken()
      console.log("jwt", jwt);
    }
  };

  if (user)
    return (
      <>
        Loged in as {user.displayName}
        <button className="btn btn-primary" onClick={() => signOut(auth)}>
          Sign out
        </button>
      </>
    );

  return (
    <>
      <button className="btn btn-primary" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
};
