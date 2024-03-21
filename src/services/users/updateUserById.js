import userData from "../../data/users.json";

export const updateUserById = (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const user = userData.users.find((users) => users.id === id);
  if (!user) throw new Error(`User ${id} not found`);

  user.username = username ?? user.username;
  user.password = password ?? user.password;
  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;
  user.profilePicture = profilePicture ?? user.profilePicture;

  return user;
};
