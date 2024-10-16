export const useGetUsers = () => {

  // array of user obj
  const users = useState("users", () => [
    { id: 1, name: 'Tom', age: 55 },
    { id: 2, name: 'Tor', age: 45 }
  ]);

  return { users };
};


  