import { Component, OnInit, Output } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'
import { Router } from '@angular/router';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
    confessions: Confession[];
    displayedConfessions: Confession[];
    displayPosted: boolean;
    color: string;

    constructor(private confessionsService: ConfessionsService, private router: Router) { }
    ngOnInit(): void {
        this.confessionsService.getConfessions(true).subscribe(confessions => {
            this.confessions = confessions;
            this.displayedConfessions = confessions;
            this.displayPosted = false;
            this.color = "primary";
        }, (err) => {
            this.router.navigateByUrl('/login');
        })
    }

    removeConfession(id) {
        console.log(id);
        this.confessions = this.confessions.filter(c => c._id !== id);
    }

    filter() {
        this.displayPosted = !this.displayPosted;
        this.displayedConfessions  = (this.displayPosted) ?  this.confessions.filter(c => c.serial == null) : this.confessions;
    }
}