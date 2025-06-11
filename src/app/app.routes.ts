import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';


export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'  // ✅ Default redirect to login
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'datacolumns',
        canActivate: [authGuard],
        loadComponent: () => import('./features/column-form/column-form.component').then(m => m.ColumnFormComponent)
    },
    {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
      path: '**',
      redirectTo: 'login'  // 🔁 Optional: wildcard route to login
    }
];
// This is a simple routing module for an Angular application. It defines two routes:
// 1. The 'dashboard' route, which is protected by an authentication guard (authGuard). If the user is authenticated, it loads the DashboardComponent.
// 2. The root path ('') which loads the authentication routes from the auth.routes module. This is where the login component would be defined.
// The appRoutes array is used to configure the routing for the application, allowing for lazy loading of components and route protection.
// The authGuard is a function that checks if the user is authenticated before allowing access to the dashboard route. If not authenticated, it redirects the user to the login page.
// The loadChildren syntax is used for lazy loading, which helps in optimizing the application by loading modules only when needed.
// This approach improves the performance of the application by reducing the initial load time and allowing for better code organization.
// The appRoutes array is exported for use in the main application module, where it will be imported and used to configure the Angular Router.
// The routes are defined in a way that allows for easy expansion in the future, such as adding more protected routes or additional features.
// The use of lazy loading and route guards is a common practice in Angular applications to enhance security and performance.
// The appRoutes array is a key part of the application's routing configuration, enabling a modular and maintainable structure for handling navigation and access control within the app.
// The routes are defined in a way that allows for easy expansion in the future, such as adding more protected routes or additional features.
