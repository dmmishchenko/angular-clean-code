import "zone.js";
import { Component, enableProdMode, provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, RouterOutlet } from "@angular/router";
import { routes } from "./routes";
import { environment } from "./environments/environment";

@Component({
    selector: "my-app",
    imports: [RouterOutlet],
    template: ` <router-outlet></router-outlet> `
})
export class App {}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes)],
});
