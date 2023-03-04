import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardList from "../../components/CardList";
import Header from "../../components/Header";
import { db } from "../../firebase";

export default function Historic({ }) {
  const { id } = useParams();
  const [employeeHistoric, setEmployeeHistoric] = useState([]);

  async function getEmployeeHistoric() {
    const employeesRef = query(collection(db, 'employees'), where("id", "==", id));
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
    setEmployeeHistoric(employeesList.sort(function (a, b) {
      return a.data.modified_at === b.data.created_at ? 0 : a.data.created_at > b.data.created_at ? -1 : 1;
    }));
  };

  useEffect(() => {
    getEmployeeHistoric();
  }, []);

  return (
    <>
      <Header pageName="Histórico do Funcionário" />
      <div className="cardListContainer" style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <CardList employees={employeeHistoric} historic />
      </div>
    </>
  )
}