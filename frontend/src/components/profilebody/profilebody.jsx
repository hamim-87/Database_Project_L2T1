
import style from './profilebody.module.css';
 function ProfileBody({first, value}){

    return (
        <>
            <div className={style.main}>
                <div className={style.key}>
                    {first}
                </div>
                <div className={style.colon}>
                    :
                </div>
                <div className={style.value}>
                    {value}
                </div>
            </div>
        </>
    );
}


export default ProfileBody;