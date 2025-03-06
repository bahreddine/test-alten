import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import {map, startWith} from "rxjs";
import {CartService} from "./shared/services/cart.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, AsyncPipe],
})
export class AppComponent {
  title = "ALTEN SHOP";

  cartCount$ = this.cartService.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0)),
    startWith(0) // Valeur initiale explicite
  );

  constructor(private cartService: CartService) {}
}
