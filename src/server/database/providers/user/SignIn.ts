import { prisma } from "../../prisma";
import { PasswordCrypto } from "../../../shared/services";
import { JWTService } from "../../../shared/services/JWTService";

export const SignIn = async (email: string, password:string) => {

  const result = await prisma.users.findUnique({
    where:{ email }
  });

  if(!result){
    return new Error('Email ou senhas inválidos!');
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(password, result.password);

  if(!passwordMatch){
    return new Error('Email ou senhas inválidos!');
  }

  const accessToken = JWTService.signIn({uid: result.id});
  if(accessToken === 'JWT_SECRET NOT FOUND'){
    return new Error('Erro ao fazer login!');
  }

  return accessToken;
};