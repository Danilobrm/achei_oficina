import { sign } from 'jsonwebtoken';

interface AuthData {
  name: string;
  email: string;
  id: string;
}

export class AuthService {
  private readonly jwtSecret: string = process.env.JWT_SECRET;

  authenticate(data: AuthData) {
    console.log(process.env.POSTGRES_HOST)
    if (!this.jwtSecret) return { message: 'Invalid secret or private key' };
    const { name, email, id } = data;
    // gerar token para o usuario
    const token = sign({ name, email }, this.jwtSecret, {
      subject: id,
    });

    return {
      ...data,
      token,
      message: 'login efetuado com sucesso!',
    };
  }
}
