import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

interface File{
  originalname: string;
  filename: string;
  location:string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/files';

  constructor(
    private httpSvc: HttpClient
  ) { }

  getFile(name:string, url:string, type:string){
    return this.httpSvc.get(url, {responseType:'blob'})
      .pipe(
        tap(content => {
          const blob = new Blob([content],{type});
          saveAs(blob, name);
        }),
        map(()=>true)
      );
  }

  uploadFile(file: Blob){
    const dto = new FormData();
    dto.append('file',file);
    return this.httpSvc.post<File>(this.apiUrl+'/upload',dto,{
      // headers: {
      //   'Content-type':"multipart/form-data"
      // }
    });
  }

}
