import { AsyncPipe } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { GetVersionMessagesUseCase } from "@review/data-access/usecases/get-version-messages";
import { VersionMessage } from "@review/util/models/version-message";
import { Observable } from "rxjs";

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