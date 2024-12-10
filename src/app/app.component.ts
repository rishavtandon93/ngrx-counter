import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService implements OnDestroy {
  private eventSource: EventSource | null = null;
  private eventSubject: Subject<string> = new Subject<string>();

  constructor() {}

  /**
   * Open connection to the SSE URL
   * @param url - The SSE URL
   * @returns Observable emitting SSE data
   */
  connect(url: string): Observable<string> {
    if (this.eventSource) {
      console.warn('Connection already open!');
      return this.eventSubject.asObservable();
    }

    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event: MessageEvent) => {
      this.eventSubject.next(event.data); // Emit the event data
    };

    this.eventSource.onerror = () => {
      console.error('SSE connection error');
      this.disconnect();
    };

    return this.eventSubject.asObservable();
  }

  /**
   * Close the SSE connection
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.eventSubject.complete();
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
