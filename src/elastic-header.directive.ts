import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Content } from 'ionic-angular';

@Directive({
  selector: '[elasticHeader]'
})
export class ElasticHeaderDirective {
  header: HTMLElement;
  headerHeight: number;
  lastScrollTop: number = 0;
  translateAmt: number = 0;
  top: number = 0;
  offsetHeight: number = 0;
  scrollHeight: number = 0;

  @Input('elasticHeader') content: Content;

  constructor(public element: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    this.header = this.element.nativeElement;
    this.content.ionScroll.subscribe(ev =>
      requestAnimationFrame(() => this.updateElasticHeader(ev))
    );
  }

  // @HostListener("window:resize")
  // resize() {
  //   this.headerHeight = this.header.clientHeight;
  // }
  // Right now header height doesn't change when window resized. If needed in the future, use this to prevent memory leak.

  updateElasticHeader(ev: any) {
    !this.headerHeight && (this.headerHeight = this.header.clientHeight);

    this.top = ev.scrollElement.scrollTop;
    this.offsetHeight = ev.scrollElement.offsetHeight;
    this.scrollHeight = ev.scrollElement.scrollHeight;

    if (this.lastScrollTop < 0) this.translateAmt = 0;
    else if (!(this.top > this.scrollHeight - this.offsetHeight - 1)) {
      this.translateAmt += (this.lastScrollTop - ev.scrollTop) / 0.5;
      if (this.translateAmt > 0) this.translateAmt = 0;
      if (this.translateAmt < -this.headerHeight - 1.5)
        this.translateAmt = -this.headerHeight - 1.5;
    }
    this.renderer.setStyle(
      this.header,
      'transform',
      'translate(0,' + this.translateAmt + 'px)'
    );
    this.lastScrollTop = ev.scrollTop;
  }
}
