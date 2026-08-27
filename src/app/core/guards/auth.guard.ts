import { inject } from "@angular/core"
import { UserService } from "../services/user.service"
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.hasCurrentUser()) {
        return true;
    }

    router.navigate(['/auth/login']);
    return false;
}