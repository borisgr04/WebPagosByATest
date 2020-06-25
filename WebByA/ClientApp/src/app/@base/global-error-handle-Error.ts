import * as Rollbar from 'rollbar';
import { ErrorHandler, Injectable, Injector, InjectionToken, Inject} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { ErrorService } from './error-service';
//import { NotificationService } from './notification-service';

/*
SENTRY
*/
import * as Sentry from "@sentry/browser";
import { environment } from 'src/environments/environment';
Sentry.init({
  dsn: "https://9bd5d6b8254444b480e029f1d51c12a8@o409680.ingest.sentry.io/5282728",
  // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
  // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
  // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
  integrations: [new Sentry.Integrations.TryCatch({
    XMLHttpRequest: false,
  })],
});
@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  extractError(error) {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === "string" || error instanceof Error) {
      return error;
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // The `error` property of http exception can be either an `Error` object, which we can use directly...
      if (error.error instanceof Error) {
        return error.error;
      }

      // ... or an`ErrorEvent`, which can provide us with the message but no stack...
      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === "string") {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    return null;
  }

  handleError(error) {
    let extractedError = this.extractError(error) || "Handled unknown error";

    // Capture handled exception and send it to Sentry.
    const eventId = Sentry.captureException(extractedError);

    // When in development mode, log the error to console for immediate feedback.
    if (!environment.production) {
      console.error(extractedError);
    }

    // Optionally show user dialog to provide details on what happened.
    Sentry.showReportDialog({ eventId });
  }
}
/*

END SENTRY
*/

const rollbarConfig = {
  accessToken: '0cbf4ce96e3c4e55a3b18b11062a18b7',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const rollbar= this.injector.get(RollbarService);
    //const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
        // Server Error
        message = errorService.getServerMessage(error);
        stackTrace = errorService.getServerStack(error);
        //notifier.showError(message);
    } else {
        // Client Error
        message = errorService.getClientMessage(error);
        stackTrace = errorService.getClientStack(error);
        //notifier.showError(message);
    }
    rollbar.error(error);

    // Always log errors
    logger.logError(message, stackTrace);

    console.error(error);
}

}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}


