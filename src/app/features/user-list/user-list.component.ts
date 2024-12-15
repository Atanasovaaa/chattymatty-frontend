import { Component, inject, OnInit } from "@angular/core";
import { TUser } from "../../models/user.model";
import { UserApi } from "../../services/user.service";
import { DataGridComponent, DataGridHeader } from "../../components/data-grid/data-grid.component";

@Component({
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [DataGridComponent]
})
export class UserListPage implements OnInit {
    public headerConfig: DataGridHeader[] = [
        {
            column: 'ID',
            value: 'id'
        },
        {
            column: 'Full name',
            value: 'fullName'
        },
        {
            column: 'Username',
            value: 'username'
        },
    ]

    private userApi = inject(UserApi);
    
    public usersCollection: TUser[] = [];

    public ngOnInit(): void {
        this.fetchAllUsers();
    }

    public fetchAllUsers() {
        this.userApi.getAllUsers().subscribe((response: any) => {
            this.usersCollection = response.data;
        })
    }
}