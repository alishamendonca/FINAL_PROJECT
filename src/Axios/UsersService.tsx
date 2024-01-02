//import EditEvent from "../Headerfiles/EditEvent";
import axios from "./axios";




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
      },
      deleteEvent: async (id:number) =>{
        return await axios.delete(`/event/${id}`)
    },
    updateEvent: async (id:number,data:object) =>{
      return await axios.put(`/event/${id}`,data);
    }
    };
  };
  return services;
};

export default UsersService;
