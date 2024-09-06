import React, { createContext, useEffect, useState } from "react";
import { checkIfCurrentUserIsAnEmployee, checkIfCurrentUserIsAnSME, getSMEDataHandler, onAuthStateChangedListener } from "../utils/firebase/firebase";
import { TSMEEmployee } from "../types";
import { User } from "firebase/auth";
type THackathonContext = {  
    userAuth: User | null;
    setUserAuth: null | React.Dispatch<User>;
    queue: any;
    setQueue: null | React.Dispatch<any>;
    sme: Tsme | null;
    setSME: null | React.Dispatch<any>;
    loading: boolean;
    setLoading: null | React.Dispatch<any>;
    employee: TSMEEmployee | null;
    setEmployee: null | React.Dispatch<any>;
    staffList: TSMEEmployee[];
    setStaffList: null | React.Dispatch<TSMEEmployee[]>;
    currentUser: TCurrentUser | null;
    setCurrentUser: null | React.Dispatch<TCurrentUser>;
};

type TCurrentUser = {
    email: string;
    uid: string;
    displayName: string;
};


type Tsme = {
    smeName: string;
    ownerUid: string;
    queue?: [];
    employee?: [];
};

export const HackathonContext = createContext<THackathonContext>({ //this is the context that we are using to store the userAuth and queue so that we can access them in the app component and the signIn component
    userAuth: null,
    setUserAuth: null,
    queue: [],
    setQueue: null,
    sme: null,
    setSME: null,
    loading: true,
    setLoading: null,
    employee: null,
    setEmployee: null,
    staffList: [],
    setStaffList: null,
    currentUser: null,
    setCurrentUser: null,
});

export const HackathonProvider = ({ children }: any) => { //this is the provider that we are using to wrap the app component so that we can access the userAuth and queue in the app component and the signIn component
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [queue, setQueue] = useState([]);
    const [sme, setSME] = useState<Tsme | null>(null);
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState(null);
    const [staffList, setStaffList] = useState<TSMEEmployee[]>([]);
    const [currentUser, setCurrentUser] = useState<TCurrentUser | null>(null);

    useEffect(()=> {
        const unsubscribe = onAuthStateChangedListener((user: User) => {
            //  if(user) {
            //      createUserDocumentFromAuth(user)
            //  }
             setUserAuth(user)
             setCurrentUser({ email: user?.email as string, uid: user?.uid as string, displayName: user?.displayName as string })
             setLoading(false)
         })
 
         return unsubscribe;
     }, [])

     useEffect(() => {
        // Check if user is an SME, set SME state and queue
        // check if user is an Employee, and set the employee sme state

        const getSmeData = async () => {
            const isSME = await checkIfCurrentUserIsAnSME(userAuth);
            const isEmployee = await checkIfCurrentUserIsAnEmployee(userAuth);

            try {
                
                if(isSME) {
                    const response = await getSMEDataHandler(currentUser?.email as string);
                    setSME({ smeName: response?.smeName, ownerUid: response?.ownerUid, queue: response?.queue, employee: response?.employees });
                } else if(isEmployee) {
                    const response = await getSMEDataHandler(isEmployee);
                    setSME({ smeName: response?.smeName, ownerUid: response?.ownerUid, queue: response?.queue, employee: response?.employees });
                } else {
                    console.log('User is not an SME or an Employee')
                }

            } catch (error) {
                console.log(error)
            }
        }

        getSmeData();
     }, [userAuth, currentUser, setSME])

    const value = { userAuth, setUserAuth, queue, setQueue, sme, setSME, loading, setLoading, employee, setEmployee, staffList, setStaffList, currentUser, setCurrentUser };

    return (
        <HackathonContext.Provider value={value}>
            {children}
        </HackathonContext.Provider>
    );
};