

const queries = {
    user : "select * from ?",
    REGISTER :  `
    INSERT INTO USER_INFO 
    (User_name,Profile_name,Gender,Date_Of_Birth,Phone_NO,Email,NID_NO,Birth_Certificate_NO,Addess,Password)
    VALUES (?,?,?,TO_DATE(?,'YYYY-MM-DD'),?,?,?,?,?,?,?,?)
    `,

    getFare: `
    SELECT AMOUNT
    FROM FARE
    WHERE FROM_STATION=(
                                            SELECT STATION_ID
                                            FROM STATION
                                            WHERE STATION_NAME='Dhaka University' AND PLATFORM=1
                                            )
    AND
    TO_STATION=(
                            SELECT STATION_ID
                            FROM STATION
                            WHERE STATION_NAME='Uttara Center' AND PLATFORM=1
                            );
    `,


    getTravellintTime: `
    SELECT TIME_TAKEN
    FROM FARE
    WHERE FROM_STATION=(
                                            SELECT STATION_ID
                                            FROM STATION
                                            WHERE STATION_NAME='Dhaka University' AND PLATFORM=1
                                            )
    AND
    TO_STATION=(
                            SELECT STATION_ID
                            FROM STATION
                            WHERE STATION_NAME='Uttara Center' AND PLATFORM=1
                            );
    `,

    
     


}

export default queries;