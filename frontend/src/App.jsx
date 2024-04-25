import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UserAuth from "./UserAuth";

const App = () => {
  const [userId, setUserId] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [hasJoin, sethasJoin] = useState(false);

  const socket = io("http://localhost:5100");

  useEffect(() => {
    socket.on("Connected Successfully", () => {
      alert("Room Joined Successfully");
      sethasJoin(true);
    });
  }, [socket]);

  const handleJoinRoom = () => {
    // alert("cool");
    let userInfo = {
      usrname: "username",
      userId: userId,
    };
    socket.emit("joinRoom", userInfo);
  };
  const handleSend = () => {
    console.log("Message : ", message);
    socket.emit("sendMessage", {
      message: message,
      userId: userId,
    });
    setmessage("");
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setmessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  useEffect(() => {
    console.log("Alll messages :", messages);
  }, [messages]);

  return (
    <div>
      <h1 className="text-success mt-5 text-center ">Chat APP</h1>
      {!hasJoin ? (
        <div className="col-11 col-md-8 col-lg-5 mx-auto shadow p-3 rounded-3 d-grid gap-3">
          <input
            placeholder="Enter Your User Id"
            className="form-control"
            type="text"
            onChange={(ev) => setUserId(ev.target.value)}
          />
          <button onClick={handleJoinRoom} className="btn btn-success">
            Join Room
          </button>
        </div>
      ) : null}

      {hasJoin ? (
        <div className="col-11 col-md-8 col-lg-5 mx-auto shadow p-3 rounded-3 d-grid gap-3">
          <div className="ddd">
            <div className="parent">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <p
                    key={index}
                    className={message.userId === userId ? "sender" : "others"}
                  >
                    {message.message}
                  </p>
                ))
              ) : (
                <div>No Messages currently</div>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              onChange={(ev) => setmessage(ev.target.value)}
              placeholder="Enter Message..."
              className="form-control "
              type="text"
              name=""
              id=""
            />
            <button onClick={handleSend} className="btn btn-success">
              Send
            </button>
          </div>
        </div>
      ) : null}

      <UserAuth />
    </div>
  );
};

export default App;
