import { Component, inject, OnInit } from "@angular/core";
import { UserApi } from "../../services/user.service";

@Component({
    standalone: true,
    selector: 'friend-list',
    templateUrl: './friend-list-component.html',
    styleUrl: './friend-list-component.scss',
})
export class FriendsListPage implements OnInit {

    private userApi = inject(UserApi);

    public friendsCollection: any[] = [];
    public userId = Number(localStorage.getItem('userId'));


    public ngOnInit(): void {
        this.fetchAllUsers();
    }

    public fetchAllUsers(): void {
        if (!this.userId) {
          throw new Error('User ID not found. Please log in.');
        }

        this.userApi.getFriends(this.userId).subscribe((friendsData: any) => {
            this.friendsCollection = friendsData.data;
        });
    };
}