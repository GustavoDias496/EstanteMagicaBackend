import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services/JWTService";


export const ensureAuthenticated:RequestHandler = async (req, res, next) => {
    
    const  authorization = req.headers.authorization ?? '';

    if(!authorization){
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            errors: { default: 'Não autorizado' }
        });
        return;
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2) {
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            errors: { default: 'Não autorizado' }
        });
        return;
    }

    const [type, token] = parts;

    if (type !== 'Bearer') {
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            errors: { default: 'Não autorizado' }
        });
    }

    const JwtData = JWTService.verify(token);
    if(JwtData === 'JWT_SECRET NOT FOUND'){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            errors: { default: 'Erro ao verificar o token' }
        });
        return;
    }else if(JwtData === 'INVALID_TOKEN'){
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            errors: { default: 'Não autenticado' }
        });
        return;
    }

    console.log(JwtData);
    next();
}