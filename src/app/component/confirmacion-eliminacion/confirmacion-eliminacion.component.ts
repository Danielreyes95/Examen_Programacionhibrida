import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-eliminacion',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Confirmar Eliminación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
      <ion-button expand="full" color="danger" (click)="confirmar()">Eliminar</ion-button>
      <ion-button expand="full" color="medium" (click)="cancelar()">Cancelar</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule]
})
export class ConfirmacionEliminacionComponent {
  @Input() publicacionId!: number;

  constructor(private modalController: ModalController) {}

  confirmar() {
    this.modalController.dismiss({ confirm: true, id: this.publicacionId });
  }

  cancelar() {
    this.modalController.dismiss({ confirm: false });
  }
}
