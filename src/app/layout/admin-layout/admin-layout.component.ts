import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
  }
  isSidebarToggled = true;
  isSubmenuActive = true;
  isDropdownActive = false;

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }

  closeSidebar() {
    this.isSidebarToggled = false;
  }

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }
}
