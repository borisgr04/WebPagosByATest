import { Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccess(message: string): void {
    alert("Ok"+message);
  }

  showError(message: string): void {
    // The second parameter is the text in the button.
    // In the third, we send in the css class for the snack bar.
    alert("Error"+message);
  }
}
