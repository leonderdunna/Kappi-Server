import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ObjectID, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async verify(user: User): Promise<boolean> {
        if (user == undefined) return false
        let u = await this.userRepository.findOne({ name: user.name })
        if (u == undefined) return false
        return user.passwort==u.passwort
    }
    async findAll(): Promise<string[]> {
        let u = await this.userRepository.find()
        let unames = u.map((e) => { return e.name })
        return unames;
    }
    async addUser(user: User): Promise<boolean> {
        let u = await this.userRepository.find({ "name": user.name })
        if (u.length == 0) {
            this.userRepository.insert({ name: user.name, passwort: user.passwort })
            return true
        }
        return false
    }
    async deleteUser(user:User): Promise<boolean> {
        
        let u = await this.userRepository.findOne({ "name": user.name })
        if(u==undefined)
        throw new HttpException('User nicht gefunden',HttpStatus.NOT_FOUND)
        this.userRepository.delete(u.id)
        return true

      
    }
    async getId(username: string): Promise<ObjectID> {
        let u = await this.userRepository.findOne({ name: username })
        return u.id
    }
    async updateUser(user:User,neuesPasswort:string): Promise<any> {
        let u =await this.userRepository.findOne({name:user.name})
        return this.userRepository.update(u.id, { passwort: neuesPasswort })
    }

    //  async getStats(username: string): Promise<Stats> {
    //      return await this.statsRepository.findOne({ "user": username })
    //  }

    //TODO: Abspeichern es status höchstwarscheinlich in einer separaten datenbank
    // async updateStats(user:string,card:ObjectID, stat:Stat):Promise<boolean>{
    //     this.statsRepository.update
    // }
}
