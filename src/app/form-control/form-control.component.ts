import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../core/services/account.service';
import { Observable, Subject } from 'rxjs';
import {
  Account,
  createAccount,
  createParamSearch,
} from '../core/model/account.model';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from '../core/data/account';
import * as faker from 'faker';
import { ActivatedRoute, Router } from '@angular/router';
import { fake } from 'faker';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  selectedAccount: Account={
    _id: '',
    account_number: '',
    balance: 0,
    age: 0,
    firstname: '',
    lastname: '',
    gender: '',
    address: '',
    employer: '',
    email: '',
    city: '',
    state: '',
  };

  unSubscribeAll: Subject<any>;
  isAdd: boolean | undefined;
  isEdit: boolean | undefined;
  account: Account[] | undefined;

  id: string | undefined ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.unSubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {

     //  this.id = this.route.snapshot.paramMap.get('id')?.toString();

    //  if (typeof this.id !=='undefined') {
    //   this.getAllAccount();
    //  }

    if (this.router.url.split('/')[1] === "add") {
      this.isAdd = true;
      this.isEdit = false;
    } else {
      this.selectedAccount = this.route.snapshot.data.data_id[0];
      this.isAdd = false;
      this.isEdit = true;
    }
  }

  // getAllAccount(): void {
  //   this.accountService.getAccounts(createParamSearch({
  //     _id: this.id,
  //     start: 0,
  //     limit: 10
  //   }))
  //     .pipe(takeUntil(this.unSubscribeAll))
  //     .subscribe((resp: Account[]) => {
  //       this.selectedAccount = resp[0];
  //       console.log(this.id);
  //     }, (err: Error) => {
  //       this.account = [];
  //     });
  // }

  onSubmit() {
    console.log('ok');
  }


  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: this.selectedAccount?.age,
      lastname: this.selectedAccount?.lastname,
      firstname: this.selectedAccount?.firstname,
      city: this.selectedAccount?.city,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: this.selectedAccount?.gender,
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id
    });
    this.accountService.editAccount(editedAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        alert('Sửa thành công');
        this.router.navigate(['/'])
      }, (err: Error) => {
        this.account = [];
      });
  }

  saveNew(): void {
    const newAccount = createAccount({
      // balance: parseInt(faker.finance.amount(0, 99999), 0),
      // age: this.selectedAccount?.age,
      // lastname: this.selectedAccount?.lastname,
      // firstname: this.selectedAccount?.firstname,
      // city: faker.address.city(),
      // account_number: faker.finance.account(),
      // address: this.selectedAccount?.address,
      // email: this.selectedAccount?.email,
      // employer: this.selectedAccount?.employer,
      // gender: this.selectedAccount?.gender,
      // state: this.selectedAccount?.state,
      ...this.selectedAccount
    });

    this.accountService
      .addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          alert('Thêm mới thành công');
          this.router.navigate(['/']);
        },
        (err: Error) => {
          alert('Thất bại');
        }
      );
  }

  isEditMode = false;

  toggleEdit() {
    this.isEditMode= !this.isEditMode
  }

}
