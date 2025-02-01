import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChannelApi {
    private httpClient = inject(HttpClient);
    private endpoint = `${environment.baseUrl}/api/channels`;

    public createChannel(ownerId: number, channelName: string,) {
        return this.httpClient.post(this.endpoint, { ownerId, name: channelName });
    }

    public getChannelsForUser(userId: number) {
        return this.httpClient.get(`${this.endpoint}?userId=${userId}`);
    }

    public addUserToChannel(channelId: number, userId: number): Observable<void> {
        return this.httpClient.post<void>(`${this.endpoint}/${channelId}/users/${userId}`, {});
    }

    public renameChannel(channelId: number, newName: string, ownerId: number): Observable<void> {
        return this.httpClient.patch<void>(`${this.endpoint}/${channelId}/name?newName=${newName}&ownerId=${ownerId}`, {});
    }

    public removeUserFromChannel(channelId: number, userId: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.endpoint}/${channelId}/users/${userId}`);
    }

    public deleteChannel(channelId: number, ownerId: number) {
        return this.httpClient.delete(`${this.endpoint}/${channelId}?ownerId=${ownerId}`);
    }
}