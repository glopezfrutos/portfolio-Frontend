import { Component, OnInit } from '@angular/core';
import { faPen, faCheck, faXmark, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SkillsService } from '../service/skills/skills.service';
import { Skills } from '../shared/types/Skills';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(
    private skillsService: SkillsService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  skills?: Skills[];
  categoriesToShow = [
    {
      "cat": 'HARD',
      "toShow": "Tecnologías"
    },
    {
      "cat": 'SOFT',
      "toShow": "Habilidades blandas"
    }
  ]

  getSkills(category: string) {
    return this.skills?.filter(element => element.skillCategory == category)
  }

  ngOnInit(): void {
    this.skillsService.getAll().subscribe(education => this.skills = education)
  }

  faPen = faPen
  faCheck = faCheck
  faXmark = faXmark
  faTrash = faTrash
  faPlus = faPlus

  onEdit = false;
  onNewElement = false;
  elementToEdit?: Skills;
  loading = false;


  form = this.fb.group({
    id: [1],
    skillName: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    percentage: [50, [Validators.required]],
    skillCategory: ['', [Validators.required]],
  });

  get id() {
    return this.form.get("id")
  }
  get skillName() {
    return this.form.get("skillName")
  }
  get description() {
    return this.form.get("description")
  }
  get percentage() {
    return this.form.get("percentage")
  }
  get skillCategory() {
    return this.form.get("skillCategory")
  }

  openEdition(element: Skills) {
    this.elementToEdit = element;
    this.onEdit = true;
    this.form.patchValue({
      id: element.id,
      skillName: element.skillName,
      description: element.description,
      percentage: element.percentage,
      skillCategory: element.skillCategory
    });
  }

  newElement(skillCategory: string) {
    this.elementToEdit = { id: undefined, skillName: "", description: "", percentage: 50, skillCategory: skillCategory }
    this.skills?.push(this.elementToEdit)
    this.onNewElement = true;
    this.onEdit = true;
    this.form.reset()
    this.form.patchValue({
      id: this.elementToEdit.id,
      skillName: this.elementToEdit.skillName,
      description: this.elementToEdit.description,
      percentage: this.elementToEdit.percentage,
      skillCategory: this.elementToEdit.skillCategory
    });
  }

  cancelForm() {
    this.onEdit = false;
    if (this.onNewElement) {
      this.skills?.splice(-1, 1);
      this.onNewElement = false;
    }
  }

  submitForm() {
    this.onEdit = false;
    this.loading = true;

    if (this.form.valid && !this.onNewElement) {
      this.skillsService
        .put(this.form.value)
        .subscribe(result => {
          let index = this.skills != undefined ? this.skills.findIndex((element) => element.id == result.id) : -1
          if (index == -1) this.skills?.push(result)
          this.skills?.splice(index, 1, result)
          this.loading = false;
        })
    }

    if (this.form.valid && this.onNewElement) {
      this.skillsService
        .post(this.form.value)
        .subscribe(result => {
          this.skills?.splice(-1, 1, result)
          this.loading = false;
        });
      this.onNewElement = false;
    }
  }

  delete(id?: number) {
    this.onEdit = false;
    this.loading = true;

    if (!this.onNewElement) {
      this.skillsService
        .delete(id)
        .subscribe(() => {
          let index = this.skills != undefined ? this.skills.findIndex((element) => element.id == id) : -1
          this.skills?.splice(index, 1)
          this.loading = false;
        });
    }

    if (this.onNewElement) {
      this.cancelForm();
      this.loading = false;
    }
  }
}
