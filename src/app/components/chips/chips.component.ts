import { Component, ElementRef, ViewChild, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonService } from '../../services/common.service'
import { Tag } from 'src/app/interfaces/tag';

@Component({
    selector: 'app-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
    @Input() tags: string[];
    @Output() updateTags: EventEmitter<Tag> = new EventEmitter();
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER];
    tagCtrl = new FormControl();
    filteredTags: Observable<string[]>;
    allTags: string[];

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(private service: CommonService) {
    }
    async ngOnInit(): Promise<void> {
        const tagsObjects = await this.service.getTags();
        this.allTags = tagsObjects.map(tag => { return tag.name });
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => tag ? this._filter(tag) : this.allTags));
    }

    add(event: MatChipInputEvent): void {
        const value = event.value;

        if ((value || '').trim() && !this.tags.includes(value.trim())) {
            this.tags.push(value.trim());
            this.updateTags.emit({name: value, value: 1});
        }

        if (event.input) {
            event.input.value = '';
        }

        this.tagCtrl.setValue(null);
    }

    remove(tag: string): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
            this.updateTags.emit({name: tag, value: -1});
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (!this.tags.includes(event.option.value)) {
            this.tags.push(event.option.value);
            this.updateTags.emit({name: event.option.value, value: 1});
        }
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    }
}

