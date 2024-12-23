import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  constructor() {
    this.initializeMessaging();
  }

  private messaging: any;

  private initializeMessaging() {
    this.messaging = getMessaging();

    // Obtener el token del dispositivo
    getToken(this.messaging, { vapidKey: environment.firebaseVapidKey })
      .then((currentToken: string) => {
        if (currentToken) {
          console.log('Token de FCM: ', currentToken);
          // Enviar este token a tu servidor para enviar notificaciones a este dispositivo
        } else {
          console.log('No se pudo obtener el token');
        }
      }).catch((err: any) => {
        console.error('Hubo un error al obtener el token: ', err);
      });

    // Escuchar mensajes cuando la aplicación está en primer plano
    onMessage(this.messaging, (payload: any) => {
      console.log('Mensaje recibido en primer plano: ', payload);
      // Aquí puedes manejar cómo mostrar las notificaciones dentro de tu app
    });
  }
}