import { Component, OnInit } from '@angular/core';
import { Education } from '../shared/types/Education';
import { faPen, faCheck, faXmark, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EducationService } from '../service/education/education.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(
    private educationService: EducationService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  education?: Education[];
  categoriesToShow = [
    {
      "cat": 'HARD',
      "toShow": "Tecnologías"
    },
    {
      "cat": 'SOFT',
      "toShow": "Habilidades blancas"
    }
  ]

  getEducation(educationCategory: string) {
    return this.education?.filter(element => element.educationCategory == educationCategory)
  }

  ngOnInit(): void {
    this.educationService.getAll().subscribe(education => this.education = education)
  }

  faPen = faPen
  faCheck = faCheck
  faXmark = faXmark
  faTrash = faTrash
  faPlus = faPlus

  onEdit = false;
  onNewElement = false;
  elementToEdit?: Education;
  loading = false;


  form = this.fb.group({
    id: [1],
    institution: ['', [Validators.required, Validators.maxLength(100)]],
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    imgUrl: ['', [Validators.required, Validators.maxLength(1500)]],
    educationCategory: ['', [Validators.required]],
  });


  get id() {
    return this.form.get("id")
  }
  get institution() {
    return this.form.get("institution")
  }
  get title() {
    return this.form.get("title")
  }
  get description() {
    return this.form.get("description")
  }
  get imgUrl() {
    return this.form.get("imgUrl")
  }
  get educationCategory() {
    return this.form.get("educationCategory")
  }

  openEdition(element: Education) {
    this.elementToEdit = element;
    this.onEdit = true;
    this.form.patchValue({
      id: element.id,
      institution: element.institution,
      title: element.title,
      description: element.description,
      imgUrl: element.imgUrl,
      educationCategory: element.educationCategory
    });
  }

  newElement(educationCategory: string) {
    this.elementToEdit = { id: undefined, institution: "", title: "", description: "", imgUrl: "", educationCategory: educationCategory }
    this.education?.push(this.elementToEdit)
    this.onNewElement = true;
    this.onEdit = true;
    this.form.patchValue({
      id: this.elementToEdit.id,
      institution: this.elementToEdit.institution,
      title: this.elementToEdit.title,
      description: this.elementToEdit.description,
      imgUrl: this.elementToEdit.imgUrl,
      educationCategory: this.elementToEdit.educationCategory
    });
  }

  cancelForm() {
    this.onEdit = false;
    if (this.onNewElement) {
      this.education?.splice(-1, 1);
      this.onNewElement = false;
    }
  }

  submitForm() {
    this.onEdit = false;
    this.loading = true;

    if (this.form.valid && !this.onNewElement) {
      this.educationService
        .put(this.form.value)
        .subscribe(result => {
          let index = this.education != undefined ? this.education.findIndex((element) => element.id == result.id) : -1
          if (index == -1) this.education?.push(result)
          this.education?.splice(index, 1, result)
          this.loading = false;
        })
    }

    if (this.form.valid && this.onNewElement) {
      this.educationService
        .post(this.form.value)
        .subscribe(result => {
          this.education?.splice(-1, 1, result)
          this.loading = false;
        });
      this.onNewElement = false;
    }
  }

  delete(id?: number) {
    this.onEdit = false;
    this.loading = true;

    if (!this.onNewElement) {
      this.educationService
        .delete(id)
        .subscribe(() => {
          let index = this.education != undefined ? this.education.findIndex((element) => element.id == id) : -1
          this.education?.splice(index, 1)
          this.loading = false;
        });
    }

    if (this.onNewElement) {
      this.cancelForm();
      this.loading = false;
    }
  }
}
