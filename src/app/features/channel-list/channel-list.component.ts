import { Component, inject, OnInit, Input } from "@angular/core";
import { DataGridHeader, DataGridComponent } from "../../components/data-grid/data-grid.component";
import { ChannelApi } from "../../services/channel.service";
import { TChannel } from "../../models/channel.model";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'channel-list',
    templateUrl: './channel-list.component.html',
    styleUrl: './channel-list.component.scss',
    imports: [FormsModule]
})
export class ChannelList implements OnInit {
    private channelApi = inject(ChannelApi);

    public channelsCollection: TChannel[] = [];
    public channelName: string = '';
    public userId = Number(localStorage.getItem('userId'));
    public isEditable: boolean = false;
    public selectedChannel: TChannel | null = null;

    public ngOnInit(): void {
        this.getChannels();
    }

    public getChannels() {

        if (!this.userId) {
            throw new Error('User ID not found. Please log in.');
        }

        this.channelApi.getChannelsForUser(this.userId).subscribe((channelsData: any) => {
            this.channelsCollection = channelsData.data;
        })
    }

    public deleteChannel($selectedChannel: TChannel) {
        this.channelApi.deleteChannel($selectedChannel.id, this.userId).subscribe(() => {
            this.channelsCollection = this.channelsCollection.filter(channel => channel.id !== $selectedChannel.id);
            this.getChannels();
        });
    }

    public renameChannel($selectedChannel: TChannel) {
        this.isEditable = true;
        this.selectedChannel = $selectedChannel
    }

    public processRenameChannel($inputValue: string) {
        this.channelApi.createChannel(this.userId, $inputValue).subscribe(() => {
            this.getChannels()
        })
        this.isEditable = false;
    }
}