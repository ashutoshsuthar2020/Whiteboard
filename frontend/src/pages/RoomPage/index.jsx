import { useRef, useState } from "react";

import "./index.css";

import WhiteBoard from "../../components/Whiteboard";

const RoomPage = ({ user, socket, users }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("pencil");
    const [elements,setElements] = useState([]);
    const [history,setHistory] = useState([]);
    const [openedUserTab,setOpenUserTab] = useState(false);

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillRect = "white";
        ctx.clearRect(
            0,
            0,
            canvasRef.current.width, 
            canvasRef.current.height
        )
        setElements([]);
    };

    const undo = () => {
        setHistory((prevHistory)=>[...prevHistory, elements[elements.length-1]]);
        setElements((prevElements)=>prevElements.filter((ele, index) => index !== elements.length - 1));
    };
    const redo = () => {
        setElements((prevElements) => [
            ...prevElements,
            history[history.length - 1],
        ]);
        setHistory((prevHistory) =>
            prevHistory.filter((ele, index) => index !== history.length - 1)
        );
    };
    return (
        <div className="row">
            <button type="button" className="btn btn-dark" style={{display:"block" ,position:"absolute", top:"5%", left:"5%", height:"40px", width:"100px"}}>
                Users
            </button>
            {
                !openedUserTab && (
                    <div className="position-fixed top-0 h-100 text-white bg-dark" style={{width:"250px", left:"0%"}}>
                        <button type="button" className="btn btn-light btn-block w-100 mt-5 ">
                            Close
                        </button>
                        {
                            users.map((user,index)=>(
                                <p key={index* 999}>{user.name}</p>
                            ))
                        }
                    </div>
                )
            }
            <h1 className="text-center pt-4 py-5">White Board Sharing App 
                <span className="text-primary">[Users Online : 0]</span>
            </h1>
            {
                user?.presenter && (
                <div className="col-md-10 mx-auto px-5 mb-5 d-flex align-items-center justify-content-center">
                    <div className="d-flex col-md-2 jsutify-content-center gap-1">
                        <div className="d-flex gap-1 align-items-center">
                            <label htmlFor="pencil">Pencil</label>
                            <input 
                                type="radio" 
                                name="tool" 
                                id="pencil" 
                                value="pencil"
                                checked={tool == "pencil"}
                                className="mt-1"
                                onChange={(e) => setTool(e.target.value)}
                            />
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <label htmlFor="pencil">Line</label>
                            <input 
                                type="radio" 
                                name="tool" 
                                id="line" 
                                value="line"
                                checked={tool == "line"}
                                className="mt-1"
                                onChange={(e) => setTool(e.target.value)}
                            />
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <label htmlFor="pencil">Rectangle</label>
                            <input 
                                type="radio" 
                                name="tool" 
                                id="rect" 
                                value="rect"
                                checked={tool == "rect"}
                                className="mt-1"
                                onChange={(e) => setTool(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-2 mx-auto">
                        <div className="d-flex align-items-center justify-content-center">
                            <label htmlFor="color">Select Color: </label>
                            <input 
                                type="color" 
                                id="color"
                                className="mt-1 ms-3"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 d-flex gap-2">
                        <button className="btn btn-primary mt-1" disabled={elements.length === 0} onClick={() => undo()}>Undo</button>
                        <button className="btn btn-outline-primary mt-1" disabled={elements.length < 1} onClick={()=>redo()}>Redo</button>
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={handleClearCanvas}>Clear Canvas</button>
                    </div>
                </div>
                )
            }
            
            <div className="col-md-10 mx-auto mt-4 border">
                <WhiteBoard 
                canvasRef={canvasRef} 
                ctxRef={ctxRef}
                elements={elements}
                setElements={setElements}
                tool={tool}
                color={color}
                user={user}
                socket = {socket}
                users = {users}
                />
            </div>
        </div>
    )
}
export default RoomPage;