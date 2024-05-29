import flower from '../images/superman.jpeg';
import '../css/message.css'
function Message() {
    return (
        <div className='messageDialog'>
            <div className='profilePic'>
                <img alt='' src={flower} className='photo' />
                <h4>Nitin Vyas</h4>
            </div>
            <hr />
            <div className='chatBox'>

            </div>
            <div className='commentDiv'>
            <input  type="text" name="comment" className='commentBox' placeholder='Write a message' />
            <button className='post'>Send</button>
          </div> 
         

        </div>
    )
}
export default Message