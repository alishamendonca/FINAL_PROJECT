import { useState,useEffect } from "react";
import UsersService from "../Axios/UsersService";
import moment from "moment";
import {Calendar,momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer= momentLocalizer(moment);



const MyCalendar = () => {

  const usersService = UsersService();
  const [events,setEvents]=useState<any[]>([]);

  useEffect(()=>{
    const fetchEvents=async ()=>{
      try{
        const response=await usersService().getEventList();
        setEvents(response.data);
      }catch(error){
        console.error('Error fetching events:',error);
      }

    };
    fetchEvents();
  },[]);

  const eventList=events.map((event)=>({
    title:event.eventname,
    start:new Date(`${event.date} ${event.time}`),
    end: new Date(`${event.date} ${event.endtime}`),
  }));

  return (
    <>
      <Calendar 
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{height:600,backgroundColor: '#F2F1EB'}}
       />
    </>
  )
}
export default MyCalendar;
