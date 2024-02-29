"use client"
import style from "@/components/node/node.module.css";

function Node(props){
    const handleClick = () => {
        
        console.log("Node clicked");
        props.onClickNode(props.stationName);
    };
    return (
        <>
        <div className={style.main}>
            <div className={style.station}>
                <ul className={style.list} >
                    <li className={style.stationName} >
                        {props.stations}
                    </li>
                    <li className={style.line} >
                        
                    </li>

                </ul>
                
            </div>
            <div className={style.node} onClick={handleClick}>
          
                <div className={style.insideCycle} ></div>
            </div>
        </div>
        
        </>   
    );
}

export default Node;