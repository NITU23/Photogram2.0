import  '../css/name.css'
import flower from '../images/flower.jpeg'

function Name() {
    return (
    <div >
      <div className='profile' >
        <img className="nameUrl" src ={flower}/>
      <div className='name'>Nitin Vyas <br/>
      <span className='subheading'>Jaipur</span>
      </div>
      </div>

        </div>)
}
export default Name;
