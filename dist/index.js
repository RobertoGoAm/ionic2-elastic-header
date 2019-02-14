import {
  Directive,
  ElementRef,
  Input,
  NgModule,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';

var ElasticHeaderDirective = (function() {
  /**
   * @param {?} element
   * @param {?} renderer
   */
  function ElasticHeaderDirective(element, renderer) {
    this.element = element;
    this.renderer = renderer;
    this.lastScrollTop = 0;
    this.translateAmt = 0;
    this.top = 0;
    this.offsetHeight = 0;
    this.scrollHeight = 0;
  }
  /**
   * @return {?}
   */
  ElasticHeaderDirective.prototype.ngOnInit = function() {
    var _this = this;
    this.header = this.element.nativeElement;
    this.content.ionScroll.subscribe(function(ev) {
      return requestAnimationFrame(function() {
        return _this.updateElasticHeader(ev);
      });
    });
  };
  /**
   * @param {?} ev
   * @return {?}
   */
  ElasticHeaderDirective.prototype.updateElasticHeader = function(ev) {
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
  };
  return ElasticHeaderDirective;
})();
ElasticHeaderDirective.decorators = [
  {
    type: Directive,
    args: [
      {
        selector: '[elasticHeader]'
      }
    ]
  }
];
/**
 * @nocollapse
 */
ElasticHeaderDirective.ctorParameters = function() {
  return [{ type: ElementRef }, { type: Renderer2 }];
};
ElasticHeaderDirective.propDecorators = {
  content: [{ type: Input, args: ['elasticHeader'] }]
};

var ElasticHeaderModule = (function() {
  function ElasticHeaderModule() {}
  return ElasticHeaderModule;
})();
ElasticHeaderModule.decorators = [
  {
    type: NgModule,
    args: [
      {
        imports: [CommonModule],
        declarations: [ElasticHeaderDirective],
        exports: [ElasticHeaderDirective]
      }
    ]
  }
];
/**
 * @nocollapse
 */
ElasticHeaderModule.ctorParameters = function() {
  return [];
};

export { ElasticHeaderModule, ElasticHeaderDirective };
