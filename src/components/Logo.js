import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo() {
    return (
        <div className="logo">
            <span className="icon"><FontAwesomeIcon icon={faFilm} /></span>
            <h1 className="title">movies</h1>
        </div> 
    )
}