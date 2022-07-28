import { Component, OnInit } from '@angular/core';
import { AboutService } from '../service/about/about.service';
import { About } from '../shared/types/About';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(
    private aboutService: AboutService,
    private fb: FormBuilder
  ) { }

  faPen = faPen;
  faCheck = faCheck;

  onEdit = false;
  elementToEdit?: About;
  loading = false;

  about?: About[];

  editForm = this.fb.group({
    id: [1],
    name: ['', Validators.required],
    subtitle: ['', Validators.required],
    shortDescription: ['', Validators.required],
    longDescription: ['', Validators.required]
  });

  get id() {
    return this.editForm.get("id")
  }
  get name() {
    return this.editForm.get("name")
  }
  get subtitle() {
    return this.editForm.get("subtitle")
  }
  get shortDescription() {
    return this.editForm.get("shortDescription")
  }
  get longDescription() {
    return this.editForm.get("longDescription")
  }

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe(about => this.about = about)
  }

  openEdition(element: About) {
    this.elementToEdit = element;
    this.onEdit = true;
    this.editForm.patchValue({
      id: element.id,
      name: element.name,
      subtitle: element.subtitle,
      shortDescription: element.shortDescription,
      longDescription: element.longDescription
    });
  }

  submitEdition() {
    this.onEdit = false;
    this.loading = true;

    if (this.editForm.valid) {
      
      this.aboutService
        .putAbout(this.editForm.value)
        .subscribe(result => {
          let index = this.about?.findIndex((element) => element.id == result.id) || -1
          if(index == -1) this.about?.push(result)
          this.about?.splice(index, 1, result)
          this.loading = false;
          })
    }
  }
}
