export class Translate {
  public validateCodes(errorCode): string {
    this.errorCodes.forEach(element => {
      if (errorCode === element.code) {
        return element.message;
      }
    });
    return "";
  }

  errorCodes = [
    { code: "auth/wrong-password", message: "La contraseña es inválida " },
    {
      code: "auth/user-not-found",
      message: "No hay ningún registro de usuario correspondiente a este email"
    },
    {
      code: "auth/too-many-requests",
      message: "Demasiados intentos de inicio de sesión fallidos"
    },
    {
      code: "auth/email-already-in-use",
      message:
        "La dirección de correo electrónico ya está siendo utilizada por otra cuenta."
    },
    { code: "pepito", message: "etc" },
    { code: "pepito", message: "etc" }
  ];
}
