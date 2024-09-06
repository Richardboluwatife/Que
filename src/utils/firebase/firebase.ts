// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth"
import {
    getFirestore,
    doc, //used to retrieve documents from our db in firebase
    getDoc, // used to access the docs
    setDoc, // used to set data in the docs
    // collection,
    // writeBatch,
    // query,
    // getDocs,
    // QuerySnapshot,
    updateDoc
} from "firebase/firestore"
import { Ticket, TSMEEmployee } from "../../types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFdI_KsPH4QimflALObPmjN-t1moz3QBQ",
  authDomain: "queue-hackathon.firebaseapp.com",
  projectId: "queue-hackathon",
  storageBucket: "queue-hackathon.appspot.com",
  messagingSenderId: "108940034300",
  appId: "1:108940034300:web:12a4e389d9363d41ced779"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); //this function is used to sign in with google popup
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
export const signOutUser = async () => signOut(auth);

//Database

export const db = getFirestore(); 

export const createSMEDocumentFromAuth = async (userAuth, queue: []) => { // this function is used to create a user document in the database if the user does not exist in the database already 
    if (!userAuth) return;
    const smeDocRef = doc(db, "sme", userAuth.email); //trying to pass in the data we get from the userauthenticatiion.. it takes the databse first and then the document name and then the uid
    console.log(smeDocRef); //this is the reference to the document in the database
    const smeSnapshot = await getDoc(smeDocRef); //this is the snapshot of the document in the database. The snapshot is the data that is in the document

    if (!smeSnapshot.exists()) { // if the user does not exist in the database, we want to create a new user

        try{
            await setDoc(smeDocRef, { //this is the data that we want to set in the document
                ownerUid: userAuth.uid,
                queue: queue,
            })
        } catch(error: any) {
            console.log("error creating the sme", error.message); //if there is an error, we want to log the error message
        }

        return smeDocRef //this is the reference to the document in the database
    }
}

export const createUserDocumentFromAuth = async (userAuth, smeName) => { // this function is used to create a user document in the database if the user does not exist in the database already 
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.email); //trying to pass in the data we get from the userauthenticatiion.. it takes the databse first and then the document name and then the uid
    console.log(userDocRef); //this is the reference to the document in the database
    const userSnapshot = await getDoc(userDocRef); //this is the snapshot of the document in the database. The snapshot is the data that is in the document

    if (!userSnapshot.exists()) { // if the user does not exist in the database, we want to create a new user

        try{
            await setDoc(userDocRef, { //this is the data that we want to set in the document
                sme: smeName,
                role: "admin",
            })
        } catch(error: any) {
            console.log("error creating the sme", error.message); //if there is an error, we want to log the error message
        }

        return userDocRef //this is the reference to the document in the database
    }
}


// To create an employees collection that stores employees and the company they are related to
// To do this while adding an employee in the frontend, we need to receive the current sme that is logged in email with the employee data
 export const createEmployeeDocument = async (smeEmail: string, employee: TSMEEmployee) => {
    if(!employee) return;
    const employeeDocRef = doc(db, "employeesCol", employee.email);
    const employeeSnapshot = await getDoc(employeeDocRef);

    if (!employeeSnapshot.exists()) {
        try {
            await setDoc(employeeDocRef, {
                name: employee.name,
                role: employee.role,
                smeEmail
            })
        } catch(error: any) {
            console.log("error creating the employee", error.message);
        }
    }

    return employeeDocRef;
 }

 export const checkIfCurrentUserIsAnEmployee = async (userAuth: any) => {
    if (!userAuth) return;
    const employeeDocRef = doc(db, "employeesCol", userAuth.email);
    const employeeSnapshot = await getDoc(employeeDocRef);

    if (employeeSnapshot.exists()) {
        return employeeSnapshot.data().smeEmail;
    } else {
        return false;
    }
 }

 export const checkIfCurrentUserIsAnSME = async (userAuth: any) => {
    if (!userAuth) return;
    const smeDocRef = doc(db, "sme", userAuth.email);
    const smeSnapshot = await getDoc(smeDocRef);

    if (smeSnapshot.exists()) {
        return true;
    } else {
        return false;
    }
 }

 //To create a functions that adds to the queue for an sme
 // We want to allow this for smes and employees
 // If the current user is an sme, we want him to be able to add the pass queue data into the sme queue
 // Also we need to know if the user is an employee, we need to figure out which sme by retrieving his email he is related to and add the queue data to the sme queue

 export const addQueueToSME = async (queueData: Ticket[], smeEmail: string) => {
    const smeDocRef = doc(db, "sme", smeEmail);
    const smeSnapshot = await getDoc(smeDocRef);

    if(smeSnapshot.exists()) {
        const existingQueue = smeSnapshot.data().queue || [];

        const filteredQueue = queueData.filter((queue) => {
            return !existingQueue.some((existingCustomer: { ticketNo: number; nameOfCustomer: string; status: string; email: string; phoneNumber: string; })  => existingCustomer.ticketNo === queue.ticketNo);
        });
    
        if (filteredQueue.length === 0) {
            console.log("No new customers to add.");
            return "No new customers added to the queue.";
          }
    const updatedQueue = [...existingQueue, ...filteredQueue];
        try {
            await updateDoc(smeDocRef, {
                queue: updatedQueue
            })

            return "Queue updated successfully";
        } catch(error: any) {
            console.log("error adding queue to sme", error.message);
        }
    } else {
        return false;
    }
 }

