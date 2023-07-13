import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../pages/_app";
import firebase_app from "../../services/firebase";
import Image from "next/image";
import { Constants } from "../../constants/constants";
import Link from "next/link";

export const UserNav: FC = () => {
  const auth = getAuth(firebase_app);
  const { user, isAdmin } = useAuthContext();

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

      const jwt = auth.currentUser!.getIdToken();
      console.log("jwt", jwt);
    }
  };

  if (user)
    return (
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <li tabIndex={0}>
            <a>
              {user.photoURL && (
                <Image
                  className="rounded-full"
                  width={30}
                  height={30}
                  src={user.photoURL}
                  alt={user.displayName ?? ""}
                />
              )}
              {user.displayName}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-300 z-10 left-auto right-0">
              {isAdmin && (
                <li>
                  <Link href={'/admin'}>Админка</Link>
                </li>
              )}
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a onClick={() => signOut(auth)}>Выход</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );

  return (
    <>
      <button className="btn btn-primary" onClick={() => signIn()}>
        Вход
      </button>
    </>
  );
};
