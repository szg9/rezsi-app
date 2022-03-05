import Add from './Add.js';
import Filter from './Filter.js';
import Button from './Button.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttractionRepository from './repository/AttractionRepository';

export default function Attractions() {
  const history = useNavigate();
  const [attractions, setAttractions] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [selectedSettlement, setSelectedSettlement] = useState();

  useEffect(() => {
    getAllAttractions();
    getAllSettlements();
  }, [])

  async function getAllAttractions() {
    const attractions = await AttractionRepository.getAll()
    setAttractions(attractions);
  }

  async function getAllSettlements() {
    const settlements = await AttractionRepository.getDistinctSettlements();
    setSettlements(settlements);
  }

  async function getAttractionsBySettlement(settlement) {
    const attractions = await AttractionRepository.getAllBySettlement(settlement);
    setAttractions(attractions);
  }

  function handleEditOnClick(id) {
    history.push(`/attraction/edit/${id}`);
  }

  async function handleDeleteOnClick(id) {
    await AttractionRepository.remove(id);
    getAllAttractions();
  }

  function handleFilterChange(event) {
    const select = event.currentTarget;

    setSelectedSettlement(select.value);

    if (select.value === '') {
      getAllAttractions();
    }
    else {
      getAttractionsBySettlement(select.value);
    }
  }

  return (
    <main className="container">
      <h1>Látványosságok</h1>
      <Add />
      <Filter
        value={selectedSettlement}
        handleFilterChange={handleFilterChange}
        settlements={settlements} />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Megnevezés</th>
            <th>Település</th>
            <th>Cím</th>
            <th>Kategória</th>
            <th>Ajánlott</th>
            <th>Nem</th>
            <th>Ár</th>
            <th>Megjegyzés</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {attractions.map((attraction, index) => (
            <tr key={index}>
              <td>{attraction.name}</td>
              <td>{attraction.settlement}</td>
              <td>{attraction.address}</td>
              <td>{attraction.category}</td>
              <td>{attraction.recommended && attraction.recommended.join(', ')}</td>
              <td>{attraction.gender}</td>
              <td>{attraction.price}</td>
              <td>{attraction.note}</td>
              <td>
                <Button name="Módosítás" type="primary" onClick={() => handleEditOnClick(attraction.id)} />
                <Button name="Törlés" type="danger" onClick={() => handleDeleteOnClick(attraction.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
