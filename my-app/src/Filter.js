export default function Filter({ selectedSettlement, handleFilterChange, settlements }) {
    return (
        <select className="form-select mb-3" value={selectedSettlement} onChange={handleFilterChange}>
            <option value="">Mindegyik</option>
          {
        settlements.map(settlement => {
            return <option key={settlement} value={settlement}>{settlement}</option>;
        })
    }
        </select >
    )
}