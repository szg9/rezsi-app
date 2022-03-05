export default function Button({ name, type, onClick }) {
    return (
        <button className={`btn btn-${type}`} onClick={onClick}>{name}</button>
    )
}