import { Component, Input } from "@angular/core";

@Component({
  selector: "header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
  standalone: true,
})
export class HeaderMenuComponent {
  @Input() activeVersionName: string | null | undefined = null;
}
