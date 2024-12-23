import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import { MessagePayload } from 'firebase/messaging'; // Importar el tipo MessagePayload

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private messageSource = new BehaviorSubject<MessagePayload | null>(null); // Especificar tipo MessagePayload | null
  currentMessage = this.messageSource.asObservable();

  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log('Token recibido:', token);
      },
      (error) => {
        console.error('Error al solicitar el token:', error);
      }
    );
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('Notificación recibida:', message);
      this.messageSource.next(message);
    });
  }
}
