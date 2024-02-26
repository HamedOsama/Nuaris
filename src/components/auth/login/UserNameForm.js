import React, { useState, useRef } from "react";
import axios from "../../../util/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import FormBackButton from "../../ui/form-elements/FormBackButton";

const UserNameForm = ({ setShowLoginForm, userTypeSelected }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [, setCookie] = useCookies(["token"]);
  const form = useRef(null);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const navigate = useNavigate();

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/login/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);
      toast.success(`Welcome Back @${formData.username}`);
      setCookie("token", res.data.access_token, {
        path: "/",
        expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        secure: true,
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Incorrect username or password");
      form.current.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <input
        required
        type="text"
        name="userName"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password ?</Link>
      <div className="buttons">
        <FormBackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
};

export default UserNameForm;
