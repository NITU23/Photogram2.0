import user from '../../images/user.jpeg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SearchUser(props) {
  const navigate = useNavigate();
  const getUser = (item) =>{
    navigate(`/profile/${item.email}`)
  }
  useEffect(() => {
    document.body.addEventListener('click', () => {
     props.setUsers()
    });
  }, []);
  
  return(
    <div>
    {props.users && props.users.map((item, index) => (
      <div key={index} className='namePhotoDiv' onClick={() => getUser(item)}>
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