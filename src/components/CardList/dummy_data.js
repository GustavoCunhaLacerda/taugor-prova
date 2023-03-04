const funcionarios = []

function addEmployee(name, genre, address, telephone, photo, birthdate, role, admissionDate, sector, salary, active) {
  funcionarios.push({
    name,
    genre,
    address,
    telephone,
    photo,
    birthdate,
    role,
    admissionDate,
    sector,
    salary,
    active
  })
}

addEmployee('João da Silva', 'Masculino', 'Rua das Flores, 123', '(11) 99999-9999', 'https://randomuser.me/api/portraits/men/41.jpg', '01/01/1990', 'Gerente', '01/01/2010', 'Financeiro', 'R$ 6.000,00', true);
addEmployee('Maria da Silva', 'Feminino', 'Rua das Flores, 123', '(11) 99999-9999', 'https://randomuser.me/api/portraits/women/44.jpg', '01/01/1990', 'Analista', '01/01/2010', 'Financeiro', 'R$ 2.000,00', true);
addEmployee('José da Silva', 'Masculino', 'Rua das Flores, 123', '(11) 99999-9999', 'https://randomuser.me/api/portraits/men/51.jpg', '01/01/1990', 'Supervisor', '01/01/2010', 'Financeiro', 'R$ 12.000,00', false);


export default funcionarios;