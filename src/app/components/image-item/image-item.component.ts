import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageItem } from 'src/app/models/imageItem';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {
  @Input() image!: ImageItem; 
  @Output() delete: EventEmitter<string> = new EventEmitter();
  thumbnailLocation: string = '';
  imageLocation: string = '';
  editMode: boolean = false; 

  renameForm = new FormGroup({
    newName: new FormControl('', Validators.required),
  });

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.updateFilePaths(); 
  }

  deleteImage() {
    this.delete.emit(this.image.name);
  }

  renameImage() {
    let newName = this.renameForm.get('newName')?.value; 
    this.imageService.renameImage(this.image.name, newName).subscribe(res => console.log(res)); 
    this.image.name = newName; 
    this.updateFilePaths(); 
    this.triggerEditMode(); 
  }

  triggerEditMode() {
    this.renameForm.reset(); 
    this.editMode = !this.editMode; 
  }

  updateFilePaths() {
    this.thumbnailLocation = this.imageService.thumbPath + this.image.name; 
    this.imageLocation = this.imageService.imagePath + this.image.name; 
  }

}
