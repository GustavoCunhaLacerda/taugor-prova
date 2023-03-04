import { createContext, useContext, useReducer, useRef, useState } from "react";
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db, GetUser } from "../firebase";

import images from "../assets/images";
import { useDashboard } from "./DashboardContext";
import { convertToDate } from "../ultils/date";

const ProfileContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}

export default function ProfileProvider({ children }) {
  const { updateEmployeesList } = useDashboard();

  const currProfile = useRef(null);

  const [formData, updateFormData] = useReducer(
    (state, updatedState) => ({ ...state, ...updatedState }),
    {
      name: "",
      surname: "",
      profileImage: images.profileIcon,
      genre: "",
      address: "",
      phone: "",
      email: "",
      nacionality: "",
      birthDate: "",
      role: "",
      admissionDate: "",
      sector: "",
      salary: 0,
    }
  );

  function resetFormData() {
    updateFormData({
      name: "",
      surname: "",
      profileImage: images.profileIcon,
      genre: "",
      address: "",
      phone: "",
      email: "",
      nacionality: "",
      birthDate: "",
      role: "",
      admissionDate: "",
      sector: "",
      salary: 0,
    });
  }

  async function manageEmployee(e, dismissal = false, emp = null) {
    e.preventDefault();

    const currentUser = GetUser();

    if (emp) {
      await addDoc(collection(db, "employees"), {
        id: currProfile.current ? emp.id : Math.random().toString(36),
        name: emp.name,
        surname: emp.surname,
        profileImage: emp.profileImage,
        genre: emp.genre,
        email: emp.email,
        address: emp.address,
        phone: emp.phone,
        nacionality: emp.nacionality,
        birthDate: Timestamp.fromDate(new Date(convertToDate(emp.birthDate))),
        role: emp.role,
        admissionDate: Timestamp.fromDate(new Date(convertToDate(emp.admissionDate))),
        sector: emp.sector,
        salary: emp.salary,
        status: dismissal ? "Inactive" : "Active",
        created_by: { user_uid: currentUser.uid },
        created_at: Timestamp.fromDate(new Date()),
        update_at: Timestamp.fromDate(new Date())
      });
    } else {
      await addDoc(collection(db, "employees"), {
        id: currProfile.current ? formData.id : Math.random().toString(36),
        name: formData.name,
        surname: formData.surname,
        profileImage: formData.profileImage,
        genre: formData.genre,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        nacionality: formData.nacionality,
        birthDate: Timestamp.fromDate(new Date(convertToDate(formData.birthDate))),
        role: formData.role,
        admissionDate: Timestamp.fromDate(new Date(convertToDate(formData.admissionDate))),
        sector: formData.sector,
        salary: formData.salary,
        status: "Active",
        created_by: { user_uid: currentUser.uid },
        created_at: Timestamp.fromDate(new Date()),
        update_at: Timestamp.fromDate(new Date())
      });
    }


    if (currProfile.current) {
      await setDoc(doc(db, "employees", currProfile.current), {
        status: "Modified",
        update_at: Timestamp.fromDate(new Date()),
      }, { merge: true });
    }

    updateEmployeesList();
  }


  return (
    <ProfileContext.Provider value={{
      formData,
      updateFormData,
      currProfile,
      manageEmployee,
      resetFormData
    }}>
      {children}
    </ProfileContext.Provider>
  );
}