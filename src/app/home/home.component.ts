import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../CanActivate/auth.service';
import { Accounts } from '../core/data/account';
import { Account, createAccount, createParamSearch } from '../core/model/account.model';
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private canActive : AuthService
    ) {
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
    // this.isOpenAddAccount = true;
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
    this.router.navigate(['/add']);
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
    this.router.navigate(['/edit', acc._id]
    // {
    //     queryParams: { data: acc._id
    //   }

    )
    // {
    //   queryParams: { data: JSON.stringify(acc) },
    //   skipLocationChange : true
    // }
  }

  search(e:any): void {
    this.searchStr=e
    this.getAllAccount();
  }

  delete(acc:Account) : void {
    this.selectedAccount=acc;
    const deleteAccount = createAccount({
      ...this.selectedAccount
    })
    this.accountService.deleteAccount(deleteAccount)
    .pipe(takeUntil(this.unSubscribeAll))
    .subscribe((resp: Account[]) => {
      if(confirm('ban co chac chan muon xoa khong ?')==true)
      this.getAllAccount();
      this.isOpenEditAccount = false;
    }, (err: Error) => {
      this.account = [];
    });
  }



  login() {
    this.canActive.login();
    console.log(this.canActive.isAuthorized);
  }
  logout() {
    this.canActive.logout();
  }

}

