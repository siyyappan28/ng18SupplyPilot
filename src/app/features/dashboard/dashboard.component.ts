import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersApiService } from '../../core/services/users-api.service';
import { User } from '../../models/user.model';
import { ORACLE_DATA_TYPE_OPTIONS, OracleDataType } from '../../models/datatype.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users: User[] = [];
  loading = false;
  error: string = '';
  oracleDataTypes: OracleDataType[] = ORACLE_DATA_TYPE_OPTIONS;
  constructor(private usersService: UsersApiService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (userlist: any) => {
        // Add a placeholder profile image to each user
        this.users = userlist?.data?.map((user: any) => ({
          ...user,
          profileImage: user.avatar || 'assets/image/user.png' // Default image if avatar is not available
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
}
