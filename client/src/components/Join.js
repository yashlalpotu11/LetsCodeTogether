import React, {useState} from 'react'
import CodeIcon from '@material-ui/icons/Code';
import Input from '@material-ui/core/Input';
import { InputLabel, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const Join = () => {
    const[code, changeCode] = useState('');
    const history = useHistory();

    const joinRoom = () => {
        history.push(`/room/${code}`);
    }
    return(
        <>
        <div className="row w-100 mt-lg-5 justify-content-center" >
            <div className="col text-center mx-auto mt-5">
                <h2>Join using room code</h2>
                <br/>
                <form action="">
                    <InputLabel variant="standard" color="secondary">Enter Room code</InputLabel>
                    <Input onChange={(e)=>changeCode(e.target.value)} required="true"></Input>
                    <br/>
                    <br/>
                    <Button type="submit" variant="outlined" color="primary" 
                    onClick={()=>{
                        if(code){
                            joinRoom();
                        }
                    }} className="createbutton">Join <CodeIcon/></Button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Join;