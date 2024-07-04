
import user from '../../images/user.jpeg'

function SearchUser(props) {
  return(
  <div>
        {props.users && props.users.map((item, index) => (
      <div key={index} className='namePhotoDiv' >
        <div>
          <img alt='userprofile' className='photo'
            src={item.profilePicture ? `data:image/png;base64,${item.profilePicture}` : user} />
        </div>
        <div className='username'>
          <span>{item.firstName} {item.lastName}</span>
        </div>
      </div>
    ))}
    </div>);
}

export default SearchUser