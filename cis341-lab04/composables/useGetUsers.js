export const useGetUsers = () => {
  const users = useState("users");

  //if empty, set an inti val
  if (!users.value) {
    users.value = {
      1: "John Doe",
      2: "Jane Smith",
    };
  }
  return { users };
};
