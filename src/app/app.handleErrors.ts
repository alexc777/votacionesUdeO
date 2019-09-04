import { ErrorHandler, Inject, Injector, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class LoginErrorHndler extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }
  private get toastService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public handleError(error: any): void {
    this.toastService.error("Se ha producido un error inesperado"),
      "Error",
      {
        closeButton: true,
        onActivateTick: true
      };
    super.handleError(error);
  }
}
