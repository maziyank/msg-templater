import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import noPhotoUrl from './../assets/nophoto.jpg';
import { RWebShare } from "react-web-share";

const Account = () => {
  const { user, signOut } = useContext(FirebaseContext);

  return (
    <React.Fragment>
      <div className="flex flex-col items-center flex-1 w-full h-full pt-10 overflow-y-auto bg-base-200 select-none">
        <div className="avatar">
          <div className="w-32 h-32 mask mask-squircle">
            <img src={user ? user.photoURL : noPhotoUrl} />
          </div>
        </div>{" "}
        <div className="mt-2 text-2xl font-bold">{user ? user.displayName : 'Anonymous'}</div>{" "}
        <p className="text-sm">{user ? user.email : 'Please sign in'}</p>
        <div className="w-full p-3 shadow-md rounded-box">
          <ul className="menu bg-base-100">
            {!user ? <li> <Link to={'/login'}>Login</Link> </li> : <li> <a onClick={signOut}>Logout</a> </li>}
            <li>
              <RWebShare
                sites={["whatsapp", "copy", "twitter", "linkedin", "telegram", "mail", "linkedin", "facebook"]}
                data={{
                  text: "Share This App",
                  url: "http://msg-templater.web.app",
                  title: "Message Templater",
                }}>
                <a>Share This App</a>
              </RWebShare>
            </li>
            <li>
              <a href="https://saweria.co/maziyank" rel="noopener noreferrer" target="_blank">Support This App</a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account;
