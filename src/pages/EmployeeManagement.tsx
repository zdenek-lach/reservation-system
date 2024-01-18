import { useState } from 'react';
import { Button, Dropdown, Form, Modal, Table } from 'react-bootstrap';
import { useDoctors } from 'hooks/useDoctors';
import Doctors from 'types/DoctorType';
import { useAppContext } from 'context/AppContext';

const EmployeeManagement = () => {
  
  const { doctorList } = useAppContext();
  const employee  = doctorList;
  const { loadingDoctors, errorDoctors } = useDoctors();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Doctors | null>(
    null
  );

  const handleShowModal = (employee: Doctors) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  const handleDeleteEmployee = (employee: Doctors) => {
    // Add your logic to delete the employee from the data source here
    console.log(`Deleting employee ${employee.id}`);
  };

  const handleAddEmployee = () => {
    // Add your logic to add a new employee to the data source here
    console.log('Adding a new employee');
  };

  const handleEditEmployee = (employee: Doctors) => {
    // Add your logic to edit the employee in the data source here
    console.log(`Editing employee ${employee.id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <Dropdown className="mr-2">
            <Dropdown.Toggle variant="secondary" id="ambulance-dropdown">
              Ambulance
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Ambulance Orlová</Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Ambulance Český Těšín
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Ambulance Ostrava</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="role-dropdown">
              Role
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Doktor</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Sestra</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Správce</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Form>
          <Form.Control
            type="text"
            placeholder="Vyhledat"
            className="mr-sm-2"
          />
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Číslo</th>
            <th>Titul</th>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Ambulance</th>
            <th>Role</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {employee != null && employee.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.title}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.availableClinics.join(', ')}</td>
              <td>{employee.title}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="mr-1"
                  onClick={() => handleShowModal(employee)}
                >
                  i
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="mr-1"
                  onClick={() => handleEditEmployee(employee)}
                >
                  ✏️
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteEmployee(employee)}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleAddEmployee}>
        Přidat nového zaměstnance
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informace o zaměstnanci</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <p>
                <strong>Číslo:</strong> {selectedEmployee.id}
              </p>
              <p>
                <strong>Titul:</strong> {selectedEmployee.title}
              </p>
              <p>
                <strong>Jméno:</strong> {selectedEmployee.firstName}
              </p>
              <p>
                <strong>Příjmení:</strong> {selectedEmployee.lastName}
              </p>
              <p>
                <strong>Ambulance:</strong>{' '}
                {selectedEmployee.availableClinics.join(', ')}
              </p>
              <p>
                <strong>Role:</strong> {selectedEmployee.title}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
