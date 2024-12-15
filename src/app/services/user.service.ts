import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TUser } from "../models/user.model";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserApi {
    private httpClient = inject(HttpClient);
    private endpoint = `${environment.baseUrl}/users`;

    public getAllUsers() {
        return this.httpClient.get(this.endpoint);
    }
    
    public createUser(user: TUser) {
        return this.httpClient.post(this.endpoint, user);
    }
}