import { ElementRef, Renderer2 } from '@angular/core';
import { Content } from 'ionic-angular';
export declare class ElasticHeaderDirective {
    element: ElementRef;
    renderer: Renderer2;
    header: HTMLElement;
    headerHeight: number;
    lastScrollTop: number;
    translateAmt: number;
    content: Content;
    constructor(element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    updateElasticHeader(scrollTop: number): void;
}
