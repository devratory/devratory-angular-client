import { Component, OnInit } from '@angular/core';

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
    { name: 'Dashboard', link: ['/app', 'dashboard'], icon: 'dashboard' },
    {
      name: 'Workflows',
      icon: 'account_tree',
      children: [
        { name: 'List of workflows', link: ['/app', 'workflows'] },
        { name: 'Create new workflow', link: ['/app', 'workflows', 'create'] },
      ],
    },
    { name: 'Microservices', link: ['/app', 'microservices'], icon: 'dns' },
    { name: 'Settings', link: ['/app', 'settings'], icon: 'settings' },
    { name: 'Logout', link: ['/'], icon: 'logout' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
