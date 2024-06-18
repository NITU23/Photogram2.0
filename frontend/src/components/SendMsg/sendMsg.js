import './sendMsg.css'
function SendMsg({message}) {

    return <div>
       { message && <div>
        <div className='sendMsg'><p className='content'>{message}</p></div>
        <pre className='timeStampsend'>11:45pm</pre>
        </div>}
    </div>
}

export default SendMsg