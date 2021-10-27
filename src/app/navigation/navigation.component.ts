import { Component, OnInit } from '@angular/core';

interface NavigationRoute {
  name: string;
  link: string[];
  params?: any;
  icon?: string;
}
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  routes: NavigationRoute[] = [
    { name: 'Dashboard', link: ['/dashboard'] },
    { name: 'Workflows', link: ['/workflows'] },
    { name: 'Microservices', link: ['/microservices'] },
    { name: 'Settings', link: ['/settings'] },
  ];
  constructor() {}

  ngOnInit(): void {}
}
