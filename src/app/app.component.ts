import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FriendsListPage } from "./features/friend-list/friend-list.component";
import { ChannelList } from "./features/channel-list/channel-list.component";
import { UserPage } from "./features/user/user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FriendsListPage, ChannelList, UserPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

  public userId = Number(localStorage.getItem('userId'));
  public isUserLoggedIn = !!this.userId;

  constructor() {
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'userId') {
      this.userId = Number(localStorage.getItem('userId'));
      this.isUserLoggedIn = !!this.userId;
    }
  }
}
