import CardListItem from "../CardListItem";

export default function CardList({ employees, historic }) {
  return (
    <div className="card-list">
      {employees.map((employee, index) => (
        <CardListItem key={index} employee={employee.data} employeeId={employee.id} historic={historic}/>
      ))}
    </div>
  );
}