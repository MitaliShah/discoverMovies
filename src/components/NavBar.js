import Logo from "./Logo";

export default function NavBar({ children }) {
    return (
        <nav className="navbar">
            <Logo />
            {children}
        </nav>
    )
}