import React, { useState, Fragment, useEffect } from "react";
import { Button, Card, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Imagesdata } from "../../commondata/commonimages";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { UserLoginSchema } from "../../commondata/formvalidations";
import Loader from "../layoutcomponents/loader";
import { publicRequest } from "../../utils/baseApi";
import toast, { ToastBar } from "react-hot-toast";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useLoginEndPointMutation } from "../../redux/features/AuthenticationEndPoints";

const initialValues = {
  email: "",
  password: "",
};
function Authlogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const RouteChange = () => {
    let path = `/dashboard`;
    navigate(path);
  }

  const [login, { isLoading: loading }] = useLoginEndPointMutation()
  document.querySelector("body").classList.add("login-img");
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: UserLoginSchema,
      onSubmit: async (values) => {
        try {
          setLoader(true)
          const res = await login(values)
          if (res.data.http_status_code === 200) {
            RouteChange()
            setLoader(false)
            toast.success(res.data.message)
            dispatch(loginSuccess(res.data.data));
          }
        } catch (error) {
          console.log(error);
          setLoader(false)
          console.log(Date());
          toast.error(error.response.data.message)
        }
      }
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("showPassword:", showPassword);
  };

  return (
    <>
      {loader && <Loader /> || loading && <Loader />}
      <Row>
        <Col lg={4} md={6} sm={8} xs={11} className="d-block mx-auto">
          <Card>
            <div className="text-center mt-3">
              <img
                src={Imagesdata("mainLogo1")}
                className="header-brand-img"
                alt=""
              />
            </div>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <span className="login100-form-title">Login</span>
                <Row className="mb-3">
                  <Form.Group>
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <i
                          className="fe fe-mail fs-5"
                          style={{ fontWeight: 500 }}
                        ></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </div>
                    {errors.email && touched.email ? (
                      <p className={`error`}>{errors.email}</p>
                    ) : null}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group>
                    <div className="input-icon">
                      <span
                        className="input-icon-addon pe-auto"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <p className={`error`}>{errors.password}</p>
                    ) : null}
                  </Form.Group>
                </Row>
                <Row className="mb-3 text-end m-0">
                  <Link
                    to={`${import.meta.env.BASE_URL
                      }custompages/forgotPassword/`}
                    className="text-primary ms-1"
                  >
                    Forgot Password?
                  </Link>
                </Row>
                <Row className="mb-3 m-0">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    variant="primary"
                  >
                    Login
                  </Button>
                </Row>
                <Row>
                  {/* <p className="text-dark text-center mb-0">
                    Not a member?
                    <Link
                      to={`${import.meta.env.BASE_URL}auth/signup/`}
                      className="text-primary ms-1"
                    >
                      Sign Up
                    </Link>
                  </p> */}
                </Row>
              </Form>
            </Card.Body>
            {/* <Card.Footer>
                <div className="d-flex justify-content-center my-3">
                  <Link to="#" className="social-login  text-center me-4">
                    <i className="fa fa-google"></i>
                  </Link>
                  <Link to="#" className="social-login  text-center me-4">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="#" className="social-login  text-center">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </div>
              </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Authlogin;
