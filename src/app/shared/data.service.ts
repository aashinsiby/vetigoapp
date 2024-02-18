import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from '../model/file-meta-data';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }

addUser(user : User){

  user.id = this.afs.createId();
  return this.afs.collection('/users').add(user);

}


  

 
    
}