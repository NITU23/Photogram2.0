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
                    <button className='button'><li className='listItem'><Link className='link' to="/">All Photos</Link></li></button>
                    <button className='button'> <li className='listItem'><Link className='link' to="/">My Photos</Link></li></button>
                    <button className='button'>  <li className='listItem'><Link className='link' to="/">Profile</Link></li></button>
                </ul>
            </div>
            <div className='login'>
                <ul className='ul'>
                <button className='button'>   <li className='listItem'><Link className='link' to="/">Sign up</Link></li></button>
                </ul>
            </div>
        </div>
        </div>
    )
}
export default Navbar

