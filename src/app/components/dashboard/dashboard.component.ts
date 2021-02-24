import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTodos } from 'src/app/actions/todo-item.actions';
import { TodoListItem } from 'src/app/models';
import { AppState, selectInboxItems } from 'src/app/reducers';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    store.dispatch(loadTodos());
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.inbox) {
        this.showInbox();
      }
    });
  }

  private showInbox(): void {
    const dlg = this.dialog.open(ListComponent, { disableClose: false, data: { filter: 'inbox' } });
    dlg.afterClosed().subscribe(_ => this.router.navigate(['dashboard']));
  }
}
