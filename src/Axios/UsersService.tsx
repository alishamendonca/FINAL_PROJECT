import axios from "./axios";


// const UsersService = () => {
//     const services = () => {
//         return {
//             getUserList : async()=>{
//                 return await axios.get('/users');
//             },
//             addUser : async (data: object) => {
//                 return await axios.post('/users',data);
//             }
//         };
//     };
//     return services;

// };

// export default UsersService;




//import axios from "./axios";

const UsersService = () => {
  const services = () => {
    return {
      getUserList: async () => {
        return await axios.get('/users');
      },
      addUser: async (data:object) => {
        try {
          const response = await axios.post('/users', data);
          return response.data; // Return the data from the response
        } catch (error) {
          throw error; // Rethrow the error for handling in the component
        }
      },
      getEventList: async () => {
        return await axios.get('/event');
      },
      addEvent: async (data:object) => {
        try {
          const response = await axios.post('/event', data);
          return response.data; // Return the data from the response
        } catch (error) {
          throw error; // Rethrow the error for handling in the component
        }
      }

    };
  };
  return services;
};

export default UsersService;
