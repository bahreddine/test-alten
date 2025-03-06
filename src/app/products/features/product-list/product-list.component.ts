import {Component, OnInit, inject, signal, computed} from "@angular/core";
import {Product} from "app/products/data-access/product.model";
import {ProductsService} from "app/products/data-access/products.service";
import {ProductFormComponent} from "app/products/ui/product-form/product-form.component";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {CartService} from "../../../shared/services/cart.service";
import {CurrencyPipe} from "@angular/common";
import {NgxPaginationModule, PaginationService} from "ngx-pagination";
import {FormsModule} from "@angular/forms";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule,
    ProductFormComponent, CurrencyPipe, NgxPaginationModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  public readonly paginationService = inject(PaginationService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchText: string = '';
  filteredProducts: Product[] = [];
  totalItems = 0;
  paginationId = 'productListPagination';

  ngOnInit() {
    this.productsService.get().subscribe(products => {
      this.filteredProducts = [...products]; // Copie initiale
      this.totalItems = products.length;

      this.paginationService.register({
        id: this.paginationId,
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
        totalItems: this.totalItems,
      });
    });

  }

  applyFilter() {
    this.productsService.get().subscribe(products => {
      this.filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.currentPage = 1; // Réinitialiser à la première page
    });
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
