import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const CreateRoomForm = ({uuid, socket, setUser}) => {

    const [roomId,setRoomId] = useState(uuid());
    const [name,setName] = useState("");

    const navigate = useNavigate();
    
    const handleCreateRoom = (e) => {
        e.preventDefault();
        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true
        };
        setUser(roomData);
        console.log(roomData);
        socket.emit("userJoined",roomData);
        navigate(`/${roomId}`);
    };

    return (
        <form className="form col-md-12 mt-5"> 
            <div className="form-group">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control ny-2" placeholder="Enter Your Name" />
            </div>
            <div className="form-group border">
                <div className="input-group d-flex align-items-center justify-content-center">
                    <input type="text" value={roomId} className="form-control ny-2 border-0" disabled placeholder="Generate-room-code"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-sm ne-1" onClick={()=>setRoomId(uuid())} type="button">Generate</button>
                        <button className="btn btn-outline-danger btn-sm ne-2" type="button">Copy</button>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 btn-primary btn-block form-control" onClick={handleCreateRoom}>Generate Room</button>
        </form>
    );
};

export default CreateRoomForm;