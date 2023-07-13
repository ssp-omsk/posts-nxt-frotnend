import { useSession, signIn, signOut } from "next-auth/react";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import firebase_app from "../services/firebase";

export default function Auth() {
  const { data: session } = useSession();

  const fetchServer = async () => {
    const auth = getAuth(firebase_app)
    
      auth.currentUser!.getIdToken()
      .then(function (idToken) {
        console.log("idToken", idToken);
        // Send token to your backend via HTTPS
        // ...
      })
      .catch(function (error) {
        // Handle error
      });

    if (!session) return;
    console.log("session.jwt", session.jwt);
    const res = await fetch("http://localhost:5139/Test/auth", {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + session.jwt }),
    });
    console.log("res", res);
  };

  if (session) {
    return (
      <>
        <Image src={session.user?.image} alt="image" width={30} height={30} />
        Signed in as {session.user?.name} ({session.user?.email}) <br />
        {JSON.stringify(session)}
        <br />
        <button className="btn btn-primary" onClick={() => signOut()}>
          Sign out
        </button>
        <button className="btn btn-secondary" onClick={() => fetchServer()}>
          Fetch
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button className="btn btn-primary" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
