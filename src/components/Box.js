import { useState } from "react"
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
            {isOpen ? <span className="circleMinus"><FontAwesomeIcon icon={faCircleMinus} /></span> : <span className="circlePlus"><FontAwesomeIcon icon={faCirclePlus} /> </span>}
            </button>
    
            {isOpen && children}
        </div>
    )
}