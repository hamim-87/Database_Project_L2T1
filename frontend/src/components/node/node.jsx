
import style from "@/components/node/node.module.css";

function Node(){
    return (
        <>
        <div className={style.main}>
            <div className={style.station}>
                <ul className={style.list}>
                    <li className={style.stationName}>
                        Uttara Center
                    </li>
                    <li className={style.line}>
                        
                    </li>

                </ul>
                
            </div>
            <div className={style.node}>
          
                <div className={style.insideCycle}></div>
            </div>
        </div>
        
        </>   
    );
}

export default Node;