import { __decorate } from "tslib";
import { Input, Component, ElementRef, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position';
import { isPlatformBrowser } from '@angular/common';
export class TooltipContentComponent {
    constructor(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
    }
    get cssClasses() {
        let clz = 'ngx-charts-tooltip-content';
        clz += ` position-${this.placement}`;
        clz += ` type-${this.type}`;
        clz += ` ${this.cssClass}`;
        return clz;
    }
    ngAfterViewInit() {
        setTimeout(this.position.bind(this));
    }
    position() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const nativeElm = this.element.nativeElement;
        const hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        const elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
    }
    positionContent(nativeElm, hostDim, elmDim) {
        const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        this.renderer.setStyle(nativeElm, 'top', `${top}px`);
        this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
    positionCaret(hostDim, elmDim) {
        const caretElm = this.caretElm.nativeElement;
        const caretDimensions = caretElm.getBoundingClientRect();
        const { top, left } = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);
        this.renderer.setStyle(caretElm, 'top', `${top}px`);
        this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
    checkFlip(hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
    }
    onWindowResize() {
        this.position();
    }
}
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-tooltip-content',
                template: `
    <div>
      <span #caretElm [hidden]="!showCaret" class="tooltip-caret position-{{ this.placement }}"> </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ model: context }"> </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [".ngx-charts-tooltip-content{border-radius:3px;display:block;font-weight:400;opacity:0;pointer-events:none!important;position:fixed;z-index:5000}.ngx-charts-tooltip-content.type-popover{background:#fff;border:1px solid #72809b;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);color:#060709;font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{height:0;position:absolute;width:0;z-index:5001}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-bottom:7px solid transparent;border-left:7px solid #fff;border-top:7px solid transparent}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-bottom:7px solid transparent;border-right:7px solid #fff;border-top:7px solid transparent}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-bottom:7px solid #fff;border-left:7px solid transparent;border-right:7px solid transparent}.ngx-charts-tooltip-content.type-tooltip{background:rgba(0,0,0,.75);color:#fff;font-size:12px;padding:0 10px;pointer-events:auto;text-align:center}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75);border-top:7px solid transparent}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75);border-top:7px solid transparent}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-bottom:7px solid rgba(0,0,0,.75);border-left:7px solid transparent;border-right:7px solid transparent}.ngx-charts-tooltip-content .tooltip-label{display:block;font-size:1em;line-height:1em;padding:8px 5px 5px}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{height:0;position:absolute;width:0;z-index:5001}.ngx-charts-tooltip-content.position-right{transform:translate3d(10px,0,0)}.ngx-charts-tooltip-content.position-left{transform:translate3d(-10px,0,0)}.ngx-charts-tooltip-content.position-top{transform:translate3d(0,-10px,0)}.ngx-charts-tooltip-content.position-bottom{transform:translate3d(0,10px,0)}.ngx-charts-tooltip-content.animate{opacity:1;pointer-events:auto;transform:translateZ(0);transition:opacity .3s,transform .3s}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{line-height:1.2em;padding:5px 0;text-align:left}.tooltip-item .tooltip-item-color{border-radius:3px;color:#5b646b;display:inline-block;height:12px;margin-right:5px;width:12px}"]
            },] }
];
TooltipContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
TooltipContentComponent.propDecorators = {
    host: [{ type: Input }],
    showCaret: [{ type: Input }],
    type: [{ type: Input }],
    placement: [{ type: Input }],
    alignment: [{ type: Input }],
    spacing: [{ type: Input }],
    cssClass: [{ type: Input }],
    title: [{ type: Input }],
    template: [{ type: Input }],
    context: [{ type: Input }],
    caretElm: [{ type: ViewChild, args: ['caretElm',] }],
    cssClasses: [{ type: HostBinding, args: ['class',] }],
    onWindowResize: [{ type: HostListener, args: ['window:resize',] }]
};
__decorate([
    throttleable(100)
], TooltipContentComponent.prototype, "onWindowResize", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFFVixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0sWUFBWSxDQUFDO0FBSTVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBa0JwRCxNQUFNLE9BQU8sdUJBQXVCO0lBdUJsQyxZQUFtQixPQUFtQixFQUFVLFFBQW1CLEVBQStCLFVBQWU7UUFBOUYsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBSztJQUFHLENBQUM7SUFUckgsSUFDSSxVQUFVO1FBQ1osSUFBSSxHQUFHLEdBQUcsNEJBQTRCLENBQUM7UUFDdkMsR0FBRyxJQUFJLGFBQWEsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBSUQsZUFBZTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7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QyxXQUFXOzs7bUJBdEJ2RixLQUFLO3dCQUNMLEtBQUs7bUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUVMLFNBQVMsU0FBQyxVQUFVO3lCQUVwQixXQUFXLFNBQUMsT0FBTzs2QkFnRW5CLFlBQVksU0FBQyxlQUFlOztBQUU3QjtJQURDLFlBQVksQ0FBQyxHQUFHLENBQUM7NkRBR2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NoaWxkLFxuICBIb3N0QmluZGluZyxcbiAgUmVuZGVyZXIyLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0aHJvdHRsZWFibGUgfSBmcm9tICcuLi8uLi91dGlscy90aHJvdHRsZSc7XG5pbXBvcnQgeyBQb3NpdGlvbkhlbHBlciwgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuL3Bvc2l0aW9uJztcblxuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBBbGlnbm1lbnRUeXBlcyB9IGZyb20gJy4vYWxpZ25tZW50LnR5cGUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdG9vbHRpcC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gI2NhcmV0RWxtIFtoaWRkZW5dPVwiIXNob3dDYXJldFwiIGNsYXNzPVwidG9vbHRpcC1jYXJldCBwb3NpdGlvbi17eyB0aGlzLnBsYWNlbWVudCB9fVwiPiA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1jb250ZW50XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRpdGxlXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgbW9kZWw6IGNvbnRleHQgfVwiPiA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGl0bGVcIiBbaW5uZXJIVE1MXT1cInRpdGxlXCI+IDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi90b29sdGlwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgaG9zdDogYW55O1xuICBASW5wdXQoKSBzaG93Q2FyZXQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHR5cGU6IFN0eWxlVHlwZXM7XG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50VHlwZXM7XG4gIEBJbnB1dCgpIGFsaWdubWVudDogQWxpZ25tZW50VHlwZXM7XG4gIEBJbnB1dCgpIHNwYWNpbmc6IG51bWJlcjtcbiAgQElucHV0KCkgY3NzQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgdGVtcGxhdGU6IGFueTtcbiAgQElucHV0KCkgY29udGV4dDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoJ2NhcmV0RWxtJykgY2FyZXRFbG07XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjc3NDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgbGV0IGNseiA9ICduZ3gtY2hhcnRzLXRvb2x0aXAtY29udGVudCc7XG4gICAgY2x6ICs9IGAgcG9zaXRpb24tJHt0aGlzLnBsYWNlbWVudH1gO1xuICAgIGNseiArPSBgIHR5cGUtJHt0aGlzLnR5cGV9YDtcbiAgICBjbHogKz0gYCAke3RoaXMuY3NzQ2xhc3N9YDtcbiAgICByZXR1cm4gY2x6O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQodGhpcy5wb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdGl2ZUVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhvc3REaW0gPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIGlmIG5vIGRpbXMgd2VyZSBmb3VuZCwgbmV2ZXIgc2hvd1xuICAgIGlmICghaG9zdERpbS5oZWlnaHQgJiYgIWhvc3REaW0ud2lkdGgpIHJldHVybjtcblxuICAgIGNvbnN0IGVsbURpbSA9IG5hdGl2ZUVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLmNoZWNrRmxpcChob3N0RGltLCBlbG1EaW0pO1xuICAgIHRoaXMucG9zaXRpb25Db250ZW50KG5hdGl2ZUVsbSwgaG9zdERpbSwgZWxtRGltKTtcblxuICAgIGlmICh0aGlzLnNob3dDYXJldCkge1xuICAgICAgdGhpcy5wb3NpdGlvbkNhcmV0KGhvc3REaW0sIGVsbURpbSk7XG4gICAgfVxuXG4gICAgLy8gYW5pbWF0ZSBpdHMgZW50cnlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxtLCAnYW5pbWF0ZScpLCAxKTtcbiAgfVxuXG4gIHBvc2l0aW9uQ29udGVudChuYXRpdmVFbG0sIGhvc3REaW0sIGVsbURpbSk6IHZvaWQge1xuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBQb3NpdGlvbkhlbHBlci5wb3NpdGlvbkNvbnRlbnQodGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nLCB0aGlzLmFsaWdubWVudCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxtLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcbiAgfVxuXG4gIHBvc2l0aW9uQ2FyZXQoaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XG4gICAgY29uc3QgY2FyZXRFbG0gPSB0aGlzLmNhcmV0RWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY2FyZXREaW1lbnNpb25zID0gY2FyZXRFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IFBvc2l0aW9uSGVscGVyLnBvc2l0aW9uQ2FyZXQoXG4gICAgICB0aGlzLnBsYWNlbWVudCxcbiAgICAgIGVsbURpbSxcbiAgICAgIGhvc3REaW0sXG4gICAgICBjYXJldERpbWVuc2lvbnMsXG4gICAgICB0aGlzLmFsaWdubWVudFxuICAgICk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNhcmV0RWxtLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gIH1cblxuICBjaGVja0ZsaXAoaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XG4gICAgdGhpcy5wbGFjZW1lbnQgPSBQb3NpdGlvbkhlbHBlci5kZXRlcm1pbmVQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBAdGhyb3R0bGVhYmxlKDEwMClcbiAgb25XaW5kb3dSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbigpO1xuICB9XG59XG4iXX0=