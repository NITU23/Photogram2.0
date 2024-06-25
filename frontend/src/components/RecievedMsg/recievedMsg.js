
import './recievedMsg.css'
function RecievedMsg ({message,time}) {
    return (<div>
      { message.length>0 && <><div className='getMsg'><p className='content'> {message}</p></div>
       {/* <pre className='timeStamp'>11:45pm</pre> */}
       </>}
    </div>)
}

export default RecievedMsg