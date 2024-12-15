import { Component, Input } from "@angular/core";

export type DataGridHeader = {
    column: string;
    value: string;
}

@Component({
    selector: 'cc-data-grid',
    standalone: true,
    templateUrl: './data-grid.component.html',
    styleUrl: './data-grid.component.scss'
})

export class DataGridComponent {
    @Input()
    public inputHeaderConfig: DataGridHeader[] = [];

    @Input()
    public inputDataSource: any;

}