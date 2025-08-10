import { Component, inject, input } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { GetVersionMessagesUseCase } from "@review/data-access/usecases/get-version-messages";

@Component({
  selector: "right-panel",
  templateUrl: "./right-panel.component.html",
  styleUrls: ["./right-panel.component.scss"],
})
export class RightPanelComponent {
  private getVersionMessagesUseCase = inject(GetVersionMessagesUseCase);

  // Signal input replaces @Input() with getter/setter
  // If the input must be provided: use input.required<number>()
  public currentVersionId = input<number | null>(null);

  public messages = rxResource({
    params: () => this.currentVersionId(),
    stream: ({ params }) => {
      return this.getVersionMessagesUseCase.execute(params);
    },

    defaultValue: [],
  });
}
