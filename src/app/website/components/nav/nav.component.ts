import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.mode';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter:number = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(private storeSvc: StoreService,
    private authService: AuthService,
    private categorySvc: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.storeSvc.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe( data => {
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(user => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories(){
    this.categorySvc.getAll().subscribe( data => {
      this.categories = data;
    })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
