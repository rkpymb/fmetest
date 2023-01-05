import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const AboutAccordion = () => {
  return (
    <div style={{padding: '10px'}}>
     
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>What We Do ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Much like our name, we take care of all the aspects of your event needs! FlairMyEvent works towards bridging the gap between customers and vendors to make event planning and execution a hassle-free affair. Depending on your requirement, you can choose from a vast pool of vendors with varied skills to provide the best of their services to you. Concerned with the glitches confronted in the arrangements and executing any kind of event, the visionary entrepreneurs Jyotsna Kompalli and Nagaraju Kompalli conceived the FlairMyEvent platform to redefine the assistance for any of your event-related needs.
            </p>
            <p>
              For vendors, we strive to optimize your revenue by creating profiles, organizing your available time, and promoting it online to improve the reach to customers. For the customer, we want to give the power of information to you so that you can make an informed choice for the event. With this, we aim to facilitate a stress-free event planning experience by offering the full line of best-in-class services. Taking care of each aspect in managing your events, we provide you the details of all the available service providers. For those who would like to simplify the vendor engagements, we even have pre-planned packages. All you have to do is sit back and relax!
            </p>
            <p>
              We are happy to share that our Company has been recognized by the Government of India as a start-up and have been encouraged to create employment. We connect you with the right vendor who is looking to extend the service for your requirement. The convenience of knowing the vendor to the extent possible before you hire is one of the most valuable empowerments you would appreciate as you proceed. We save your time and effort to get connected with just the right vendor instantly without compromising your privacy. You can plan your event in a much better and secure way by utilizing the information we bring to you through our platform.
            </p>
            <p>
              Tired of calling vendors to find out their AVAILABILITY, quote, and then comparing and choosing? Such a waste of time! With FlairMyEvent, a complete list of only the available vendors is curated. You will also be given information about their skillset, cost quotation, and a detailed service description to help you choose the best and make your event a success with minimal effort. All you have to so is browse through various service categories with a large pool of vendors for any event that you are looking for to find the best match at the best cost! The most alluring part of FlairMyEvent is that you can see the vendor presenting his business in person on the digital platform. This empowers you to make an informed decision to hire the services as a tool to make your moment. Bid your worries goodbye and book an event service now! Your one-stop solution for all the vendor and services requirements is now FREE, and just a click away!
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Why Go With us ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Much like our name, we take care of all the aspects of your event needs! We are bridging the gap between customers and vendors to make Event Planning and execution a hassle-free affair. Depending on your requirement, you can choose from a vast pool of vendors with varied skills to provide the best of their services to you. Concerned with the glitches confronted in the arrangements and executing any kind of event, the visionary entrepreneurs Jyotsna Kompalli and Nagaraju Kompalli conceived the FlairMyEvent platform to redefine the assistance for any of your event-related needs. For vendors, we strive to optimize their revenue by creating their profile, organizing their available time, and promote it online to improve the reach to the end customer. For the customer, we want to give the power of information to make an informed choice for the event. With this, we aim to get the perfect peace of mind by offering the full line of best-in-class services. Taking care of each aspect in managing your events, we provide you the details of all the available service providers.For those who would like to simplify the vendor engagements, we have customizable packages for the most hassle-free operations.
            </p>
            <p>
              We are happy to share that the Government of India has recognized our Company as a start-up, and they have encouraged us to create employment. We connect you with the right vendor who is looking to extend the service for your requirement. The convenience of knowing the vendor to the extent possible before you hire is one of the most valuable empowerments you would appreciate as you proceed. We save your time and effort to get connected with just the right vendor instantly without compromising your privacy. You can plan your event in a much better and secure way by utilizing the information we bring to you through our platform. We provide you with predefined event packages for your celebration so that you can relax and just enjoy the moment.
            </p>
            <p>
              Are you tired of calling vendors to find out their availability, quotations, and then comparing and choosing? Such a waste of time! With FlairMyEvent, a complete list of ONLY AVAILABLE vendors is at your service with their skillset, cost quotation, and a detailed service description mentioned to help you choose the best and make your event a success with minimal effort. Browse through various service categories with a large pool of vendors for any event that you are looking for to find the best match at the best cost! The best part of FlairMyEvent is that you can see the vendor presenting his business in person on the digital platform. This empowers you to make an informed decision to hire the services as a tool to make your moment. Bid your worries goodbye and book an event service now! Your one-stop solution for all the vendor and services requirements is now FREE, and just a click away!
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>How it Works ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Customer puts an enquiry with the details of the service needed for the event, FlairMyEvent team confirms the requirement and broadcasts the lead to the respective vendors. Vendors bids for the enquiry which is shared with the customer. Customer gets to see all the bids and the vendor profiles without even answering any call from the vendor/s but gets all the relevant information at a click. Customer selects the vendor and makes the payment which is collected by the company. Our dedicated customer service team then coordinates for the requirement and makes sure that the respective service reaches the customer in the most professional way.
            </p>
           
            
          </AccordionDetails>
        </Accordion>
       
      </div>
    
    </div>
  )
}

export default AboutAccordion
