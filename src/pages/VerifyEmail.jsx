import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const location = useLocation();

  const [countdown, setCountdown] = useState(3); // seconds

  useEffect(() => {
    let verificationCheck;
    let countdownTimer;
    

    if (!location.state?.fromSignup) {
      navigate("/signup");
    }

    if (user) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => (prev === 1 ? 3 : prev - 1));
      }, 1000);

      verificationCheck = setInterval(async () => {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          clearInterval(verificationCheck);
          clearInterval(countdownTimer);
          navigate("/home");
        }
      }, 3000); // every 3 seconds
    }

    return () => {
      clearInterval(verificationCheck);
      clearInterval(countdownTimer);
    };
  }, [location, navigate, user]);

  const handleResend = async () => {
    if (user && !user.emailVerified) {
      await user.sendEmailVerification();
      alert("Verification email resent.");
    }
  };

  const handleWrongEmail = () => {
    auth.signOut(); // Sign the user out before going back
    navigate("/signup");
  };

  return (

    <div className="verify-email-background">
    <div className="verify-email-box">
        <h2>Verify Your Email</h2>
        <p>We’ve sent a verification link to your <b>{user?.email}</b>.. Please check your inbox.</p>
        <div className="countdown-text">Checking verification status... ({countdown}s)</div>

        <button className="resend-btn" onClick={handleResend}>
        Resend Verification Email
        </button>
        <br />
        
        <button className="btn secondary-btn" onClick={handleWrongEmail} style={{ marginTop: "1rem" }}>
            Wrong email? Go back to Signup
        </button>
  </div>
</div>
  );
};

export default VerifyEmail;
