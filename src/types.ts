export type TSMEEmployee = {
    id: string;
    name: string;
    email: string;
    role: string;
    smeEmail?: string;
}

export type Ticket = {
    id: number | string; // Change id type to string for formatted IDs
    name: string;
    status: string;
    ready: string | number;
    email?: string; // Optional email field
    phone?: string; // Optional phone field
};

// export type TStaff = {
//     id: string;
//     name: string;
//     email: string;
// }