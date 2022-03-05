import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AttractionRepository from './repository/AttractionRepository';
import Form from './Form';

export default function EditForm() {
    const { id } = useParams();
    const [attraction, setAttraction] = useState(null);

    useEffect(() => {
        AttractionRepository.getOneById(id)
            .then((atr) => {
                setAttraction(atr);
            });
    }, [id]);

    return (
        <main className="container">
            <h1>Látványosság módosítása</h1>
            { attraction && <Form type={"edit"} attraction={attraction} />}
        </main>
    );
}
