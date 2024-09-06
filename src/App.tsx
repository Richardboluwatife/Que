import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketTable from "./Admin/AdminTable";
import Userface from "./Component/Userface";

import SignIn from "./firebase_testfolder/signIn";
import EmailNotification from "./Component/EmailNotification";
import Search from "./Component/Search";
import AdminStaff from "./Admin/AdminStaff";
import Adminsidebar from "./Admin/Adminsidebar";
import StaffManager from "./Admin/Staff";
import Company from "./Admin/Company";
import ContributionComponent from "./Component/Contribution";
import { Ticket } from "./types";
import {
  addQueueToSME,
  checkIfCurrentUserIsAnEmployee,
} from "./utils/firebase/firebase";
import { HackathonContext } from "./context/hackathonContext";
import ProtectedRoute from "./Component/ProtectedRoute";
import PublicRoute from "./Component/PublicRoute";
import NotAnEmployee from "./ErrorPages/NotAnEmployee";
import InputCompanyNameForFirstTime from "./InputCompanyNameForFirstTime";
// type Ticket = {
//   id: string; // Change id type to string for formatted IDs
//   name: string;
//   status: string;
//   ready: string;
//   email?: string; // Optional email field
//   phone?: string; // Optional phone field
// };

const App: React.FC = () => {
  const [queue, setQueue] = useState<Ticket[]>(() => {
    const storedTickets = localStorage.getItem("tickets");
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  const { userAuth } = useContext(HackathonContext);

  const handleIdChange = (oldId: string | number, newId: string | number) => {
    setQueue((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === oldId ? { ...ticket, id: newId } : ticket
      )
    );
  };

  const handleNameChange = (id: string | number, newName: string) => {
    setQueue((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, name: newName } : ticket
      )
    );
  };

  const handleEmailChange = (id: number, newEmail: string) => {
    setQueue((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, email: newEmail } : ticket
      )
    );
  };

  const handlePhoneChange = (id: number, newPhone: string) => {
    setQueue((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, phone: newPhone } : ticket
      )
    );
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setQueue((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleReadyChange = (id: number, newReady: number) => {
    setQueue((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, ready: newReady } : ticket
      )
    );
  };

  const handleAddNewTicket = (newTicket: Ticket) => {
    setQueue((prevTickets) => [...prevTickets, newTicket]);
    const setQueueToDB = async () => {
      try {
        const isEmployee = await checkIfCurrentUserIsAnEmployee(userAuth);

        if (isEmployee) {
          await addQueueToSME(queue, isEmployee);
        } else {
          await addQueueToSME(queue, userAuth.email);
        }
      } catch (error) {
        console.log(error);
      }
    };

    setQueueToDB();
  };

  const handleDeleteTicket = (id: number) => {
    setQueue((prevTickets) => {
      const filteredTickets = prevTickets.filter((ticket) => ticket.id !== id);
      // Reorder IDs
      return filteredTickets.map((ticket, index) => ({
        ...ticket,
        id: String(index + 1).padStart(3, "0"), // Assign new ID
      }));
    });
  };

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(queue));
  }, [queue]);

  // If there is no user Auth, return the sign in page
  // If there is user Auth, then allow to access the admin-staff page
  // If user Auth is an employee, then allow to access dashboard
  // If not, show an error that the user is not an employee
  // If user Auth is an SME, then allow to access the dashboard
  // If not, show an error that the user doesnt exist as an sme

  console.log(userAuth)

  return (
    <Router>
      <Routes>
        {/* this is the route the customer will see */}

        <Route path="/signin" element={<PublicRoute />}>
          <Route index element={<SignIn />} />
          <Route path="/signin/ticket-page" element={<Userface />} />
          <Route path="/signin/email-notification" element={<EmailNotification />} />
          <Route path="/signin/search" element={<Search />} />
        </Route>

        {/* this is the admin route */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin-ticket-table"
            element={
              <div className="flex bg-blue-400 h-[679px]">
                <Adminsidebar />
                <TicketTable
                  tickets={queue}
                  onIdChange={handleIdChange}
                  onNameChange={handleNameChange}
                  onEmailChange={handleEmailChange}
                  onPhoneChange={handlePhoneChange}
                  onStatusChange={handleStatusChange}
                  onReadyChange={handleReadyChange}
                  onAddNewTicket={handleAddNewTicket}
                  onDeleteTicket={handleDeleteTicket}
                />
              </div>
            }
          />

          <Route
            path="/staff"
            element={
              <div className="flex bg-blue-400 h-[679px]">
                <Adminsidebar />
                <StaffManager />
              </div>
            }
          />

          <Route
            path="/company"
            element={
              <div className="flex bg-blue-400 h-[679px]">
                <Adminsidebar />
                <Company />
              </div>
            }
          />

          <Route
            path="/admin-staff"
            element={
              <div className="flex bg-blue-400 h-[679px]">
                <Adminsidebar />
                <AdminStaff />
              </div>
            }
          />

          <Route path="/team" element={<ContributionComponent />} />
          <Route path="/company-name" element={<InputCompanyNameForFirstTime />} />
          <Route path="/not-an-employee" element={<NotAnEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
