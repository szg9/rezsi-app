import { NavLink } from 'react-router-dom';

export default function Add() {
    return (
        <NavLink to="/attraction/new"><button className="btn btn-primary mb-3">Felvitel</button></NavLink>
    )
}