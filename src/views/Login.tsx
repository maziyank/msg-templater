import React, { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
    const { user, signInUsingGoogle } = useContext(FirebaseContext)
    const history = useHistory();

    useEffect(() => {
        if (user) {
            history.push("/main/account");
        }
    });

    return (
        <React.Fragment>
            <div className="absolute inset-y-0 inset-x-0 z-20 flex flex-col justify-center w-full h-screen bg-base-200">
                <Link to={'/main'}>
                    <button className="btn btn-circle bg-secondary btn-sm absolute top-3 right-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </Link>
                <h1 className="text-2xl text-center">Login</h1>
                <p className="text-sm text-center px-10">Please login using <br /> your social media acocunt </p>
                <div className="w-screen p-3 space-y-4 mt-10 grid justify-center">
                    <button className="btn btn-primary w-60" onClick={signInUsingGoogle}>
                        Google
                    </button>
                    <button className="btn btn-primary w-60">
                        Twitter
                    </button>
                    <button className="btn btn-primary w-60">
                        Github
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
