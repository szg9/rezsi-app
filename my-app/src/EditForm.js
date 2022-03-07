import { useParams } from 'react-router';
import Form from './Form';

export default function EditForm() {
    const { id, title } = useParams()

    return (
        <main className="container">
            <h1>Adat szerkesztése: {title}</h1>
            <Form type={"edit"} id={id} />
        </main>
    );
}