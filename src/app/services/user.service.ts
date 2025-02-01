import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TUser } from "../models/user.model";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserApi {
    private httpClient = inject(HttpClient);
    private endpoint = `${environment.baseUrl}/api/users`;

    // public userId = Number(localStorage.getItem('userId'));

    public getAllUsers(userId: number) {
        return this.httpClient.get(`${this.endpoint}/${userId}/users`);
    }
    
    public createUser(user: any) {
        return this.httpClient.post(this.endpoint, user);
    }

    public addFriend(userId: number, friendId: number) {
        return this.httpClient.post(`${this.endpoint}/${userId}/friends/${friendId}`, {});
    }

    public getFriends(userId: number) {
        return this.httpClient.get(`${this.endpoint}/${userId}/friends`);
    }
}