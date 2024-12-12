import { Routes } from '@angular/router';
import { ProductsGridComponent } from './Grids/products-grid/products-grid.component';
import { VeiclesGridComponent } from './Grids/veicles-grid/veicles-grid.component';

export const routes: Routes = [
    {
        path: "products",
        component: ProductsGridComponent
    },
    {
        path: "veicles",
        component: VeiclesGridComponent
    }
];
