import { Component, OnInit } from '@angular/core';
import { ImageItem } from 'src/app/models/imageItem';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  images: ImageItem[] = [];  

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    //get list of images from api
    this.imageService.getImages().subscribe(images => this.images = images);
  }

  addImage(event: Event) {
    const input: HTMLInputElement = event?.target as HTMLInputElement; 
    const fileList = input?.files;
    if(fileList !== null) {
      const file: File = fileList[0]; 
      const formData = new FormData();
      formData.append("image", file);
      this.imageService.addImage(formData).subscribe(res => {
        console.log(res);
        this.images.push({name: file.name}); 
      });
    }
  }

  deleteImage(name: string) {
    this.images = this.images.filter(x => x.name !== name);
    this.imageService.deleteImage(name).subscribe(res => console.log(res));
  }

}

