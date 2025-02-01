import { Component, inject, OnInit } from "@angular/core";
import { UserApi } from "../../services/user.service";
import { TFriend } from "../../models/user.model";

@Component({
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
})
export class UserListPage implements OnInit {

    private userApi = inject(UserApi);

    public usersCollection: any[] = [];
    public friendsCollection: TFriend[] = [];
    public userId = Number(localStorage.getItem('userId'));


    public ngOnInit(): void {
        this.fetchAllUsers();
        this.loadUsers();
        this.loadFriends();
    }

    public fetchAllUsers(): void {
        this.userApi.getAllUsers(this.userId).subscribe((usersData: any) => {

            if (!this.userId) {
              throw new Error('User ID not found. Please log in.');
            }
            this.usersCollection = usersData.data;
        });
    }

    public loadFriends(): void {
        this.userApi.getFriends(this.userId).subscribe((users: any) => {
            this.friendsCollection = users.data || [];
        })
    }

    public loadUsers(): void {
        this.userApi.getAllUsers(this.userId).subscribe((users: any) => {
            this.usersCollection = users.data || [];
        })
    }

    public addFriend(friendId: number) {
        if(!this.userId) {
            throw new Error('User ID not found. Please, log in or create account');
        }

        this.userApi.addFriend(this.userId, friendId).subscribe(()=> {
            const addedFriend = this.usersCollection.find(user => user.id === friendId);

            if(addedFriend) {
                this.friendsCollection.push(addedFriend);
                this.usersCollection = this.usersCollection.filter(user => user.id !== friendId);
                this.loadFriends();
            }
        })
    }
}