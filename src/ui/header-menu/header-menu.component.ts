import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map } from "rxjs";
import { GetStateUseCase } from "src/application/usecases/get-state";

@Component({
  selector: "header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderMenuComponent {
  public readonly activeVersionName$ = inject(GetStateUseCase)
    .execute()
    .pipe(
      map((state) => {
        if (state.activeVersionId) {
          const activeItem = state.playlist.find(
            (item) => item.id === state.activeVersionId
          );
          if (activeItem) {
            return activeItem.name;
          }
        }
        return null;
      })
    );
}
