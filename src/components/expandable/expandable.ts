import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent implements AfterViewInit {
  @ViewChild('wrapper') wrapper: ElementRef;
  @Input() expanded: boolean;
  @Input() expandedHeight: number;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.wrapper.nativeElement, 'height', `${this.expandedHeight}px`);
  }
}
