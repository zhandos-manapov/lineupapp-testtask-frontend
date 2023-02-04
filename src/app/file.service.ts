import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    private apiUrl = 'http://localhost:3000'

    constructor(
        private http: HttpClient
    ) { }

    postFile(data: FormData) {
        return this.http.post<any>(this.apiUrl + '/file', data)
    }

    postFiles(data: FormData) {
        return this.http.post<any>(this.apiUrl + '/multipleFiles', data)
    }

    getFile(data: any) {
        return this.http.post(this.apiUrl + '/getfile', data, { responseType: 'blob' })
    }

    getFileNames() {
        return this.http.get<any[]>(this.apiUrl + '/files')
    }

    deleteFile(data: any) {
        return this.http.delete(this.apiUrl + '/deletefile', { body: data })
    }

}
