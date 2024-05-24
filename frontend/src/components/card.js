import img from '../images/superman.jpeg'
import '../css/card.css'
function Card() {
    return (<div>
        <div className='card'>
            <img className='img' src={img} />
        </div>
    </div>);
}

export default Card;