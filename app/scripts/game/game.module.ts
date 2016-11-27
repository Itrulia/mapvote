// angular
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthModule} from "../auth/auth.module";
import {GameComponent} from "./game.component";

const routes = [
    {path: "", component: HomeComponent},
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forChild(routes),
        AuthModule
    ],
    declarations: [
        HomeComponent,
        GameComponent
    ]
})
export class GameModule {

}
