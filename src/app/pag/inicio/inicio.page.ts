import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { Publicacion } from 'src/app/model/Publicacion';
import { ConfirmacionEliminacionComponent } from 'src/app/component/confirmacion-eliminacion/confirmacion-eliminacion.component'; 
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { FormatoFechaPipe } from 'src/app/pipes/fecha.pipe';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [RouterModule, IonicModule, CommonModule, FormsModule, FormatoFechaPipe]
})
export class InicioPage implements OnInit {
  plubicacion: Publicacion[] = [];

  constructor(private _publicacionService: PublicacionService, private modalController: ModalController) {
    addIcons({ 
      addOutline,
      trashOutline 
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos(); // Cargar los datos cada vez que la página se muestre
  }

  async cargarDatos() {
    this.plubicacion = await this._publicacionService.getPublicaciones();
  }

  async confirmarEliminacion(publicacionId: number) {
    const modal = await this.modalController.create({
      component: ConfirmacionEliminacionComponent,
      componentProps: { publicacionId }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data.confirm) {
        this.eliminarPublicacion(result.data.id);
      }
    });

    await modal.present();
  }

  async eliminarPublicacion(publicacionId: number) {
    await this._publicacionService.eliminar(publicacionId);
    this.plubicacion = await this._publicacionService.getPublicaciones();
  }
}
