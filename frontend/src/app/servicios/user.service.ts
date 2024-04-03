import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../modelos/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  readonly URL;

  constructor(private http:HttpClient) { 

    this.selectedUser= new User(); //instancio el usuario

    this.URL='http://localhost:3000/api/users';

  }

  guardarUser(user:User) {

    return this.http.post(this.URL, user)
  }

  getUsers() { 

    return this.http.get<User[]>(this.URL);

  }

  putUser(user: User) {

    return this.http.put(this.URL + `/${user._id}`, user);

  }

  deleteUser(_id: string) {

    return this.http.delete(this.URL + `/${_id}`);
    
  }




}
