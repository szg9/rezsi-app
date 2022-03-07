import Add from './Add.js';
// import Filter from './Filter.js';
import Button from './Button.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttractionRepository from './repository/AttractionRepository';

export default function Attractions() {
  const history = useNavigate();
  const [rezsiAdatok, setRezsiAdatok] = useState([]);
  // const [settlements, setSettlements] = useState([]);
  // const [selectedSettlement, setSelectedSettlement] = useState();

  useEffect(() => {
    getAllRezsiAdatok();
    // getAllSettlements();
  }, [])

  async function getAllRezsiAdatok() {
    const rezsiAdatok = await AttractionRepository.getAll()
    setRezsiAdatok(rezsiAdatok);
  }

  // async function getAllSettlements() {
  //   const settlements = await AttractionRepository.getDistinctSettlements();
  //   setSettlements(settlements);
  // }

  // async function getAttractionsBySettlement(settlement) {
  //   const attractions = await AttractionRepository.getAllBySettlement(settlement);
  //   setAttractions(attractions);
  // }

  function convertDate(timestamp) {
    const year = new Date(timestamp * 1000).toLocaleString("hu-HU", { year: "numeric" })
    const month = new Date(timestamp * 1000).toLocaleString("hu-HU", { month: "long" })
    return (year + " " + month)
  }

  function handleEditOnClick(id) {
    history.push(`/attraction/edit/${id}`);
  }

  async function handleDeleteOnClick(id) {
    await AttractionRepository.remove(id);
    getAllRezsiAdatok();
  }

  // function handleFilterChange(event) {
  //   const select = event.currentTarget;

  //   setSelectedSettlement(select.value);

  //   if (select.value === '') {
  //     getAllAttractions();
  //   }
  //   else {
  //     getAttractionsBySettlement(select.value);
  //   }
  // }

  /* Filter kivéve az Add / után
        <Filter
        value={selectedSettlement}
        handleFilterChange={handleFilterChange}
        settlements={settlements} />
  */

  return (
    <main className="container">
      <h1>Adatok</h1>
      <Add />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Rögzítés időpontja</th>
            <th>Villanyóra állás</th>
            <th>Gázóra állás</th>
            <th>Vízóra állás</th>
            <th>Megjegyzés</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {rezsiAdatok.map((rezsiAdat, index) => (
            <tr key={index}>
              <td>{convertDate(rezsiAdat.rogzites.seconds)}</td>
              <td>{rezsiAdat.villany_ora}</td>
              <td>{rezsiAdat.gaz_ora}</td>
              <td>{rezsiAdat.viz_ora}</td>
              <td>{rezsiAdat.comment}</td>
              <td>
                <Button name="Módosítás" type="primary" onClick={() => handleEditOnClick(rezsiAdat.id)} />
                <Button name="Törlés" type="danger" onClick={() => handleDeleteOnClick(rezsiAdat.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