// export const updateSMENames = async (smeName: string, userAuth) => { //this function is used to update the sme name in the database
//     if (!userAuth) return;
//     const smeDocRef = doc(db, "sme", userAuth.uid); //this is the reference to the document in the database
//     try {
//         await setDoc(smeDocRef, { //this is the data that we want to set in the document
//             smeName,
//             ownerUid: userAuth.uid,
//         })
//     } catch(error: any) {
//         console.log("error updating the sme", error.message); //if there is an error, we want to log the error message
//     }
// }


// TODO: updating the smeName in the database
/* 
- create a function called updateSMENames that takes in the smeName and the userAuth
- if there is no userAuth, return
- We basically need to update an existing sme document in the datavase
- We need to get the reference to the sme document in the database
- check if the sme uid exists in the database, if it dooes, update it with the new smeName, if it doesnt, return

*/

export const updateSMENames = async (smeName: string, userAuth) => {
    if (!userAuth) return;
    const smeDocRef = doc(db, "sme", userAuth.email);
    const smeSnapshot = await getDoc(smeDocRef);
    

    if (smeSnapshot.exists()) {
        try {
            await updateDoc(smeDocRef, {
                smeName,
            })
        } catch(error: any) {
            console.log("error updating the sme", error.message);
        }
    } else {
        return;
    }

    return smeSnapshot;
}



export const updateSMEEmployees = async (employee: TSMEEmployee, userAuth) => {
    if (!userAuth) return;
    const employeeDocRef = doc(db, "sme", userAuth.email, "employees", employee.email);
    const employeeSnapshot = await getDoc(employeeDocRef);
    

    if (!employeeSnapshot.exists()) {
        try {
            await setDoc(employeeDocRef, {
                name: employee.name,
                role: employee.role
            })
        } catch(error: any) {
            console.log("error updating the sme employees", error.message);
        }
    } else {
        return "Employee already exists";
    }

    return employeeSnapshot;
}

// We need to create a function that gets an employees data so that we can have access to the smeEmail

// Create a function to delete a a queue from the sme queue
// we need to get the existing queues from firebase, so that means we will need the smeEmail
// we need to filter out the queue that we want to delete, by using the ticketId if it matches the ticketId of the queue we want to delete
// Then delete the returned queue from the existing queue
// return the updated queue

export const deleteQueueFromSME = async (ticketToDelete: Ticket, smeEmail: string) => {
    const smeDocRef = doc(db, "sme", smeEmail);
    const smeSnapshot = await getDoc(smeDocRef);

    if(smeSnapshot.exists()) {
        const existingQueue = smeSnapshot.data().queue || [];

        const updatedQueue = existingQueue.filter((exisitingTicket: Ticket) => exisitingTicket.id !== ticketToDelete.id);
        try {
            await updateDoc(smeDocRef, {
                queue: updatedQueue
            })

            return "Queue updated successfully";
        } catch(error: any) {
            console.log("error deleting queue from sme", error.message);
        }
    } else {
        return false;
    }
}


export const getQueueFromSME = async (smeEmail: string) => {
    const smeDocRef = doc(db, "sme", smeEmail);
    const smeSnapshot = await getDoc(smeDocRef);

    if(smeSnapshot.exists()) {
        return smeSnapshot.data().queue;
    } else {
        return false;
    }
}

export const getEmployeeDocument = async (employeeEmail: string) => {
    const employeeDocRef = doc(db, "employeesCol", employeeEmail);
    const employeeSnapshot = await getDoc(employeeDocRef);

    if(employeeSnapshot.exists()) {
        
        const employeeData = {
            name: employeeSnapshot.data().name,
            email: employeeEmail,
            role: employeeSnapshot.data().role,
            smeEmail: employeeSnapshot.data().smeEmail
        }
        return employeeData;
    } else {
        return false;
    }
}

export const getSMEDataHandler = async (smeEmail: string) => {
    const smeDocRef = doc(db, "sme", smeEmail);
    const smeSnapshot = await getDoc(smeDocRef);

    if(smeSnapshot.exists()) {
        return smeSnapshot.data();
    } 
}