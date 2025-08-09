import { AsyncPipe } from "@angular/common";
import { Component, computed, effect, inject, input } from "@angular/core";
import { Observable } from "rxjs";
import { VersionMessage } from "src/libs/review/util/models/version-message";
import { GetVersionMessagesUseCase } from "./usecases/get-version-messages";

@Component({
  selector: "right-panel",
  templateUrl: "./right-panel.component.html",
  styleUrls: ["./right-panel.component.scss"],
  imports: [AsyncPipe],
})
export class RightPanelComponent {
  private getVersionMessagesUseCase = inject(GetVersionMessagesUseCase);

  // Signal input replaces @Input() with getter/setter
  // If the input must be provided: use input.required<number>()
  public currentVersionId = input<number | null>(null);
  
  public messages$ = computed<Observable<VersionMessage[]> | null>(() => {
    const id = this.currentVersionId();
    return id ? this.getVersionMessagesUseCase.execute(id) : null;
  });
}