import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../firebase-config";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const authentication = getAuth();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("User Id");
    const storedAuthToken = sessionStorage.getItem("Auth token");

    if (storedUserId && storedAuthToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  const onSubmit = (data) => {
    setLoading(true);
    let uid = "";
    signInWithEmailAndPassword(authentication, data.email, data.password)
      .then((response) => {
        uid = response.user.uid;
        sessionStorage.setItem("User Id", uid);
        sessionStorage.setItem("Auth token", response._tokenResponse.refreshToken);
        window.dispatchEvent(new Event("storage"));
        setLoading(false);
        toast.success("Successful Login!🎉", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoggedIn(true);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Wrong Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Email not found, please register");
        }
        setLoading(false);
      });
  };

  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        setLoggedIn(false);
        sessionStorage.removeItem("User Id");
        sessionStorage.removeItem("Auth token");
        toast.success("Logged out successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error("Error logging out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              {!loggedIn && (
                <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form__group">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form__group">
                    <input{...register("password")}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="addTOCart__btn">
                {loading ? "Loading" : "Login"}
              </button>
            </form>
          )}
          {!loggedIn && (
            <Link to="/register">
              Don't have an account? Create an account
            </Link>
          )}
          {loggedIn && (
            <>
              <p>Logged in</p>
              <button className="addTOCart__btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  </section>
</Helmet>
);
};

export default Login;
