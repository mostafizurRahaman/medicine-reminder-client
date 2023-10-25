import React, { ChangeEvent } from "react";
import { ClickEventType } from "./types";

interface ChildrenProps {
   children: React.ReactNode;
}
interface buttonProps {
   containerStyles?: string;
   text: string;
   action?: ClickEventType;
   children?: React.ReactNode;
   isDisabled?: boolean;
}

interface InputTextProps {
   type: string;
   label?: string;
   name: string;
   placeholder?: string;
   action?: (e: ChangeEvent<HTMLInputElement>) => void;
   initialValue?: string;
   containerStyles?: string;
   err?: string;
   disabled?: boolean;
}

interface LoginType {
   password: string;
   email: string;
}

interface LoginError {
   password: string;
   email: string;
   general: string;
}

interface RegisterType extends LoginType {
   name: string;
   phone: string;
   confirm: string;
   role: string;
}

interface RegisterError extends LoginError {
   name: string;
   phone: string;
   confirm: string;
   role: string;
}
interface User {
   _id?: string;
   name: string;
   email: string;
   role: "admin" | "patient";
   status: "active" | "in-active";
}
interface AuthInfoType {
   user: null | User;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
   loading: boolean;
   logOut: () => void;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CommonModalProps {
   children: React.ReactNode;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   containerStyles?: string;
}

interface ReminderTypes {
   medicineName: string;
   userName?: string;
   email?: string;
   dosage: number;
   phone: string;
   careTakerName: string;
   careTakerPhone: string;
   medicineTakingsDays: string[];
   reminderDate: string;
   remindAt: string;
}
interface ReminderErrors {
   medicineName: string;
   dosage: string;
   phone: string;
   careTakerName: string;
   careTakerPhone: string;
   medicineTakingsDays: string;
   reminderDate: string;
   remindAt: string;
}
export type {
   buttonProps,
   InputTextProps,
   LoginError,
   LoginType,
   RegisterError,
   RegisterType,
   AuthInfoType,
   User,
   ChildrenProps,
   CommonModalProps,
   ReminderTypes,
   ReminderErrors,
};
