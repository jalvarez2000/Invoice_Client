import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.page.html',
  styleUrls: ['./create-invoice.page.scss'],
})
export class CreateInvoicePage implements OnInit {

  invoiceForm: FormGroup;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.invoiceForm = this.formBuilder.group({
        'Provider' : [null, Validators.required],
        'Total' : [null, Validators.required],
        'Base' : [null, Validators.required],
        'IVA' : [null, Validators.required],
        'Comments' : [null, Validators.required],
        'Billing_Date' : [null, Validators.required],

      });
    }

  ngOnInit() {
  }

  async saveInvoice(){
    await this.api.postInvoiceForm(this.invoiceForm.value)
    .subscribe(res => {
        let id = res['id'];
        this.router.navigate(['/invoices']);
      }, (err) => {
        console.log(err);
      });
  }

}
