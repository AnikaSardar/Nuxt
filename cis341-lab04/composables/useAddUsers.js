export const useAddUsers = () => {

  const users = useState('users'); // store users list from the global state in users

  const addUser = (user) => {
    // both username and age must be entered to add to the list
    if (user.name && user.age) {

    // get the last user's Id 
    const userIndex = users.value.length - 1;
    const lastUserId =  users.value[userIndex].id;
      
      // create a new user with incremented id
      const newUser = { 
        id: lastUserId + 1, // new user id 
        name: user.name, 
        age: user.age 
      };
      
      // add the user to the users array
      users.value.push(newUser);
    } 
    else {
      return "Please fill out both name and age fields.";
    }
  };

  return { addUser };
};

  
 
 

 
