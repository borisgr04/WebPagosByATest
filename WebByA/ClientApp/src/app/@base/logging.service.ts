import { Injectable } from '@angular/core';
import { SlackService } from './slack-service';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    constructor(private slackService: SlackService) { }

    logError(message: string, stack: string) {
      console.log('LoggingService: ' + message);
      this.slackService.postErrorOnSlack(message,stack);
    }
}
