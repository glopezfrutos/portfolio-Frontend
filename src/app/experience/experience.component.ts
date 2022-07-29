import { Component, OnInit } from '@angular/core';
import { Experience } from '../shared/types/Experience';
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
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

  onEdit = false;
  elementToEdit?: Experience;
  loading = false;


  form = this.fb.group({
    id: [1],
    company: ['', [Validators.required, Validators.maxLength(30)]],
    role: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    imgUrl: ['', [Validators.required, Validators.maxLength(150)]]
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

  cancelEdition() {
    this.onEdit = false;
  }

  submitEdition() {
    this.onEdit = false;
    this.loading = true;

    if (this.form.valid) {
      this.experienceService
        .put(this.form.value)
        .subscribe(result => {
          let index = this.experience != undefined ? this.experience.findIndex((element) => element.id == result.id) : -1
          if (index == -1) this.experience?.push(result)
          this.experience?.splice(index, 1, result)
          this.loading = false;
        })
    }
  }
}
