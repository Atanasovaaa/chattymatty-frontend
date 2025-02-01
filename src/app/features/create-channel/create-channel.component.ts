import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { ChannelApi } from '../../services/channel.service';
import { FormsModule } from '@angular/forms';
import { TChannel } from '../../models/channel.model';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    templateUrl: './create-channel.component.html',
    styleUrls: ['./create-channel.component.scss'],
    imports: [FormsModule]
})
export class CreateChannelPage implements OnInit {
    private channelApi = inject(ChannelApi);
    private router = inject(Router);

    public ownerId = Number(localStorage.getItem('userId'));
    public channelsCollection: TChannel[] = [];
    public channelName: string = '';

    public ngOnInit(): void {
        this.fetchAllChannels();
    }

    public createChannel(): void {
        if (!this.ownerId) {
            alert('Please log in.');
            return;
        }

        if (!this.channelName.trim()) {
            alert('Please enter a valid channel name.');
            return;
        }

        this.channelApi.createChannel(this.ownerId, this.channelName).subscribe((response: any) => {
            this.channelsCollection.push(response.data);
            alert('Channel created successfully!');
            this.channelName = '';
            this.fetchAllChannels();
        });
    }

    public fetchAllChannels(): void {
        this.channelApi.getChannelsForUser(this.ownerId).subscribe((channelsData: any) => {
            if (!this.ownerId) {
                throw new Error('Channels for this user are not found.');
            }
            this.channelsCollection = channelsData.data;
        })
    }
}