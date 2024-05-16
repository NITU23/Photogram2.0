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
                    <li className='listItem'><Link className='link' to="/">Home</Link></li>
                    <li className='listItem'><Link className='link' to="/">News</Link></li>
                    <li className='listItem'><Link className='link' to="/">Contact</Link></li>
                    <li className='listItem'><Link className='link' to="/">About</Link></li>
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

