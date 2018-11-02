import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  invoices:any;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit() {
    console.log("List Invoices");
    this.getInvoices();
  }

  async getInvoices() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getInvoicesByUserId("1")
      .subscribe(res => {
        console.log(res);
        this.invoices = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  showDetail(id) {
    this.router.navigate(['/detail', JSON.stringify(id)]);
  }

}
