import { useContext, useState } from "react";
import {
  addQueueToSME,
  checkIfCurrentUserIsAnEmployee,
  checkIfCurrentUserIsAnSME,
  createEmployeeDocument,
  createSMEDocumentFromAuth,
  signInWithGooglePopup,
  signOutUser,
  updateSMEEmployees,
  updateSMENames,
} from "../utils/firebase/firebase";

import { HackathonContext } from "../context/hackathonContext";
import { TSMEEmployee } from "../types";
import { useNavigate } from "react-router-dom";

// type Props = {};

const SignInWithGoogle = () => {
  const { setUserAuth, userAuth, queue, currentUser, setCurrentUser } =
    useContext(HackathonContext);
    const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      setUserAuth?.(user);
      setCurrentUser?.({ email: user.email as string, uid: user.uid, displayName: user.displayName as string });
      navigate("/admin-staff");
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleCreateSMEDocument = async () => {
    try {
      const smeDocRef = await createSMEDocumentFromAuth(userAuth, queue);
      console.log(smeDocRef);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userAuth);

  const handleUpdateSMEName = async () => {
    try {
      const newSmeDocref = await updateSMENames("Company 1", userAuth);
      console.log(newSmeDocref);
    } catch (error) {
      console.log(error);
    }
  };

  // const [employee, setEmployee] = useState<TSMEEmployee>({
  //   name: "Joe Biden",
  //   email: "adamsfaisal001@gmail.com",
  //   role: "admin",
  // });

  // const handleUpdateSMEEmployee = async () => {
  //   try {
  //     const isSME = await checkIfCurrentUserIsAnSME(userAuth);
  //     if (isSME) {
  //       await updateSMEEmployees(employee, userAuth);
  //       await createEmployeeDocument(userAuth.email, employee);
  //     } else {
  //       console.log("Only company owners can add employees");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSignInAsEmployee = async () => {
    // First check if the current user is an employee
    // If the current user is an employee, we want to sign them in as an employee
    // If not give them an error page that they do not exist as an employee
    // Will use ths function when a user is signing in for the first time and clicks sign in as an employee, if he is an employee, it returns the sme email
    // If not doesnt give access to the page
    try {
      const isEmployee = await checkIfCurrentUserIsAnEmployee(userAuth);
      console.log(isEmployee);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToQueue = async () => {
    // First check if the current user is an employee
    // If the current user is an employee, we want to sign them in as an employee
    // If not give them an error page that they do not exist as an employee
    try {
      console.log(userAuth.email);
      const isSME = await checkIfCurrentUserIsAnSME(userAuth);
      const isEmployee = await checkIfCurrentUserIsAnEmployee(userAuth);

      if (isSME) {
        const response = await addQueueToSME(
          [
            {
              id: 2,
              name: "Kabiru Doe",
              status: "Ready",
              email: "customer2@example.com",
              phone: "+123456789",
              ready: ""
            },
          ],
          userAuth.email
        );
        console.log(response);
      } else if (isEmployee) {
        const response = await addQueueToSME(
          [
            {
              id: 2,
              name: "Kabiru Doe",
              status: "Ready",
              email: "customer2@example.com",
              phone: "+123456789",
              ready: ""
            },
          ],
          isEmployee
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <button
          onClick={handleSignInWithGoogle}
          className="border border-blue-500 p-4"
        >
          Sign In with Google
        </button>
        {/* <button
          onClick={handleSignOut}
          className="border border-blue-500 p-4"
        >
          Sign Out
        </button> */}

        
        {/* <button
          onClick={handleCreateSMEDocument}
          className="border border-blue-500 p-4"
        >
          Signing in as an SME
        </button>
        <button
          onClick={handleUpdateSMEName}
          className="border border-blue-500 p-4"
        >
          Update smeName
        </button>
        <button
          onClick={handleUpdateSMEEmployee}
          className="border border-blue-500 p-4"
        >
          Update SME with an employee
        </button>
        <button
          onClick={handleSignInAsEmployee}
          className="border border-blue-500 p-4"
        >
          Signing in as an employee
        </button>
        <button
          onClick={handleAddToQueue}
          className="border border-blue-500 p-4"
        >
          Add to queue
        </button> */}
      </div>
    </>
  );
};

export default SignInWithGoogle;
