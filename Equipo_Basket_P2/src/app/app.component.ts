import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PlayersComponent } from "./components/players/players.component";
import { FormsModule } from '@angular/forms';
import { MediaComponent } from './components/media/media.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { inject } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrección realizada
  imports: [RouterOutlet, RouterModule, PlayersComponent, FormsModule, MediaComponent],
})
export class AppComponent implements OnInit {
  title = 'equipo-basket';
  modalOpen = false;

  // Inyección del servicio de Firebase Messaging
  private messaging: Messaging = inject(Messaging);

  ngOnInit(): void {
    this.requestPermission();
    this.listenForMessages();
  }

  openModal(): void {
    this.modalOpen = true; // Abre el modal
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('d-block');
    }
  }

  // Solicitar permiso para notificaciones push
  private async requestPermission(): Promise<void> {
    try {
      const token = await getToken(this.messaging, { vapidKey: environment.firebaseVapidKey });
      if (token) {
        console.log('Token de notificaciones:', token);
      } else {
        console.log('No se obtuvo un token. Verifica los permisos.');
      }
    } catch (error) {
      console.error('Error al obtener el token de notificaciones:', error);
    }
  }

  // Escuchar mensajes cuando la app está en ejecución
  private listenForMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Mensaje recibido:', payload);
      // Aquí puedes manejar el mensaje recibido, por ejemplo, mostrar una notificación local.
      alert(`Notificación recibida: ${payload.notification?.title}`);
    });
  }
}
