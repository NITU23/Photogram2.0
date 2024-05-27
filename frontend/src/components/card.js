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
          <img className="img" src={img} alt='' />
          <div className="img">
            {!isClicked  && <PiHeart className="like heart actions  " onClick={setClick} /> }
            {isClicked  &&  <FaHeart className="liked actions" onClick={setClick} /> }
            <FaRegComment className="like comment actions" />
            <FiSend className="like comment" />
            </div>
            <div className='captionDiv' >
            <p>Comments</p>
            <span className='captions'><b>Nitin : </b>Captions redis-cluster-alpha2-new4.chlyvs.ng.0001.use2.cache.amazonaws.com</span>
            <span className='captions'>view all comments</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Card;