import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { TUser } from "../../models/user.model";
import { UserApi } from "../../services/user.service";

@Component({
    standalone: true,
    imports: [FormsModule],
    selector: 'create-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})

export class UserPage {
    private userApi = inject(UserApi);

    public user: TUser = {
        username: '',
        password: ''
    }

    public usersCollection: TUser[] = [];
    public isUserLoggedIn: boolean = false;
    
    public createUser() {
        this.userApi.createUser(this.user).subscribe((response: any) => {
            localStorage.setItem('userId', response.data.id.toString());
            this.usersCollection.push(response.data);
            this.isUserLoggedIn = true;
        })
    }
}