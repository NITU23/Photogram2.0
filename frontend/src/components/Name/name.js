import './name.css'
import user from '../../images/user.jpeg'
function Name(props) {
  return (

      <div className='profile' >
        <img className="nameUrl" alt='' src={props.profilePic? "data:image/png;base64," + props.profilePic: user} />
        <div className='name'>{props.username} <br />
          <span className='subheading'>{props.location}</span>
        </div>

      </div>
    )
}
export default Name;
