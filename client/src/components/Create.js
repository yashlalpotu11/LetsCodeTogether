import React,{useState} from 'react'

import Input from '@material-ui/core/Input'
import { InputLabel, Button } from '@material-ui/core'
import NoteIcon from '@material-ui/icons/NoteAdd'
// import {nanoid} from 'nanoid'
import {useHistory} from 'react-router-dom'

const Create = () => {

    const[roomName, setRoomName] = useState('');

    const history = useHistory()
    const createRoom = () => {
        // const id = nanoid()
        history.push(`/room/${roomName}`)
    }

    
    return(
        <>
            <div className="row w-100 mt-lg-5 justify-content-center" >
                <div className="col text-center mx-auto mt-5">
                    <h2>Create new room</h2>
                    <br/>
                    <form action="">
                        <InputLabel  variant="standard" color="secondary">Room name</InputLabel>
                        <Input onChange={(e)=>setRoomName(e.target.value)} required="true"></Input>
                        <br/>
                        <br/>
                        <Button type="submit" variant="outlined" color="primary" 
                        onClick={createRoom} className="createbutton">Create<NoteIcon/></Button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Create