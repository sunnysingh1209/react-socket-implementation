import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../context/webSocketContext";

type MessagePayload = {
  content: string;
  id: number;
  createdAt: string;
};

export const WebSocket = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<MessagePayload[]>([]);
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("receiveMessage", (msg: MessagePayload) => {
      //   receiveMessage(msg);
      console.log("Message Received!");
      console.log(msg);
      setMessage((prev) => [...prev, msg]);
    });

    return () => {
      console.log("UnRegistered Event");
      socket.off("connect");
      socket.off("receiveMessage");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("sendMessage", value);
    setValue("");
  };
  return (
    <div>
      <div>
        <h1>WebSocket Component</h1>
        <div>
          {message.length === 0 ? (
            <div>No Message</div>
          ) : (
            <div>
              {message.map((data) => (
                <div>
                  <p> {data.content}</p>
                  <p> {data.id}</p>
                  <p> {data.createdAt}</p>
                  <p>//////////////////</p>
                </div>
              ))}
            </div>
          )}{" "}
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
