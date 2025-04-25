import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformerService {

  private apiUrl = 'http://127.0.0.1:8081/transformer/upload';

  constructor(private http: HttpClient) { }

  uploadGreyscaleImage(greyscaleImage: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let correctedGreyScaleImage = this.removeBase64Prefix(greyscaleImage)
    const body = {
      greyscale_image: correctedGreyScaleImage
    };
    console.log("below is corrected greayscale image")
    console.log(body)
    return this.http.post<any>(this.apiUrl, body, { headers });
    //return this.http.post(this.apiUrl, body);
  }

  public removeBase64Prefix(input: string): string {
    const prefixes = [
      "data:application/octet-stream;base64,",
      "data:image/jpeg;base64,"
    ];
  
    for (const prefix of prefixes) {
      if (input.startsWith(prefix)) {
        return input.replace(prefix, "");
      }
    }
    
    return input;
  }
}
