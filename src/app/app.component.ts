import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FileService } from './file.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    displaySingleFile!: Boolean;
    displayMultipleFiles!: Boolean;
    displayMultipleFileArray!: Array<any>;
    displaySingleFileArray!: Array<any>;

    displayedColumnsTable1 = ['name', 'action'];
    displayedColumnsTable2 = ['name', 'action'];

    @ViewChild('singleInput', { static: false })
    singleInput!: ElementRef;

    @ViewChild('multipleInput', { static: false })
    multipleInput!: ElementRef;

    files: any;
    multipleFiles = [];

    constructor(private http: HttpClient, private fileService: FileService) {
        this.displaySingleFile = false;
        this.displayMultipleFileArray = [];
        this.displayMultipleFiles = false;
        this.displaySingleFileArray = [];
    }

    ngOnInit(): void {
        this.getTableData()
    }

    getTableData() {
        this.fileService.getFileNames()
            .subscribe((res) => {
                if (res.length > 0) {
                    this.displaySingleFile = true
                    this.displayMultipleFiles = true
                }
                this.displaySingleFileArray = res
                this.displayMultipleFileArray = res
            })
    }

    selectImage(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.files = file;
        }
    }

    onSubmit() {
        const formdata = new FormData();
        formdata.append('file', this.files);
        this.fileService.postFile(formdata)
            .subscribe((res) => {
                this.singleInput.nativeElement.value = '';
                this.displaySingleFile = true;
                this.displaySingleFileArray = [...this.displaySingleFileArray, res.path];
            }, console.log);
    }

    selectMultipleImage(event: any) {
        if (event.target.files.length > 0) {
            this.multipleFiles = event.target.files;
        }
    }

    onMultipleSubmit() {
        const formdata = new FormData();

        for (let img of this.multipleFiles) {
            formdata.append('files', img);
        }

        this.fileService.postFiles(formdata)
            .subscribe((res) => {
                this.multipleInput.nativeElement.value = '';
                this.displayMultipleFiles = true;
                this.getTableData()
            }, console.log);
    }

    onFileDownload(fileName: string) {
        this.fileService.getFile({ name: fileName })
            .subscribe((res) => {
                saveAs(res, fileName)
            }, console.log)
    }

    onFileDelete(fileName: string) {
        this.fileService.deleteFile({ name: fileName })
            .subscribe((res) => {
                console.log(res)
                this.getTableData()
            }, console.log)
    }
}
