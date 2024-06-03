import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import '../css/comment.css'
export default function Comment(props) {
  const [showComponent, setShowComponent] = useState(props.showDialog)
  const handleShowComponent = () => {
    props.getCommentVar(false);
    setShowComponent(false);
  }
  return (
    <div>
      {showComponent && <Card className='cardWidth' par>
        <div className='closeButton'><IoCloseSharp onClick={handleShowComponent} /></div>
        <CardContent>
          <div className='viewAllCommentDiv' >
            <span className='viewAllcomment'><b>NitinV : </b>Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
            <span className='viewAllcomment'><b>NitinV : </b>Captions Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
            <span className='viewAllcomment'><b>NitinV : </b>Captions Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
            <span className='viewAllcomment'><b>NitinV : </b>Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com com Captions redis-cluster-alpha2-new4 chlyvs ng 0001 use2 cache amazonaws com</span>
          </div>
          <div className='commentDiv'>
            <input type="text" name="comment" className='commentBox' placeholder='Add your comment' />
            <button className='post'>Post</button>
          </div>
        </CardContent>
      </Card>
      }
    </div>
  );
}
