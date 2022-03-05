export default function Alert({ type, message }) {
    return (
        <div className={`alert alert-${type} mt-3`} role="alert">{message}</div>
    )
}