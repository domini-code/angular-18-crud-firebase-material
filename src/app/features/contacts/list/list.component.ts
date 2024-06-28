import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GridComponent } from '@components/grid/grid.component';
import { ColumnKeys, Contact } from '@features/contacts/contact.interfaces';
import { ContactService } from '@features/contacts/contact.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
   <section>
      <app-grid [displayedColumns]="displayedColumns" [data]="contacts()" [sortableColumns]="sortables"/>
   </section>
  `,
})
export class ListComponent implements OnInit {
  contacts = signal<Contact[]>([]);

  displayedColumns: ColumnKeys<Contact> = ['id', 'name','phone', 'email', 'action'];
  sortables: ColumnKeys<Contact> = ['id', 'name', 'phone', 'email'];


  private readonly _contactSvc = inject(ContactService);
  private readonly _destroyRef = inject(DestroyRef);  

  ngOnInit(): void {
    this.getAllContacts();
  }


  getAllContacts() {
    this._contactSvc.getAllContacts()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((contacts:Contact[]) => this.contacts.set(contacts))
      )
    .subscribe()
  }
}
