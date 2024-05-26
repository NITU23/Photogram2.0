import img from '../images/flower.jpeg'
import '../css/card.css'
import  {PiHeart} from 'react-icons/pi';
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState } from 'react';
import Name from './name'
function Card() {
    const [isClicked,setIsClicked] = useState(false);
    const setClick =()=>{
      isClicked===true ? setIsClicked(false):setIsClicked(true)
    }
    return (
      <div>
        <div className="card">
            <div className='photoDetails'>
            <Name />
          <img className="img" src={img} />
          <div className="actions img">
            <div className='activity'>
            {!isClicked  &&    < PiHeart className="like heart " onClick={setClick} /> }
            {isClicked  &&    < FaHeart className="liked" onClick={setClick} /> }
            <FaRegComment className="like" />
            <FiSend className="like" />
            </div>

          </div>
          </div>
        </div>
      </div>
    );
}

export default Card;