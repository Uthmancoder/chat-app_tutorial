import React, { useState } from "react";

const UserAuth = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    console.log("Data : ", data);
  };
  return (
    <div>
      <form
        action=""
        className="col-11 col-md-8 col-lg-6 mx-auto mt-5 rounded-3 p-3 shadow"
      >
        <h1 className="text-center my-2 text-success">Sign In</h1>
        <input
          className="form-control my-2 mt-2"
          type="text"
          placeholder="Email"
          onChange={(ev) => setemail(ev.target.value)}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Email"
          onChange={(ev) => setpassword(ev.target.value)}
        />
        <button onClick={handleSubmit} className="btn btn-success mt-3 w-10">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserAuth;
