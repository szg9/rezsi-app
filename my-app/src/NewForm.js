import Form from './Form';
import GraphLink from './GraphLink';
import ReturnLink from './ReturnLink';

export default function NewForm() {
  return (
    <main className="container">
      <h1>Új adat felvitele</h1>
      <Form type={"new"} />
      <ReturnLink />
      <GraphLink />
    </main>
  );
}
