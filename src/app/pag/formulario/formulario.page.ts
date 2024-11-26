import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { Publicacion } from 'src/app/model/Publicacion';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class FormularioPage implements OnInit {
  publicacionForm: FormGroup;
  foto: string = '';

  constructor(
    private fb: FormBuilder, 
    private _publicacionService: PublicacionService,
    private router: Router    
  ) {
    
    addIcons({camera});

    defineCustomElements(window);
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async takePicture() {
    const picture = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.foto = picture.dataUrl || '';
    this.publicacionForm.controls['imagen'].setValue(this.foto);
  }

  async guardar() {
    if (this.publicacionForm.valid) {
      const nuevaPublicacion: Omit<Publicacion, 'id' | 'fecha'> = {
        titulo: this.publicacionForm.value.titulo,
        descripcion: this.publicacionForm.value.descripcion,
        imagen: this.foto
      };
      await this._publicacionService.crear(nuevaPublicacion);
      alert('Datos guardados exitosamente!');
      this.router.navigate(['/inicio']); 
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
