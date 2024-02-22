import jwt from 'jsonwebtoken';

import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const requireAuth = (req, res, nex) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY,(err,decodedtoken) => {
            if(err)
            {
                console.log(err);
                return nextApp.render(req,res,'/login',req.query);
            }else{
                nex();
            }
        });
    }else{
        return nextApp.render(req,res,'/login',req.query);
    }

}

export default requireAuth;