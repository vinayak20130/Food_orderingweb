import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    const authentication = getAuth();
    let uid = "";
    createUserWithEmailAndPassword(authentication, data.email, data.password)
      .then((response) => {
        uid = response.user.uid;
        sessionStorage.setItem("User Id", uid);
        sessionStorage.setItem(
          "Auth token",
          response._tokenResponse.refreshToken
        );
        window.dispatchEvent(new Event("storage"));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already In Use");
        }
      });

    fetch("http://localhost:8080/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        _id: uid,
      }),
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          toast
            .success("Account created successfully!🎉", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
            .then(() => navigate("/Login")); // Added this line
        } else {
          console.log(response.json());
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    {...register("name")}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    {...register("password")}
                  />
                </div>
                <button
                  type="submit"
                  className="addTOCart__btn"
                  disabled={loading}
                >
                  {loading ? "Loading" : "Sign Up"}
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
              <ToastContainer />
        </Col>
      </Row>
    </Container>
  </section>
</Helmet>
);
};

export default Register;