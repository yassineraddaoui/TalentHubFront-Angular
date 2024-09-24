import { Component, OnInit ,VERSION} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {TestNiveauService} from "../../../Services/test-niveau.service";
import {QuestionService} from "../../../Services/question.service";
import {TestNiveau} from "../../../Entity/TestNiveau";
import {Question} from "../../../Entity/Question";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {

  public test: TestNiveau={
      id: 0,
      titre:"",
      questions: [],
      nb_questions: 0,
      duree: 0,
      score_min: 0,
      scoreTests: [],
    user_id:this.userAuthentificationService.getUserId()
  };
  public tests: TestNiveau[] = [];
  public addtest: boolean= false;

  constructor(private testNiveauService: TestNiveauService,
              private questionService: QuestionService,
              private userAuthentificationService: UserAuthentificationService,
              private recruteurService: RecruteurService,
              private router: Router) { }

    form!: FormGroup;

    ngOnInit() {

        this.form = new FormGroup({
            question: new FormArray([
                new FormGroup({
                    enance: new FormControl(''),
                    rep_vrai: new FormControl(''),
                    rep_faux1: new FormControl(''),
                    rep_faux2: new FormControl(''),
                    rep_faux3: new FormControl('')
            })
            ])
        });
        this.getTestNiveaux();
    }

    getTestNiveaux(){
        const userId = localStorage.getItem('userId'); 

        if (userId) {
      this.testNiveauService.getTestsUser(userId).subscribe(
        (response) => {
          this.tests = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    }
    get question(): FormArray {
        return this.form.get('question') as FormArray;
    }

    addquestion() {
        this.question.push(
            new FormGroup({
                enance: new FormControl(''),
                rep_vrai: new FormControl(''),
                rep_faux1: new FormControl(''),
                rep_faux2: new FormControl(''),
                rep_faux3: new FormControl('')
            })
        );
    }

  public addTest() {
        this.test.nb_questions= this.form.value.question.length;
        this.test.user_id=this.userAuthentificationService.getUserId();
        for (let q of this.form.value.question){
            let qstn={
                id: null,
                enance: q.enance,
                rep_vrai:[q.rep_vrai],
                rep_faux:[q.rep_faux1,q.rep_faux2,q.rep_faux3]
            }
            this.test.questions.push(qstn);
        }
    this.testNiveauService.addTest(this.test).subscribe();
  }

    ajoutTest() {
        this.addtest = !this.addtest;
    }

    public getDetailsTest(idtest: number) {
        this.router.navigate(['/test'], { queryParams: { idt: idtest} });
    }


    public deleteTest(id: number): void{
        this.testNiveauService.deleteTest(id).subscribe(
            (response: void) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

}
