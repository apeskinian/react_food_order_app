import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'

export default function Header() {
    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt='restaurant logo'/>
                <h1>Apeskinian's Rest Bites</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    )
}