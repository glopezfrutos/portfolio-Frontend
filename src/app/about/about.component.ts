import { Component, OnInit } from '@angular/core';
import { AboutService } from '../service/about/about.service';
import { About } from '../shared/types/About';
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(
    private aboutService: AboutService,
    private authService: AuthService,
    private fb: FormBuilder,
    ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  faPen = faPen;
  faCheck = faCheck;
  faXmark = faXmark;

  onEdit = false;
  elementToEdit?: About;
  loading = false;

  about?: About[];

  editForm = this.fb.group({
    id: [1],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    subtitle: ['', [Validators.required, Validators.maxLength(50)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(50)]],
    longDescription: ['', [Validators.required, Validators.maxLength(600)]],
    imgUrl: ['', [Validators.required, Validators.maxLength(1500)]]
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
  get imgUrl() {
    return this.editForm.get("imgUrl")
  }

  ngOnInit(): void {
    this.aboutService.getAll().subscribe(about => this.about = about)
  }

  openEdition(element: About) {
    this.elementToEdit = element;
    this.onEdit = true;
    this.editForm.patchValue({
      id: element.id,
      name: element.name,
      subtitle: element.subtitle,
      shortDescription: element.shortDescription,
      longDescription: element.longDescription,
      imgUrl: element.imgUrl
    });
  }

  cancelEdition() {
    this.onEdit = false;
  }

  submitEdition() {
    this.onEdit = false;
    this.loading = true;

    if (this.editForm.valid) {

      this.aboutService
        .put(this.editForm.value)
        .subscribe(result => {
          let index = this.about != undefined ? this.about.findIndex((element) => element.id == result.id) : -1
          if (index == -1) this.about?.push(result)
          this.about?.splice(index, 1, result)
          this.loading = false;
        })
    }
  }
}
