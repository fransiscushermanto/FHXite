import React, { useEffect, useState, useRef } from "react";
import instance from "../../../../instance";

const Subscribe = () => {
  const [addUser, setAddUser] = useState({
    email: ""
  });

  const addUserSubmit = async e => {
    e.preventDefault();
    const username = addUser.email;
    try {
      const response = await instance.post("/api/client/subs", { username });
      if (response.status === 200) {
        document.getElementById("subscribe-text").value = "";
        alert("Sucess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="subscribe" onSubmit={e => addUserSubmit(e)}>
      <div className="container">
        <div id="title">
          <p>Subscribe to keep updated!</p>
        </div>
        <div id="wrap-input">
          <input
            type="email"
            id="subscribe-text"
            placeholder="example@gmail.com"
            required
            value={addUser.email}
            onChange={e => setAddUser({ ...addUser, email: e.target.value })}
          />
          <button type="submit" className="btn btn-submit">
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
};

export default Subscribe;
