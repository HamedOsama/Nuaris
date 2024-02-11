import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../util/axios";

const EmailForm = ({ formData, setFormData, setResetPasswordStep }) => {
  const [loading, setLoading] = useState(false);

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    url: "/users/forgot-password/",
    headers: headersList,
    data: formData
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.request(requestOptions);
      setResetPasswordStep("s2");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.email &&
        error.response.data.email.length > 0
      ) {
        const errorMessage = error.response.data.email[0];
        toast.error(errorMessage);
        setFormData({ ...formData, email: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        id="email"
        type="email"
        placeholder="EX: mail@mail.com"
        required
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <div className="buttons">
        <Link to="/Login" className="back">
          <i className="fa-light fa-arrow-left" />
        </Link>
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
          className="log"
        >
          Send Code{" "}
          <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
