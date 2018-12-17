  import { Router } from '@angular/router';
  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
  import { LiveNoTestingService } from './live-no-testing.service';
  import { finalize } from 'rxjs/operators';
  import { Logger, AuthenticationService } from '@app/core';
  import { SuppliersListService } from '@app/suppliers/suppliers-list.service';
  import { ToastrService } from '@app/toastr.service';
import { FilterPipe } from '@app/shared/filter.pipe';
  declare var NProgress: any;
  const log = new Logger('SenderList');
  @Component({
    selector: 'app-live-no-testing',
    templateUrl: './live-no-testing.component.html',
    styleUrls: ['./live-no-testing.component.scss'],
    providers: [ FilterPipe ]
  })
  export class LiveNoTestingComponent implements OnInit {
    myForm: FormGroup;
    selectedAll: any;
    selectedAll1: any;
    searchText: any;
    searchText1: any;
    sendersList = [{ id: '', sender_name: '' }];
    supplier = [{ id: '', selected: false }];
    networkList = [{ _id: '', selected: false }];
    transformList = [{ _id: '', selected: false }];
    error: string;
    network: any = {};
    connection: any = {};
    connectionId:any;
    emailFormArray:any;
    radioButtonValues : Array<any> = [];
    constructor(
      private fLiveNoTestingService: LiveNoTestingService,
      private suppliersListService: SuppliersListService,
      private authenticationService: AuthenticationService,
      private toastr: ToastrService,
      private router: Router,
      private fb: FormBuilder,
      private filterpipe:FilterPipe
    ) { }

    ngOnInit() {
      this.getSender();
      this.getSuppliers();
      this.getNetworkList();
      this.myForm = this.fb.group({
        networkId: this.fb.array([]),
        senderId: ['', Validators.required],
        text: ['', Validators.required]
       // connectionId: ['', Validators.required],
      });
      this.emailFormArray = <FormArray>this.myForm.controls.networkId;
    }
    public selectAll(isChecked: boolean) {
      this.emailFormArray = new FormArray([])
      this.transformList = this.filterpipe.transform(this.networkList,this.searchText);

      for (var i = 0; i < this.transformList.length; i++) {
        this.transformList[i].selected = this.selectedAll;
        if (isChecked) {
          console.log('push');
          this.emailFormArray.push(new FormControl(this.transformList[i]._id));
        } else {
          console.log('remove');
          let index = this.emailFormArray.controls.findIndex(x => x.value == this.networkList[i]._id);
          this.emailFormArray.removeAt(index);
          //console.log(this.emailFormArray.value);
        }
        this.network = this.emailFormArray.value.toString();
       // console.log(this.network);
      }
    }
    public checkIfAllSelected(_id: any, isChecked: boolean) {
      // this.selectedAll = this.networkList.every(function(item: any) {
      //   return item.selected == true;
      // });
      if (isChecked) {
        console.log('push');
        this.emailFormArray.push(new FormControl(_id));
      } else {
        console.log('remove');
        let index = this.emailFormArray.controls.findIndex(x => x.value == _id);
        this.emailFormArray.removeAt(index);
        console.log(this.emailFormArray);
      }
      this.network = this.emailFormArray.value.toString();
      console.log(this.network);
    }
    public selectAll1() {
      for (var i = 0; i < this.supplier.length; i++) {
        this.supplier[i].selected = this.selectedAll1;
        console.log(this.supplier[i]);
      }
    }
    public checkIfAllSelected1(id: any, isChecked: boolean) {
      this.selectedAll1 = this.supplier.every(function (item: any) {
        return item.selected == true;
      });
      const emailArray = <FormArray>this.myForm.controls.connectionId;
      if (isChecked) {
        emailArray.push(new FormControl(id));
      } else {
        let index = emailArray.controls.findIndex(x => x.value == id);
        emailArray.removeAt(index);
      }
      this.connection = emailArray.value.toString();
      console.log(this.connection);
    }

    public getSender() {
      NProgress.start();
      this.fLiveNoTestingService
        .getSendersList()
        .pipe(
          finalize(() => {
            NProgress.done();
          })
        )
        .subscribe(
          (response: any) => {
            this.sendersList = response;
            //console.log(this.sendersList);
          },
          (error: any) => {
            log.debug(`error: ${error}`);
            // this.error_msg = error.error.msgString;
            // this.error = error.error.message;
            // console.log(this.error);
          }
        );
    }
    public getSuppliers() {
      NProgress.start();
      this.suppliersListService
        .getSuppliers()
        .pipe(
          finalize(() => {
            NProgress.done();
          })
        )
        .subscribe(
          (response: any) => {
            this.supplier = response;
            //console.log(this.supplier);
          },
          (error: any) => {
            // debugger;
            log.debug(`error: ${error}`);
            // this.error_msg = error.error.msgString;
            // this.error = error.error.message;
            // console.log(this.error);
          }
        );
    }
    public getNetworkList() {
      NProgress.start();
      this.fLiveNoTestingService
        .getNetwoks()
        .pipe(
          finalize(() => {
            NProgress.done();
          })
        )
        .subscribe(
          (response: any) => {
            this.networkList = response;
            //console.log(this.networkList);
          },
          (error: any) => {
            // debugger;
            log.debug(`error: ${error}`);
            // this.error_msg = error.error.msgString;
            // this.error = error.error.message;
            // console.log(this.error);
          }
        );
    }

    public onSubmit() {
      this.myForm.value.connectionId = this.connectionId;
      this.myForm.value.networkId = this.network;
      if (this.myForm.valid) {
        NProgress.start();
        this.authenticationService
          .addNewConnection(this.myForm.value)
          .pipe(
            finalize(() => {
              this.myForm.markAsPristine();
              NProgress.done();
            })
          )
          .subscribe(
            credentials => {
              // this.authenticationService.setCredentials(credentials, this.myForm.value.remember);
              this.toastr.Success('New Connection Successfully!');
              this.router.navigate(['/live-no-testing-report'], { replaceUrl: true });
              this.myForm.reset();
              //console.log(credentials);
            },
            error => {
              this.toastr.error('Cannot be Add Connection');
              this.error = error;
              console.log(this.error);
            }
          );
      }
    }
  }
