import React from "react";

type Props = {
  picture?: string;
};

const ProfilePicture: React.FC = () => {
  return (
      <img
        style={{ width: "50%" }}
        src="https://library.sportingnews.com/styles/facebook_1200x630/s3/2022-10/Victor%20Wembanyama%20100722.jpeg?itok=1vOhoeJt"
        alt="profile-picture"
      />
  );
};

export default ProfilePicture;
