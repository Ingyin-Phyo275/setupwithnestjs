import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AppDataSource } from '../config/db.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  async create(createAuthDto: CreateAuthDto) {
    try {
      const res = await AppDataSource.getRepository('auth').save(createAuthDto);
      return {
        statusCode: 201,
        message: "Admin user created successfully!",
        data: res
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll() {
    try {
      const res = await AppDataSource.getRepository('auth').findAndCount();
      const [data, count] = res;
      return {
        statusCode: 200,
        message: "Admin user fetched successfully!",
        data: data,
        count: count
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const res = await AppDataSource.getRepository('auth').findOneBy({ id: id });
      return {
        statusCode: 200,
        message: "Admin user fetched successfully!",
        data: res
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const res = await this.findOne(id);
      if (!res) {
        throw new NotFoundException("Admin user not found!");
      } else {
        const data = await AppDataSource.getRepository('auth').update({ id: id }, updateAuthDto);
        return {
          statusCode: 200,
          message: "Admin user updated successfully!",
          data: data
        }
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.findOne(id);
      if (!res) {
        throw new NotFoundException("Admin user not found!");
      } else {
        const data = await AppDataSource.getRepository('auth').delete({ id: id });
        return {
          statusCode: 200,
          message: "Admin user deleted successfully!",
          data: data
        }
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await AppDataSource.getRepository('auth').findOneBy({ email: createAuthDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== createAuthDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        role: "Admin",
        name: user.name,
        email: user.email,
      },
    };
  }
}
