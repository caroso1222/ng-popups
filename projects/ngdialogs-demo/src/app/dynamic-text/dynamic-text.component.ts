import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'ngx-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss'],
})
export class DynamicTextComponent implements OnInit {
  subscription: Subscription;

  renderedText = '';

  targetText = '';

  private _text: string;

  @Input()
  set text(val: string) {
    this.deleteText().subscribe(() => {
      this.targetText = val;
      this.renderText(this.targetText);
    });
    this._text = val;
  }

  get text() {
    return this._text;
  }

  @Output()
  animationFinish: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  renderText(text: string) {
    this.subscription = interval(100).subscribe(() => {
      if (this.renderedText.length < this.targetText.length) {
        // assuming initial empty text
        this.renderedText += this.targetText[this.renderedText.length];
      } else {
        this.subscription.unsubscribe();
        this.animationFinish.emit();
      }
    });
  }

  deleteText() {
    return new Observable((observer) => {
      this.subscription = interval(60).subscribe(() => {
        if (this.renderedText.length > 0) {
          this.renderedText = this.renderedText.slice(0, -1);
        } else {
          this.subscription.unsubscribe();
          observer.next();
        }
      });
    });
  }
}
