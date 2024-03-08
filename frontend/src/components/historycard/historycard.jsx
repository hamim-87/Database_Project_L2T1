
import style from './history.module.css'
export default function HistoryCard({first ,second,third, fourth}){
    return(
        <>
           <div className={style.main}>
                <div className={style.first}>
                    {first}
                </div >

                <div className = {style.second}>
                    {second}
                </div>

                <div className={style.third}>
                    {third}
                </div>
                    
                <div className={style.fourth}>
                    {fourth}
                </div>


           </div>
        </>
    )
}