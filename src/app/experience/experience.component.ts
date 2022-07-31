import { Component, OnInit } from '@angular/core';
import { Experience } from '../shared/types/Experience';
import { faPen, faCheck, faXmark, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExperienceService } from '../service/experience/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(
    private experienceService: ExperienceService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  experience?: Experience[];

  ngOnInit(): void {
    this.experienceService.getAll().subscribe(experience => this.experience = experience)
  }

  faPen = faPen
  faCheck = faCheck
  faXmark = faXmark
  faTrash = faTrash
  faPlus = faPlus

  onEdit = false;
  onNewElement = false;
  elementToEdit?: Experience;
  loading = false;


  form = this.fb.group({
    id: [1],
    company: ['', [Validators.required, Validators.maxLength(30)]],
    role: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    imgUrl: ['', [Validators.required, Validators.maxLength(1500)]]
  });


  get id() {
    return this.form.get("id")
  }
  get company() {
    return this.form.get("company")
  }
  get role() {
    return this.form.get("role")
  }
  get description() {
    return this.form.get("description")
  }
  get imgUrl() {
    return this.form.get("imgUrl")
  }

  openEdition(element: Experience) {
    this.elementToEdit = element;
    this.onEdit = true;
    this.form.patchValue({
      id: element.id,
      company: element.company,
      role: element.role,
      description: element.description,
      imgUrl: element.imgUrl
    });
  }

  newElement() {
    this.elementToEdit = { id: undefined, company: "", role: "", description: "", imgUrl: "" }
    this.experience?.push(this.elementToEdit)
    this.onNewElement = true;
    this.onEdit = true;
    this.form.patchValue({
      id: this.elementToEdit.id,
      company: this.elementToEdit.company,
      role: this.elementToEdit.role,
      description: this.elementToEdit.description,
      imgUrl: this.elementToEdit.imgUrl
    });
  }

  cancelForm() {
    this.onEdit = false;
    if (this.onNewElement) {
      this.experience?.splice(-1, 1);
      this.onNewElement = false;
    }
  }

  submitForm() {
    this.onEdit = false;
    this.loading = true;

    if (this.form.valid && !this.onNewElement) {
      this.experienceService
        .put(this.form.value)
        .subscribe(result => {
          let index = this.experience != undefined ? this.experience.findIndex((element) => element.id == result.id) : -1
          if (index == -1) this.experience?.push(result)
          this.experience?.splice(index, 1, result)
          this.loading = false;
        })
    }

    if (this.form.valid && this.onNewElement) {
      this.experienceService
        .post(this.form.value)
        .subscribe(result => {
          this.experience?.splice(-1, 1, result)
          this.loading = false;
        });
      this.onNewElement = false;
    }
  }

  delete(id?: number) {
    this.onEdit = false;
    this.loading = true;

    if (!this.onNewElement) {
      this.experienceService
        .delete(id)
        .subscribe(() => {
          let index = this.experience != undefined ? this.experience.findIndex((element) => element.id == id) : -1
          this.experience?.splice(index, 1)
          this.loading = false;
        });
    }

    if (this.onNewElement) {
      this.cancelForm();
      this.loading = false;
    }
  }
}
