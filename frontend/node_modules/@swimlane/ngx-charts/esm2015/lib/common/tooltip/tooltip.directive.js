import { Directive, Input, Output, EventEmitter, HostListener, ViewContainerRef, Renderer2 } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';
import { TooltipService } from './tooltip.service';
export class TooltipDirective {
    constructor(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.top;
        this.tooltipAlignment = AlignmentTypes.center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    get listensForFocus() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.focus;
    }
    get listensForHover() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.mouseover;
    }
    ngOnDestroy() {
        this.hideTooltip(true);
    }
    onFocus() {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    }
    onBlur() {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    }
    onMouseEnter() {
        if (this.listensForHover) {
            this.showTooltip();
        }
    }
    onMouseLeave(target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                const contentDom = this.component.instance.element.nativeElement;
                const contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    }
    onMouseClick() {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    }
    showTooltip(immediate) {
        if (this.component || this.tooltipDisabled)
            return;
        const time = immediate
            ? 0
            : this.tooltipShowTimeout + (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 300 : 0);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltipService.destroyAll();
            const options = this.createBoundOptions();
            this.component = this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(() => {
                if (this.component) {
                    this.addHideListeners(this.component.instance.element.nativeElement);
                }
            }, 10);
            this.show.emit(true);
        }, time);
    }
    addHideListeners(tooltip) {
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
            clearTimeout(this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
                this.hideTooltip(this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen('window', 'click', event => {
                const contains = tooltip.contains(event.target);
                if (!contains)
                    this.hideTooltip();
            });
        }
    }
    hideTooltip(immediate = false) {
        if (!this.component)
            return;
        const destroyFn = () => {
            // remove events
            if (this.mouseLeaveContentEvent)
                this.mouseLeaveContentEvent();
            if (this.mouseEnterContentEvent)
                this.mouseEnterContentEvent();
            if (this.documentClickEvent)
                this.documentClickEvent();
            // emit events
            this.hide.emit(true);
            // destroy component
            this.tooltipService.destroy(this.component);
            this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    }
    createBoundOptions() {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-tooltip]' },] }
];
TooltipDirective.ctorParameters = () => [
    { type: TooltipService },
    { type: ViewContainerRef },
    { type: Renderer2 }
];
TooltipDirective.propDecorators = {
    tooltipCssClass: [{ type: Input }],
    tooltipTitle: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    tooltipSpacing: [{ type: Input }],
    tooltipDisabled: [{ type: Input }],
    tooltipShowCaret: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipAlignment: [{ type: Input }],
    tooltipType: [{ type: Input }],
    tooltipCloseOnClickOutside: [{ type: Input }],
    tooltipCloseOnMouseLeave: [{ type: Input }],
    tooltipHideTimeout: [{ type: Input }],
    tooltipShowTimeout: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    tooltipShowEvent: [{ type: Input }],
    tooltipContext: [{ type: Input }],
    tooltipImmediateExit: [{ type: Input }],
    show: [{ type: Output }],
    hide: [{ type: Output }],
    onFocus: [{ type: HostListener, args: ['focusin',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave', ['$event.target'],] }],
    onMouseClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25ELE1BQU0sT0FBTyxnQkFBZ0I7SUFvQzNCLFlBQ1UsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQ2xDLFFBQW1CO1FBRm5CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7UUF0Q3BCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBQzdCLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUNwQyxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMscUJBQWdCLEdBQW1CLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDdEQscUJBQWdCLEdBQW1CLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDekQsZ0JBQVcs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LE9BQU87WUFDbkMsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDaEMsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3RCLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzdCLENBQUM7SUFDSixDQUFDOzs7WUEvS0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7O1lBRi9CLGNBQWM7WUFWckIsZ0JBQWdCO1lBQ2hCLFNBQVM7Ozs4QkFhUixLQUFLOzJCQUNMLEtBQUs7a0NBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLOytCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5Q0FDTCxLQUFLO3VDQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzs2QkFDTCxLQUFLO21DQUNMLEtBQUs7bUJBRUwsTUFBTTttQkFDTixNQUFNO3NCQTBCTixZQUFZLFNBQUMsU0FBUztxQkFPdEIsWUFBWSxTQUFDLE1BQU07MkJBT25CLFlBQVksU0FBQyxZQUFZOzJCQU96QixZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDOzJCQWU1QyxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyMixcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBBbGlnbm1lbnRUeXBlcyB9IGZyb20gJy4vYWxpZ25tZW50LnR5cGUnO1xuaW1wb3J0IHsgU2hvd1R5cGVzIH0gZnJvbSAnLi9zaG93LnR5cGUnO1xuXG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4vdG9vbHRpcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neC10b29sdGlwXScgfSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdG9vbHRpcENzc0NsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgdG9vbHRpcFRpdGxlOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRvb2x0aXBTcGFjaW5nOiBudW1iZXIgPSAxMDtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBTaG93Q2FyZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzLnRvcDtcbiAgQElucHV0KCkgdG9vbHRpcEFsaWdubWVudDogQWxpZ25tZW50VHlwZXMgPSBBbGlnbm1lbnRUeXBlcy5jZW50ZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXBUeXBlOiBTdHlsZVR5cGVzID0gU3R5bGVUeXBlcy5wb3BvdmVyO1xuICBASW5wdXQoKSB0b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRvb2x0aXBIaWRlVGltZW91dDogbnVtYmVyID0gMzAwO1xuICBASW5wdXQoKSB0b29sdGlwU2hvd1RpbWVvdXQ6IG51bWJlciA9IDEwMDtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBhbnk7XG4gIEBJbnB1dCgpIHRvb2x0aXBTaG93RXZlbnQ6IFNob3dUeXBlcyA9IFNob3dUeXBlcy5hbGw7XG4gIEBJbnB1dCgpIHRvb2x0aXBDb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIHRvb2x0aXBJbW1lZGlhdGVFeGl0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNob3cgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBoaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZ2V0IGxpc3RlbnNGb3JGb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8IHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmZvY3VzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbGlzdGVuc0ZvckhvdmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5hbGwgfHwgdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMubW91c2VvdmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnQ6IGFueTtcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XG4gIHByaXZhdGUgbW91c2VMZWF2ZUNvbnRlbnRFdmVudDogYW55O1xuICBwcml2YXRlIG1vdXNlRW50ZXJDb250ZW50RXZlbnQ6IGFueTtcbiAgcHJpdmF0ZSBkb2N1bWVudENsaWNrRXZlbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRvb2x0aXBTZXJ2aWNlOiBUb29sdGlwU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVUb29sdGlwKHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicpXG4gIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckZvY3VzKSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9yRm9jdXMpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIpIHtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uTW91c2VMZWF2ZSh0YXJnZXQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIgJiYgdGhpcy50b29sdGlwQ2xvc2VPbk1vdXNlTGVhdmUpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGVudERvbSA9IHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY29udGFpbnMgPSBjb250ZW50RG9tLmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgIGlmIChjb250YWlucykgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVUb29sdGlwKHRoaXMudG9vbHRpcEltbWVkaWF0ZUV4aXQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25Nb3VzZUNsaWNrKCkge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3Zlcikge1xuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBzaG93VG9vbHRpcChpbW1lZGlhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50IHx8IHRoaXMudG9vbHRpcERpc2FibGVkKSByZXR1cm47XG5cbiAgICBjb25zdCB0aW1lID0gaW1tZWRpYXRlXG4gICAgICA/IDBcbiAgICAgIDogdGhpcy50b29sdGlwU2hvd1RpbWVvdXQgKyAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvXFwoaVteO10rOyggVTspPyBDUFUuK01hYyBPUyBYLykgPyAzMDAgOiAwKTtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95QWxsKCk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZUJvdW5kT3B0aW9ucygpO1xuICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLnRvb2x0aXBTZXJ2aWNlLmNyZWF0ZShvcHRpb25zKTtcblxuICAgICAgLy8gYWRkIGEgdGlueSB0aW1lb3V0IHRvIGF2b2lkIGV2ZW50IHJlLXRyaWdnZXJzXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgdGhpcy5hZGRIaWRlTGlzdGVuZXJzKHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcblxuICAgICAgdGhpcy5zaG93LmVtaXQodHJ1ZSk7XG4gICAgfSwgdGltZSk7XG4gIH1cblxuICBhZGRIaWRlTGlzdGVuZXJzKHRvb2x0aXApOiB2b2lkIHtcbiAgICAvLyBvbiBtb3VzZSBlbnRlciwgY2FuY2VsIHRoZSBoaWRlIHRyaWdnZXJlZCBieSB0aGUgbGVhdmVcbiAgICB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0b29sdGlwLCAnbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29udGVudCBtb3VzZSBsZWF2ZSBsaXN0ZW5lclxuICAgIGlmICh0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odG9vbHRpcCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb250ZW50IGNsb3NlIG9uIGNsaWNrIG91dHNpZGVcbiAgICBpZiAodGhpcy50b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb250YWlucyA9IHRvb2x0aXAuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKCFjb250YWlucykgdGhpcy5oaWRlVG9vbHRpcCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZVRvb2x0aXAoaW1tZWRpYXRlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBkZXN0cm95Rm4gPSAoKSA9PiB7XG4gICAgICAvLyByZW1vdmUgZXZlbnRzXG4gICAgICBpZiAodGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50KSB0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQoKTtcbiAgICAgIGlmICh0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQpIHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCgpO1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KSB0aGlzLmRvY3VtZW50Q2xpY2tFdmVudCgpO1xuXG4gICAgICAvLyBlbWl0IGV2ZW50c1xuICAgICAgdGhpcy5oaWRlLmVtaXQodHJ1ZSk7XG5cbiAgICAgIC8vIGRlc3Ryb3kgY29tcG9uZW50XG4gICAgICB0aGlzLnRvb2x0aXBTZXJ2aWNlLmRlc3Ryb3kodGhpcy5jb21wb25lbnQpO1xuICAgICAgdGhpcy5jb21wb25lbnQgPSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlc3Ryb3lGbiwgdGhpcy50b29sdGlwSGlkZVRpbWVvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95Rm4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJvdW5kT3B0aW9ucygpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUsXG4gICAgICB0ZW1wbGF0ZTogdGhpcy50b29sdGlwVGVtcGxhdGUsXG4gICAgICBob3N0OiB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudCxcbiAgICAgIHBsYWNlbWVudDogdGhpcy50b29sdGlwUGxhY2VtZW50LFxuICAgICAgYWxpZ25tZW50OiB0aGlzLnRvb2x0aXBBbGlnbm1lbnQsXG4gICAgICB0eXBlOiB0aGlzLnRvb2x0aXBUeXBlLFxuICAgICAgc2hvd0NhcmV0OiB0aGlzLnRvb2x0aXBTaG93Q2FyZXQsXG4gICAgICBjc3NDbGFzczogdGhpcy50b29sdGlwQ3NzQ2xhc3MsXG4gICAgICBzcGFjaW5nOiB0aGlzLnRvb2x0aXBTcGFjaW5nLFxuICAgICAgY29udGV4dDogdGhpcy50b29sdGlwQ29udGV4dFxuICAgIH07XG4gIH1cbn1cbiJdfQ==