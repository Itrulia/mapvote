// angular
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
// ngrx
import {StoreModule} from "@ngrx/store";
import {RouterStoreModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
// firebase
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
// others
import {AppComponent} from "./app.component";
import {PageNotFoundComponent} from "./pages/page-not-found.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {AuthModule} from "../auth/auth.module";
import {reducers} from "../reducers";
import {GameModule} from "../game/game.module";
import {GameEffects} from "../game/game.effect";
import {ToolbarComponent} from "./components/navigation/toolbar.component";
import {MapvoteModule} from "../mapvote/mapvote.module";
import {MapVoteEffects} from "../mapvote/mapvote.effect";

const reducerConfig = {
    router: {
        path: window.location.pathname + window.location.search
    }
};

const firebaseConfig = {
    apiKey: "AIzaSyDUVEx-jiPXQVDcMoxA68uLYBViT0-cb4U",
    authDomain: "lanparty-b719e.firebaseapp.com",
    databaseURL: "https://lanparty-b719e.firebaseio.com",
    storageBucket: "lanparty-b719e.appspot.com",
    messagingSenderId: "300267658456"
};

const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup,
};

const routes = [
    // 404 Page
    {path: "**", component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        // firebase
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
        // ngrx
        StoreModule.provideStore(reducers, reducerConfig),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(GameEffects),
        EffectsModule.run(MapVoteEffects),
        RouterStoreModule.connectRouter(),
        //
        AuthModule,
        GameModule,
        MapvoteModule
    ],
    declarations: [
        AppComponent,
        NavigationComponent,
        ToolbarComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
