import {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";

const JoinRoomForm = ({uuid,socket,setUser}) => {
    const [roomId, setRoomId] = useState("");
    const [name,setName] = useState("");

    const navigate = useNavigate();
    
    const handleRoomJoin = (e) => {
        e.preventDefault();
        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter: false
        };
        setUser(roomData);
        socket.emit("userJoined",roomData);
        navigate(`/${roomId}`);
    };
    return (
        <form className="form col-md-12 mt-5"> 
            <div className="form-group">
                <input type="text" className="form-control ny-2" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group border">
                <div className="input-group d-flex align-items-center justify-content-center">
                    <input type="text"  className="form-control ny-2 border-0" placeholder="Enter-room-code"  value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
                </div>
            </div>
            <button type="submit" onClick={handleRoomJoin} className="mt-4 btn-primary btn-block form-control">Join Room</button>
        </form>
    );
};

export default JoinRoomForm;