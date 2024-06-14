import '../css/name.css'
function Name(props) {
  return (
    <div >
      <div className='profile' >
        <img className="nameUrl" alt='' src={"data:image/png;base64," + props.profilePic} />
        <div className='name'>{props.username} <br />
          <span className='subheading'>{props.location}</span>
        </div>
     
      </div>
    </div>)
}
export default Name;
