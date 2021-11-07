import { Component, OnInit } from '@angular/core';
import { AuthService } from '@ekhmoi/angular-sdk';

interface NavigationRoute {
  name: string;
  link?: string[];
  params?: any;
  icon?: string;
  children?: NavigationRoute[];
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  routes: NavigationRoute[] = [
    { name: 'Dashboard', link: ['dashboard'], icon: 'dashboard' },
    {
      name: 'Workflows',
      icon: 'account_tree',
      children: [
        { name: 'List of workflows', link: ['workflows'] },
        { name: 'Create new workflow', link: ['workflows', 'create'] },
      ],
    },
    { name: 'Microservices', link: ['microservices'], icon: 'dns' },
    {
      name: 'User Management',
      icon: 'people',
      children: [
        { name: 'Users', link: ['settings'] },
        { name: 'Roles', link: ['settings'] },
      ],
    },
    { name: 'Settings', link: ['settings'], icon: 'settings' },
    { name: 'Logout', link: ['/'], icon: 'logout' },
  ];
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
}
