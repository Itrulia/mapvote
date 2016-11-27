import {NgModule} from "@angular/core";
import {AuthGuard} from "./guard.service";
import {AuthService} from "./auth.service";

@NgModule({
    imports: [],
    declarations: [],
    providers: [AuthGuard, AuthService]
})
export class AuthModule {

}

export * from "./auth.service";
export * from "./guard.service";