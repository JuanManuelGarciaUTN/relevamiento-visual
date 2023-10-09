import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { Foto } from '../interfaces/foto';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {
  public usuario?: Usuario;
  constructor(private firestore: Firestore, private storage: Storage, private datePipe: DatePipe) {}

  obtenerUsuarios(): Observable<Usuario[]>{
    const coleccion = collection(this.firestore, "usuarios");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Usuario[]>;
  }

  login(datos: Usuario){
    this.usuario = datos;
  }

  obtenerFotos(): Observable<Foto[]>{
    const coleccion = collection(this.firestore, "fotos");
    const q = query(coleccion, orderBy("fecha", "desc"))
    return collectionData(q, {idField: 'id'}) as Observable<Foto[]>;
  }

  obtenerFotosFeo(): Observable<Foto[]>{
    const coleccion = collection(this.firestore, "fotosfeo");
    const q = query(coleccion, orderBy("fecha", "desc"))
    return collectionData(q, {idField: 'id'}) as Observable<Foto[]>;
  }

  async subirFoto(foto: any, usuario:Usuario){
    const coleccion = collection(this.firestore, "fotos");
    const documentoNuevo = doc(coleccion);
    let path = usuario.correo+"+"+ documentoNuevo.id;
    let urlString = await this.subirArchivos(foto, path);
    //urlString = urlString.split("https://")[1];
    const datos:Foto = {
      id: documentoNuevo.id,
      fecha: Date().toString(), 
      usuario: usuario.correo, 
      url: urlString,
      likes: []};
      setDoc(documentoNuevo, datos);
  }

  
  async subirFotoFeo(foto: any, usuario:Usuario){
    const coleccion = collection(this.firestore, "fotosfeo");
    const documentoNuevo = doc(coleccion);
    let path = usuario.correo+"+"+ documentoNuevo.id;
    let urlString = await this.subirArchivos(foto, path);
    //urlString = urlString.split("https://")[1];
    const datos:Foto = {
      id: documentoNuevo.id,
      fecha: Date().toString(), 
      usuario: usuario.correo, 
      url: urlString,
      likes: []};
      setDoc(documentoNuevo, datos);
  }

  async subirArchivos(foto: File, nombre: string) : Promise<string> {
    const storageRef = ref(this.storage, `imagenes/${nombre}`);
    const snapshot = await uploadBytes(storageRef, foto);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }

  actualizarLikes(foto: Foto){
    const documento = doc(this.firestore, "fotos", foto.id);
    return updateDoc(documento, {likes: foto.likes});
  }

  
  actualizarLikesFeo(foto: Foto){
    const documento = doc(this.firestore, "fotosfeo", foto.id);
    return updateDoc(documento, {likes: foto.likes});
  }
}
