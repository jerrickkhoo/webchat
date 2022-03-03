import React from 'react'
import { Avatar } from '@material-ui/core'

const RoomChat = () => {
  return (
    <div className='roomchat'>
        <Avatar />
        <div className='roomchatinfo'>
            <h2 id='roomchath2'>Room Name</h2>
            <p>Last message</p>
        </div>
    </div>
  )
}

export default RoomChat