import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {  Auth, User, authState  } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Database, onValue, ref } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

import firebase from 'firebase/compat/app'; 

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ RouterLink,
    RouterLinkActive,
    RouterOutlet,MatCardModule,
    CommonModule,MatSelectModule,MatInputModule,MatFormFieldModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSidenavModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements OnInit {
  selectedUserProfile: any;
  chatMessages: any[] = [];
  chatMessages1: any[] = [];
  newMessage: string = '';
  events: string[] = [];
  opened: boolean = true;
  profilePictureUrl: string | null = null;
  pictureUrl: string | null = null;
  pictureUrl1: string | null = null;
  pictureUrl2: string | null = null;
  pictureUrl3: string | null = null;
  likedUserId: any[] = [];
  allUserProfiles: {
    bio: any;
    name: any;
    pet: any;
    sex: any;
    age: any;
    breed: any;
    profilePictureUrl: any;
    pictureUrl: any;
    pictureUrl1: any;
    pictureUrl2: any;
    pictureUrl3: any;
    username: any;
  }[] = [];
  currentProfile: {
    bio: any;
    name: any;
    pet: any;
    sex: any;
    age: any;
    breed: any;
    profilePictureUrl: any;
    pictureUrl: any;
    pictureUrl1: any;
    pictureUrl2: any;
    pictureUrl3: any;
    username: any;
  } | null = null;
  bio: string | null = null;
  user: User | null = null;
  userSubscription = Subscription;
  authState = authState(this.auth);
  email: string | null = null;
  name: string | null = null;
  pet: string | null = null;
  downloadURL: any;
  imageUrls: string[] = [];
  username: string | null = null;
  sex: any;
  age: any;
  breed: any;
  userId: any = null;
  likedUserProfiles: any[] = [];
  receivedMessages: any[] = []; // Define an empty array to store received messages
  chatSubscription: Subscription | undefined;
  chatMessagesFromSelectedUser: any[] = [];
  chatMessagesToSelectedUser: any[]= [];
  allChatMessages: any[] =  [];
   
  constructor(private auth: Auth = inject(Auth),@Inject(MAT_DIALOG_DATA) public data: any, private database: Database, private db: AngularFireDatabase,private firestore : AngularFirestore) {}

  ngOnInit(): void {
    this.selectedUserProfile = this.data;
    
    this.authState.subscribe((user: User | null) => {
      if (user) {
        this.userId               = user.uid;
        const currentUserEmail    = user.email ?? '';
        this.fetchChatMessages();
        this.fetchUserProfile();
        this.fetchAllUserProfiles(currentUserEmail);
        this.fetchLikedUserProfiles();
      }
 
  })}

  
  fetchChatMessages() {

    const chatId = this.createChatId(this.userId, this.selectedUserProfile.id);

    // Reference to the messages collection within the chat document
    const chatMessagesRef = this.firestore.collection('chats').doc(chatId).collection('messages');

    // Query to order messages by timestamp in ascending order
    const query = chatMessagesRef.ref.orderBy('timestamp', 'asc');

    // Subscribe to the messages collection to fetch messages
    query.onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({ ...doc.data(), messageId: doc.id }));
      this.chatMessages = messages;
    });
  }
  

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    // Create a unique chat ID using the IDs of both users
    const chatId = this.createChatId(this.userId, this.selectedUserProfile.id);
  
    // Reference to the messages collection within the chat document
    const chatMessagesRef = this.firestore.collection('chats').doc(chatId).collection('messages');
  
    // Add the new message to the chat messages collection including sender information
    chatMessagesRef.add({
      senderId: this.userId,
      senderName: this.username, // Assuming you have the sender's name
      content: this.newMessage,
      profilepic: this.profilePictureUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
    
      this.newMessage = '';
    }).catch((error) => {
      console.error('Error sending message:', error);
    });
  }
  
  // Function to create a unique chat ID using user IDs
  createChatId(userId1: string, userId2: string): string {
    // Concatenate the user IDs in a specific order
    if (userId1 < userId2) {
      return userId1 + '_' + userId2;
    } else {
      return userId2 + '_' + userId1;
    }
  }
    // const chatKey = `${this.userId}_${this.selectedUserProfile.id}`;
    // const chatRef = this.db.list(`chats/${chatKey}`);
    // chatRef.push({
    //   sender: this.username, 
    //   content: this.newMessage
    // });
     
 






  fetchLikedUserProfiles() {
    const likedProfilesRef = ref(this.database, 'liked/' + this.userId);

    onValue(likedProfilesRef, (snapshot) => {
      const likedUserIds: string[] = snapshot.val() ? Object.keys(snapshot.val()) : [];
      this.likedUserProfiles = [];

      likedUserIds.forEach((likedUserId) => {
        const userProfileRef = ref(this.database, 'users/' + likedUserId);
        onValue(userProfileRef, (profileSnapshot) => {
          const userProfile = profileSnapshot.val();
          if (userProfile) {
            this.likedUserProfiles.push(userProfile);
          }
        });
      });
    });
  }


  fetchAllUserProfiles(currentUserEmail: string) {
    const usersRef = ref(this.database, 'users');

    onValue(usersRef, (snapshot) => {
      const usersData: {
        bio: any;
        name: any;
        pet: any;
        sex: any;
        age: any;
        breed: any;
        profilePictureUrl: any;
        pictureUrl: any;
        pictureUrl1: any;
        pictureUrl2: any;
        pictureUrl3: any;
        username: any;
        id : string;
      }[] = [];
      snapshot.forEach((userSnapshot) => {
        const user = userSnapshot.val();

        if (user && user.email !== currentUserEmail) {
        
          const publicUserData = {
            bio: user.bio,
            name: user.name,
            pet: user.pet,
            sex: user.sex,
            age: user.age,
            breed: user.breed,
            profilePictureUrl: user.profilePictureUrl,
            pictureUrl: user.pictureUrl,
            pictureUrl1: user.pictureUrl1,
            pictureUrl2: user.pictureUrl2,
            pictureUrl3: user.pictureUrl3,
            username: user.username,
            id : user.id,
            
          };
          usersData.push(publicUserData);
        }
      });

      this.allUserProfiles = usersData;
     
    });
  }

  fetchUserProfile() {
    const userRef = ref(this.database, 'users/' + this.userId);
    onValue(userRef,(snapshot) => {
      this.bio = snapshot.val()?.bio;
      this.name = snapshot.val()?.name;
      this.pet = snapshot.val()?.pet;
      this.sex = snapshot.val()?.sex;
      this.age=snapshot.val()?.age;
      this.breed=snapshot.val()?.breed;
      this.profilePictureUrl = snapshot.val()?.profilePictureUrl;
      this.pictureUrl = snapshot.val()?.pictureUrl;
      this.pictureUrl1 = snapshot.val()?.pictureUrl1;
      this.pictureUrl2 = snapshot.val()?.pictureUrl2;
      this.pictureUrl3 = snapshot.val()?.pictureUrl3;
      this.username = snapshot.val()?.username;
    });

  
  }

}
