import {Component, OnInit, VERSION} from '@angular/core';
import {AccountService} from './core/services/account.service';
import {Observable, Subject} from 'rxjs';
import {Account, createAccount, createParamSearch} from './core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import {Accounts} from './core/data/account';
import * as faker from 'faker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';

  constructor( private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }


  getAllAccount(): void {
    this.accountService.getAccounts(createParamSearch({
      last_name: this.searchStr,
      start: 0,
      limit: 10
    }))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.account = resp;
      }, (err: Error) => {
        this.account = [];
      });
  }

  openAddAccount(): void {
    this.isOpenAddAccount = true;
    const acc: Account = {
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
    this.selectedAccount= acc;
    // this.router.navigate(['addControl']);
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
    // this.router.navigate(['editControl']);
  }

  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: this.selectedAccount?.age,
      // lastname: faker.name.lastName(),
      // firstname: faker.name.lastName(),
      lastname : this.selectedAccount?.lastname,
      firstname : this.selectedAccount?.firstname,
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
        this.getAllAccount();
        this.isOpenEditAccount = false;
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
          this.router.navigate([''], {});
        },
        (err: Error) => {
          alert('Thất bại');
        }
      );
  }

  search(e:any): void {
    this.searchStr=e
    this.getAllAccount();
  }

  close():void {
    this.isOpenAddAccount=false;
    this.isOpenEditAccount=false;
  }

  delete(acc:Account) : void {
    this.selectedAccount=acc;
    const deleteAccount = createAccount({
      ...this.selectedAccount
    })
    this.accountService.deleteAccount(deleteAccount)
    .pipe(takeUntil(this.unSubscribeAll))
    .subscribe((resp: Account[]) => {
      this.getAllAccount();
      this.isOpenEditAccount = false;
    }, (err: Error) => {
      this.account = [];
    });
  }
}
