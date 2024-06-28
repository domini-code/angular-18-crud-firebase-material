import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Contact } from '@features/contacts/contact.interfaces';
import { APP_CONSTANTS } from '@shared/constants';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ContactService {
  private readonly _firestore = inject(Firestore);
  private readonly _contactCollection = collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME);   
  

  newContact(contact:Partial<Contact>):Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._contactCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...contact,
    })
  }

  getAllContacts():Observable<Contact[]> {
    const queryFn = query(this._contactCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<Contact[]>
  }

  async getContactById(id:string):Promise<Contact> {
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Contact;
  }

  updateContact(id: string, contact: Contact):void {
    const docRef = this._getDocRef(id);
    updateDoc(docRef, { ...contact });
  }

  deleteContact(id: string):void {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  } 

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }
}