import { Component, OnInit } from '@angular/core';
import { faPen, faCheck, faXmark, faTrash, faPlus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../shared/types/Project';
import { ProjectService } from '../service/project/project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  project?: Project[];

  ngOnInit(): void {
    this.projectService.getAll().subscribe(project => this.project = project)
  }

  faPen = faPen
  faCheck = faCheck
  faXmark = faXmark
  faTrash = faTrash
  faPlus = faPlus
  faGlobe = faGlobe
  faGithub = faGithub

  onEdit = false;
  onNewElement = false;
  elementToEdit?: Project;
  loading = false;


  form = this.fb.group({
    id: [1],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    deploy: ['', [Validators.maxLength(100)]],
    backEndRepository: ['', [Validators.maxLength(100)]],
    frontEndRepository: ['', [Validators.maxLength(100)]],
    imgUrl: ['', [Validators.maxLength(1500)]],
  });


  get id() {
    return this.form.get("id")
  }
  get title() {
    return this.form.get("title")
  }
  get description() {
    return this.form.get("description")
  }
  get deploy() {
    return this.form.get("deploy")
  }
  get backEndRepository() {
    return this.form.get("backEndRepository")
  }
  get frontEndRepository() {
    return this.form.get("frontEndRepository")
  }
  get imgUrl() {
    return this.form.get("imgUrl")
  }

  openEdition(element: Project) {
    this.elementToEdit = element;
    this.onEdit = true;
    this.form.reset()
    this.form.patchValue({
      id: element.id,
      title: element.title,
      description: element.description,
      deploy: element.deploy,
      backEndRepository: element.backEndRepository,
      frontEndRepository: element.frontEndRepository,
      imgUrl: element.imgUrl
    });
  }

  newElement() {
    this.elementToEdit = { id: undefined, title: "", description: "", imgUrl: "", deploy: "", backEndRepository: "", frontEndRepository: "" }
    this.project?.push(this.elementToEdit)
    this.onNewElement = true;
    this.onEdit = true;
    this.form.reset()
    this.form.patchValue({
      id: this.elementToEdit.id,
      title: this.elementToEdit.title,
      description: this.elementToEdit.description,
      imgUrl: this.elementToEdit.imgUrl,
      deploy: this.elementToEdit.deploy,
      backEndRepository: this.elementToEdit.backEndRepository,
      frontEndRepository: this.elementToEdit.frontEndRepository,    });
  }

  cancelForm() {
    console.log(this.imgUrl?.value);
    
    this.onEdit = false;
    if (this.onNewElement) {
      this.project?.splice(-1, 1);
      this.onNewElement = false;
    }
  }

  submitForm() {
    this.onEdit = false;
    this.loading = true;

    if (this.form.valid && !this.onNewElement) {
      this.projectService
        .put(this.form.value)
        .subscribe(result => {
          let index = this.project != undefined ? this.project.findIndex((element) => element.id == result.id) : -1
          if (index == -1) this.project?.push(result)
          this.project?.splice(index, 1, result)
          this.loading = false;
        })
    }

    if (this.form.valid && this.onNewElement) {
      this.projectService
        .post(this.form.value)
        .subscribe(result => {
          this.project?.splice(-1, 1, result)
          this.loading = false;
        });
      this.onNewElement = false;
    }
  }

  delete(id?: number) {
    this.onEdit = false;
    this.loading = true;

    if (!this.onNewElement) {
      this.projectService
        .delete(id)
        .subscribe(() => {
          let index = this.project != undefined ? this.project.findIndex((element) => element.id == id) : -1
          this.project?.splice(index, 1)
          this.loading = false;
        });
    }

    if (this.onNewElement) {
      this.cancelForm();
      this.loading = false;
    }
  }
}
