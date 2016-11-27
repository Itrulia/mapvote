import {Injectable} from "@angular/core";
import {AngularFire, FirebaseAuthState} from "angularfire2";

@Injectable()
export class AuthService {
    constructor(private af: AngularFire) {

    }

    public login(): Promise<FirebaseAuthState> {
        return this.af.auth.login() as Promise<FirebaseAuthState>;
    }

    public logout(): void {
        this.af.auth.logout();
    }
}