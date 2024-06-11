import '../css/name.css'
import flower from '../images/flower.jpeg'

function Name(props) {
  return (
    <div >
      <div className='profile' >
        <img className="nameUrl" alt='' src={flower} />
        <div className='name'>Nitin Vyas <br />
          <span className='subheading'>{props.location}</span>
        </div>
      </div>
    </div>)
}
export default Name;
