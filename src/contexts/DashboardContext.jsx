import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

const DashboardContext = createContext();

export function useDashboard() {
  return useContext(DashboardContext);
}

export default function DashboardProvider({ children }) {
  const [employeesList, setEmployeesList] = useState([]);

  async function updateEmployeesList() {
    const employeesRef = query(collection(db, 'employees'), where("status", "!=", "Modified"));
    const employeesSnapshot = await getDocs(employeesRef);
    const employeesList =
      employeesSnapshot
        .docs
        .map(doc => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
              birthDate: doc.data().birthDate.toDate(),
              admissionDate: doc.data().admissionDate.toDate()
            }
          }
        });
    setEmployeesList(employeesList);
  }

  useEffect(() => {
    updateEmployeesList();
  }, []);

  return (
    <DashboardContext.Provider value={{
      employeesList,
      updateEmployeesList
    }}>
      {children}
    </DashboardContext.Provider>
  );
}