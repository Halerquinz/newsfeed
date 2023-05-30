import React, { useEffect, useState } from "react";

export const Conversation: React.FC<{ userChat: number }> = ({ userChat }) => {
  const [userData, setUserData] = useState<{
    firstname: string;
    lastname: string;
    profilePicture: string;
  } | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`http://localhost:5000/user/${userChat}`);
      const dataApi = await response.json();
      setUserData(dataApi.data);
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", borderRadius: "50%", overflow: "hidden" }}
          >
            <div className="online-dot"></div>
            <img
              src={userData?.profilePicture}
              alt=""
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div
            className="name"
            style={{
              fontSize: "1.2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>online</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
