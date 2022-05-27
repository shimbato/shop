import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { signInUser } from "../fetchers/signInUser";
import { setToken } from "../store/slice/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthSubmit = useCallback(
    (user) => {
      signInUser({ email: user.email, password: user.password })
        .then(({ idToken }) => {
          dispatch(setToken(idToken));
          navigate("/shop");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <LoginForm onAuthSubmit={handleAuthSubmit} />
      <p style={{ textAlign: "center" }}>
        No account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
};
