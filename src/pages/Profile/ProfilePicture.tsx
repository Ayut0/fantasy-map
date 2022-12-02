import React from "react";

type Props = {
  picture: string | undefined;
};

const ProfilePicture: React.FC<Props> = ({
  picture = "images/no-profile-pic.jpeg",
}) => {
  return <img style={{ width: "50%" }} src={picture} alt="profile-picture" />;
};

export default ProfilePicture;
