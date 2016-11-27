import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {AuthModule} from "../auth/auth.module";
import {MapvoteComponent} from "./mapvote.component";
import {ObserverComponent} from "./observer.component";

const routes = [
    {path: "mapvote/:id", component: MapvoteComponent},
    {path: "observer", component: ObserverComponent},
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forChild(routes),
        AuthModule
    ],
    declarations: [
        MapvoteComponent,
        ObserverComponent
    ]
})
export class MapvoteModule {

}
