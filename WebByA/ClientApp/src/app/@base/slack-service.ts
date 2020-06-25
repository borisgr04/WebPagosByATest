import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//npm install --save rollbar
@Injectable({
    providedIn: 'root'
})
export class SlackService {

    private webHook = 'https://hooks.slack.com/services/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';
    private options = {
        headers: new HttpHeaders(
          { 'Content-Type': 'application/x-www-form-urlencoded'}
        )
    };

    constructor(private http: HttpClient) { }

    postErrorOnSlack(message:string, stack:string): void {

        const messageToSend = {
            channel: '#general',
            text: message,
            attachments: [
              {
                author_name: window.location.href,
                color: 'danger',
                title: 'Trace',
                text: stack
              }
            ]
        }

        this.http.post<any>(this.webHook,JSON.stringify(messageToSend), this.options).subscribe();
    }
}
