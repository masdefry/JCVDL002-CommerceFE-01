import { useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./ForgotPasswordScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../actions/userAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
const ForgetPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit handler : " + newPassword + "-" + newPassword)
    if (newPassword !== confirmNewPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(forgotPassword({ email: email, newPassword: newPassword }));
    }
  };

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.leftSide}>
          <h3>FORGOT PASSWORD</h3>
        </div>
        <div className={classes.rightSide}>
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            {error && <Message variant="danger">{error}</Message>}
            <input
              type="text"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default ForgetPasswordScreen;
