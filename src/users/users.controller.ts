import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const res = this.usersService.create(createUserDto);
    return res;
  }

  @Get()
  findAll() {
    const res = this.usersService.findAll();
    return res;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const res = this.usersService.findOne(+id);
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = this.usersService.update(+id, updateUserDto);
    return res;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const res = this.usersService.remove(+id);
    return res;
  }
}
