import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ImageItem } from '../models/imageItem';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  apiHost = 'http://localhost:3000'; 
  apiPath: string = this.apiHost + '/api/images/';
  imagePath: string = this.apiHost + '/uploads/originals/'; 
  thumbPath: string = this.apiHost + '/uploads/thumbnails/'; 

  constructor(private http: HttpClient) { }

  getImages(): Observable<ImageItem[]> {
    return this.http.get<ImageItem[]>(this.apiPath)
      .pipe(catchError(this.handleError)); 
  }

  deleteImage(name: string) {
    const endPoint = this.apiPath + name + '/delete'; 
    return this.http.delete(endPoint)
      .pipe(catchError(this.handleError));
  }

  renameImage(name: string, newName: string) {
    const endPoint = this.apiPath + name + '/rename/' + newName; 
    return this.http.patch(endPoint, {}, httpOptions)
      .pipe(catchError(this.handleError));
  }

  addImage(data: FormData) {
    const endPoint = this.apiPath + 'upload'; 
    return this.http.post(endPoint, data) //TODO - add progress reporting??
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
