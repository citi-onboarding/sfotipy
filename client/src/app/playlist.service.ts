import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { retry, map } from 'rxjs/operators';

import { Playlist } from '../../../common/playlist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private appURL = 'http://localhost:3000';
  private playlistCategories: string[] = [];
  private allCategories: string[] = [];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCategories(id: number) {
    this.http.get<string[]>(this.appURL + "playlist/category/" + id)
      .pipe(
        map((res: any) => res)
      ).subscribe(
        (res: string[]) => {
          this.playlistCategories = res;
        }
      );
    return this.playlistCategories;
  }

  getAllCategories() {
    this.http.get(this.appURL + "playlist/category")
      .pipe(
        map((res: any) => res.categories)
      ).subscribe(
        (categories: string[]) => {
          this.allCategories = categories;
        })
    return this.allCategories;
  }

  addNewCategory(id: number, category: string) {
    return this.http.post(this.appURL + "playlist/category/" + id, category, this.httpOptions)
      .pipe(retry(2));
  }

  deleteCategory(id: number, category: string) {

    const data = {
      params: {
        category: category
      }
    };

    return this.http.delete(this.appURL + "playlist/category" + id, data)
      .pipe(retry(2));
  }

  getPlaylistEA(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.appURL + "/playlist-em-alta")
      .pipe(
        retry(2)
      );
  }

  getPlaylistPB(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.appURL + "/playlist-publica")
      .pipe(
        retry(2)
      );
  }

  getPlaylistRC(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.appURL + "/playlist-recomendada")
      .pipe(
        retry(2)
      );
  }

  getPlaylistMP(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.appURL + "/playlist-minha")
      .pipe(
        retry(2)
      );
  }
}
