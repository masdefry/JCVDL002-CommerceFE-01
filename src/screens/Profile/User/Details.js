import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getUserDetails, updateUserProfile, changePassword, updateUser } from "../../../actions/userAction";
import { useEffect, useState } from "react";
import classes from "./Details.module.css";
import DropNotif from "../../../components/Modal/Modal";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstants";

const Details = ({ history }) => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateLoading = userUpdateProfile.loading;
  const updateError = userUpdateProfile.error;
  const { success } = userUpdateProfile;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [] );

  // useEffect(() => {
  //   // if (!user || !user.name) {
  //   //   dispatch(getUserDetails("profile"));
  //   // } else {
  //   //   setName(user.name);
  //   //   setEmail(user.email);
  //   // }
  //   // dispatch(getUserDetails("profile"));
  //   console.log("BEWE userEffect history : " + history)
  //   console.log("BEWE userEffect userInfo : " + JSON.stringify(userInfo))
  //   console.log("BEWE userEffect user : " + JSON.stringify(user))
  // }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("Password do not match");
    } else {
      if(fullname){
        dispatch(updateUser({ fullname: fullname, dob: dob, gender: gender }));
      }else{
        dispatch(changePassword({ password: password, newPassword: newPassword }));
      }
      
    }
  };
  
  return (
    <div className={classes.wrapper}>
      <h2>User Profile</h2>
      {success && (
        <DropNotif
          heading="Update Password"
          text="Update Password Successfully"
          resetData={() => {
            dispatch(getUserDetails());
          }}
        ></DropNotif>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      {updateLoading && <Loader />}
      {updateError && <Message variant="danger">{updateError}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="fullname">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group> 

        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <button className={classes.update} type="submit" variant="primary">
          Update
        </button>
      </Form>
    </div>
  );
};

export default Details;
