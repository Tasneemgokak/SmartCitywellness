import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(auth.currentUser);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Redirect if not from signup
    if (!location.state?.fromSignup) {
      navigate("/signup", { replace: true });
      return;
    }

    // Handle cases where Firebase hasn't populated currentUser yet
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        navigate("/signup", { replace: true });
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [location.state, navigate]);

  useEffect(() => {
    if (!user) return;

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => (prev === 1 ? 3 : prev - 1));
    }, 1000);

    const verificationCheck = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(verificationCheck);
        clearInterval(countdownTimer);
        navigate("/home");
      }
    }, 3000);

    return () => {
      clearInterval(verificationCheck);
      clearInterval(countdownTimer);
    };
  }, [user, navigate]);

  const handleResend = async () => {
    if (user && !user.emailVerified) {
      await user.sendEmailVerification();
      alert("Verification email resent.");
    }
  };

  const handleWrongEmail = () => {
    auth.signOut().then(() => navigate("/signup"));
  };

  return (
    <div className="verify-email-background">
      <div className="verify-email-box">
        <h2>Verify Your Email</h2>
        <p>
          We’ve sent a verification link to <b>{user?.email}</b>. Please check your inbox.
        </p>
        <div className="countdown-text">
          Checking verification status... ({countdown}s)
        </div>
        <button className="resend-btn" onClick={handleResend}>
          Resend Verification Email
        </button>
        <br />
        <button
          className="btn secondary-btn"
          onClick={handleWrongEmail}
          style={{ marginTop: "1rem" }}
        >
          Wrong email? Go back to Signup
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
