
  // //have composables for adding the user, and have composables for getting the user

  // export const useAddUsers = () => {
  //   const usersList = useState('users');

  //   const usersListLastIndex = users.value[usersList.value.length - 1]; // lastIndex = length - 1 

  //   //usersList.value[usersListLastIndex].name && usersList.value[usersListLastIndex].age
  
  //   const addUser = (user) => {
  //     // const newUser = { ...user, id: users.value.length + 1 }; 
  //     // users.value.push(newUser);

  //     if (user.value.name && user.value.age) {    
        
  //       const newUser = { id: usersList.value[usersListLastIndex].id++, name: user.value.name, age: user.value.age }; 
  //       users.value.push(newUser);
  //       }
  //     else{
  //       return "Please fill out this field."
  //     }
  //     }
  //     return { addUser}
  //   };
  
 
  //have composables for adding the user, and have composables for getting the user

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
  
  
 
 

 
