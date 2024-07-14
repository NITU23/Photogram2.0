import './name.css'
import user from '../../images/user.jpeg'
import { useNavigate } from 'react-router-dom'
function Name(props) {
  const navigate = useNavigate()
    const viewProfile =(username) =>{
      navigate(`/profile/${username}`)
    }
  return (
      <div className='profile' >
        <img className="nameUrl" alt='' src={props.profilePic? "data:image/png;base64," + props.profilePic: user} />
        <div className='name' onClick={()=>viewProfile(props.username)} >{props.username} <br />
          <span className='subheading'>{props.location}</span>
        </div>

      </div>
    )
}
export default Name;
