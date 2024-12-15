import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { TUser } from "../../models/user.model";
import { UserApi } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})

export class UserPage {
    private userApi = inject(UserApi);
    private router = inject(Router);

    public user: TUser = {
        username: '',
        fullName: ''
    }

    public usersCollection: TUser[] = [];
    
    public createUser() {
        this.userApi.createUser(this.user).subscribe((response: any) => {
            this.usersCollection.push(response.data);
            this.router.navigate(['/users']);
        })

    }
}