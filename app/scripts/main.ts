import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import {RouterState} from "@ngrx/router-store";
// import {enableProdMode} from "@angular/core";

export interface AppState {
    router: RouterState;
}

// enableProdMode();
platformBrowserDynamic()
    .bootstrapModule(AppModule);