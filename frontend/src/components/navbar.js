import '../css/navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div>        
            <div className='navbar'>
            <div className='heading'>
                <Link className='link' to="/">Photogram</Link>
            </div>
            <div className='items'>
                <ul className='ul'>
                    <button className='button'><li className='listItem'><Link className='link' to="/">Home</Link></li></button>
                    <button className='button'> <li className='listItem'><Link className='link' to="/">News</Link></li></button>
                    <button className='button'> <li className='listItem'><Link className='link' to="/">Contact</Link></li></button>
                    <button className='button'>  <li className='listItem'><Link className='link' to="/">About</Link></li></button>
                </ul>
            </div>
            <div className='login'>
                <ul className='ul'>
                    <li className='listItem'><Link className='link' to="/">Sign up</Link></li>

                </ul>
            </div>
        </div>
        </div>
    )
}
export default Navbar

