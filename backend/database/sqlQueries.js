

const queries = {
    user : "select * from ?",
    REGISTER :  `
    INSERT INTO USER_INFO 
    (User_name,Profile_name,Gender,Date_Of_Birth,Phone_NO,Email,NID_NO,Birth_Certificate_NO,Addess,Password)
    VALUES (?,?,?,TO_DATE(?,'YYYY-MM-DD'),?,?,?,?,?,?,?,?)
    `

}

export default queries;