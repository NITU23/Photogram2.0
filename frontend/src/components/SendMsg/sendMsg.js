import './sendMsg.css'
function SendMsg({message}) {
    console.log('I am props',message)
    return <div>
        <div>
        <div className='sendMsg'><p className='content'>{message}</p></div>
        <pre className='timeStampsend'>11:45pm</pre>
        </div>
    </div>
}

export default SendMsg