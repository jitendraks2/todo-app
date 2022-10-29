import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
const AccountPage = () => {
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUsername] = useState("");

  const auth = getAuth();
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserID(uid);
    } else {
    }
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      localStorage.clear("todoauthUser");
      localStorage.clear("todoauthUserEmail");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const users = docSnap.data();
        setUsername(users.name);
        setUserEmail(users.email);

        localStorage.setItem("todoauthUserName", users.name);
        localStorage.setItem("todoauthUserEmail", users.email);
      } else {
        console.log("No such document!");
      }
    };

    fetchUserProfile();
  }, [userID]);

  return (
    <section className="p-4 md:p-9 w-full">
      <Helmet>
        <title>Account Page</title>
      </Helmet>
      <div className="md:w-[60%] mx-auto bg-mainbg px-10 py-10 text-white rounded-lg">
        <h1 className="text-3xl font-bold text-center">Your Account</h1>
        {!userName && <div className="info mt-10"> Loading... </div>}
        {userName && (
          <div className="info mt-10">
            <p>
              Your Name:<span className="font-bold"> {userName}</span>
            </p>
            <p>
              Your Email:<span className="font-bold"> {userEmail}</span>
            </p>

            <button
              className="bg-red-500 px-5 py-3 rounded-lg mt-5"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountPage;
