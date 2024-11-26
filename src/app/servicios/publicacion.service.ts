import { Injectable } from '@angular/core';
import { Publicacion } from '../model/Publicacion';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  key: string = "publicaciones";
  publicacion: Publicacion[] = [];

  constructor() { }

  async crear(publicacion: Omit<Publicacion, 'id' | 'fecha'>) {
    await this.getPublicaciones();
    const newId = this.publicacion.length ? this.publicacion[this.publicacion.length - 1].id + 1 : 1; // Asigna un ID único
    const nuevaPublicacion: Publicacion = { ...publicacion, id: newId, fecha: new Date() }; // Añade la fecha actual y el id
    this.publicacion.push(nuevaPublicacion);
    await this.guardar();
  }

  async guardar() {
    await Preferences.set({
      key: this.key,
      value: JSON.stringify(this.publicacion)
    });
  }

  async getPublicaciones(): Promise<Publicacion[]> {
    const publicacionesStr = await Preferences.get({ key: this.key });
    if (publicacionesStr.value) {
      try {
        this.publicacion = JSON.parse(publicacionesStr.value) || [];
      } catch (error) {
        console.error('Error parsing JSON:', error);
        this.publicacion = [];
      }
    } else {
      this.publicacion = [];
    }
    return this.publicacion;
  }

  async eliminar(publicacionId: number) {
    await this.getPublicaciones();
    this.publicacion = this.publicacion.filter(p => p.id !== publicacionId);
    await this.guardar();
  }
}
