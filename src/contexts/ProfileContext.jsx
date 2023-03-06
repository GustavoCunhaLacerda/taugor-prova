import { createContext, useContext, useReducer, useRef } from "react";
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
    currProfile.current = null;
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
    const employeeData = emp || formData;

    await addDoc(collection(db, "employees"), {
      id: currProfile.current ? employeeData.id : Math.random().toString(36),
      name: employeeData.name,
      surname: employeeData.surname,
      profileImage: employeeData.profileImage,
      genre: employeeData.genre,
      email: employeeData.email,
      address: employeeData.address,
      phone: employeeData.phone,
      nacionality: employeeData.nacionality,
      birthDate: Timestamp.fromDate(new Date(convertToDate(employeeData.birthDate))),
      role: employeeData.role,
      admissionDate: Timestamp.fromDate(new Date(convertToDate(employeeData.admissionDate))),
      sector: employeeData.sector,
      salary: employeeData.salary,
      status: dismissal ? "Inactive" : "Active",
      created_by: { user_uid: currentUser.uid,  },
      created_at: Timestamp.fromDate(new Date()),
      update_at: Timestamp.fromDate(new Date())
    });


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