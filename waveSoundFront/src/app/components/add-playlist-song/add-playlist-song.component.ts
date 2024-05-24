import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Cancion } from '../../models/Cancion';
import { CancionService } from '../../service/Canciones.service';
import { Route, Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { Playlist } from '../../models/Playlist';

@Component({
  selector: 'app-add-playlist-song',
  templateUrl: './add-playlist-song.component.html',
  styleUrl: './add-playlist-song.component.css'
})
export class AddPlaylistSongComponent {
  public selectId?:number;
  public selectTitulo:String = "Seleccione canción";
  public selectPortada:String="../../../assets/img/img_default.png";
  public selectMostado:boolean = false;
  public selectIcon:String = "arrow_drop_down"
  @Output() cancionEvento = new EventEmitter<string>()
  usuario:Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  constructor(private serviceCancion:CancionService,private router:Router) { }


  public canciones10: Promise<Cancion[]> | undefined
  @Input() msjPlaylistAddSong?: Playlist;
  public canciones: Promise<Cancion[]> | undefined;
  ngOnInit(): void {
    console.log("La playlist:"+this.msjPlaylistAddSong);
    if (this.msjPlaylistAddSong) {
      console.log("id de la playlist:"+this.msjPlaylistAddSong.id);
      
      this.canciones = this.serviceCancion.getPlaylistNoCanciones(this.msjPlaylistAddSong.id);
      this.canciones10 = this.canciones?.then((canciones: Cancion[]) => {
        return canciones.slice(0, 10);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['msjPlaylistAddSong']) {
      this.handleDataChange();
      this.ngOnInit();
    }
  }

  handleDataChange(): void {
    // Lógica para manejar el cambio de data
    console.log('Data en el hijo ha cambiado:', this.msjPlaylistAddSong);
  }
  

  cambiarSelected(cancion:Cancion){
    this.selectId=cancion.id;
    this.selectTitulo=cancion.titulo;
    this.selectPortada=cancion.portada
    this.cancionEvento.emit(JSON.stringify(cancion));
    this.mostrarSelect()
  }

  mostrarSelect(){
    if (!this.selectMostado){
      this.selectMostado=true
      this.selectIcon="arrow_drop_up"
    }else{
      this.selectMostado=false
      this.selectIcon="arrow_drop_down"
    }
    
  }
}