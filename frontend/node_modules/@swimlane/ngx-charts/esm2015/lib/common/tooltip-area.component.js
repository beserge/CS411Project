import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';
import { isPlatformBrowser } from '@angular/common';
export class TooltipArea {
    constructor(platformId) {
        this.platformId = platformId;
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    getValues(xVal) {
        const results = [];
        for (const group of this.results) {
            const item = group.series.find(d => d.name.toString() === xVal.toString());
            let groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                const label = item.name;
                let val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                let color;
                if (this.colors.scaleType === 'linear') {
                    let v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                const data = Object.assign({}, item, {
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color
                });
                results.push(data);
            }
        }
        return results;
    }
    mouseMove(event) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const xPos = event.pageX - event.target.getBoundingClientRect().left;
        const closestIndex = this.findClosestPointIndex(xPos);
        const closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            const ev = createMouseEvent('mouseleave');
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    }
    findClosestPointIndex(xPos) {
        let minIndex = 0;
        let maxIndex = this.xSet.length - 1;
        let minDiff = Number.MAX_VALUE;
        let closestIndex = 0;
        while (minIndex <= maxIndex) {
            const currentIndex = ((minIndex + maxIndex) / 2) | 0;
            const currentElement = this.xScale(this.xSet[currentIndex]);
            const curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    }
    showTooltip() {
        const event = createMouseEvent('mouseenter');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    }
    hideTooltip() {
        const event = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    }
    getToolTipText(tooltipItem) {
        let result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    }
}
TooltipArea.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-tooltip-area]',
                template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'right'"
        [tooltipType]="'tooltip'"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('animationState', [
                        transition('inactive => active', [
                            style({
                                opacity: 0
                            }),
                            animate(250, style({ opacity: 0.7 }))
                        ]),
                        transition('active => inactive', [
                            style({
                                opacity: 0.7
                            }),
                            animate(250, style({ opacity: 0 }))
                        ])
                    ])
                ]
            },] }
];
TooltipArea.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
TooltipArea.propDecorators = {
    dims: [{ type: Input }],
    xSet: [{ type: Input }],
    xScale: [{ type: Input }],
    yScale: [{ type: Input }],
    results: [{ type: Input }],
    colors: [{ type: Input }],
    showPercentage: [{ type: Input }],
    tooltipDisabled: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    hover: [{ type: Output }],
    tooltipAnchor: [{ type: ViewChild, args: ['tooltipAnchor', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCx1QkFBdUIsRUFFdkIsV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBK0RwRCxNQUFNLE9BQU8sV0FBVztJQW9CdEIsWUFBeUMsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7UUFuQnhELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2QixpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQVNoQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdoQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUlzQixDQUFDO0lBRTVELFNBQVMsQ0FBQyxJQUFJO1FBQ1osTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRW5CLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFB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QkFDSDthQUNGOzs7NENBcUJjLE1BQU0sU0FBQyxXQUFXOzs7bUJBZDlCLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO29CQUVMLE1BQU07NEJBRU4sU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWYsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgY3JlYXRlTW91c2VFdmVudCB9IGZyb20gJy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy10b29sdGlwLWFyZWFdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmc+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwLWFyZWFcIlxuICAgICAgICBbYXR0ci54XT1cIjBcIlxuICAgICAgICB5PVwiMFwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBzdHlsZT1cIm9wYWNpdHk6IDA7IGN1cnNvcjogJ2F1dG8nO1wiXG4gICAgICAgIChtb3VzZW1vdmUpPVwibW91c2VNb3ZlKCRldmVudClcIlxuICAgICAgICAobW91c2VsZWF2ZSk9XCJoaWRlVG9vbHRpcCgpXCJcbiAgICAgIC8+XG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUb29sdGlwVGVtcGxhdGUgbGV0LW1vZGVsPVwibW9kZWxcIj5cbiAgICAgICAgPHhodG1sOmRpdiBjbGFzcz1cImFyZWEtdG9vbHRpcC1jb250YWluZXJcIj5cbiAgICAgICAgICA8eGh0bWw6ZGl2ICpuZ0Zvcj1cImxldCB0b29sdGlwSXRlbSBvZiBtb2RlbFwiIGNsYXNzPVwidG9vbHRpcC1pdGVtXCI+XG4gICAgICAgICAgICA8eGh0bWw6c3BhbiBjbGFzcz1cInRvb2x0aXAtaXRlbS1jb2xvclwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInRvb2x0aXBJdGVtLmNvbG9yXCI+PC94aHRtbDpzcGFuPlxuICAgICAgICAgICAge3sgZ2V0VG9vbFRpcFRleHQodG9vbHRpcEl0ZW0pIH19XG4gICAgICAgICAgPC94aHRtbDpkaXY+XG4gICAgICAgIDwveGh0bWw6ZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxzdmc6cmVjdFxuICAgICAgICAjdG9vbHRpcEFuY2hvclxuICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cImFuY2hvck9wYWNpdHkgIT09IDAgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSdcIlxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYW5jaG9yXCJcbiAgICAgICAgW2F0dHIueF09XCJhbmNob3JQb3NcIlxuICAgICAgICB5PVwiMFwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cIjFcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJhbmNob3JPcGFjaXR5XCJcbiAgICAgICAgW3N0eWxlLnBvaW50ZXItZXZlbnRzXT1cIidub25lJ1wiXG4gICAgICAgIG5neC10b29sdGlwXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwiJ3JpZ2h0J1wiXG4gICAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxuICAgICAgICBbdG9vbHRpcFNwYWNpbmddPVwiMTVcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHRvb2x0aXBUZW1wbGF0ZSA6IGRlZmF1bHRUb29sdGlwVGVtcGxhdGVcIlxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiYW5jaG9yVmFsdWVzXCJcbiAgICAgICAgW3Rvb2x0aXBJbW1lZGlhdGVFeGl0XT1cInRydWVcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMC43IH0pKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gaW5hY3RpdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLjdcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcEFyZWEge1xuICBhbmNob3JPcGFjaXR5OiBudW1iZXIgPSAwO1xuICBhbmNob3JQb3M6IG51bWJlciA9IC0xO1xuICBhbmNob3JWYWx1ZXM6IGFueVtdID0gW107XG4gIGxhc3RBbmNob3JQb3M6IG51bWJlcjtcblxuICBASW5wdXQoKSBkaW1zO1xuICBASW5wdXQoKSB4U2V0O1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgcmVzdWx0cztcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBzaG93UGVyY2VudGFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCd0b29sdGlwQW5jaG9yJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRvb2x0aXBBbmNob3I7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgZ2V0VmFsdWVzKHhWYWwpOiBhbnlbXSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBncm91cC5zZXJpZXMuZmluZChkID0+IGQubmFtZS50b1N0cmluZygpID09PSB4VmFsLnRvU3RyaW5nKCkpO1xuICAgICAgbGV0IGdyb3VwTmFtZSA9IGdyb3VwLm5hbWU7XG4gICAgICBpZiAoZ3JvdXBOYW1lIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBncm91cE5hbWUgPSBncm91cE5hbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gaXRlbS5uYW1lO1xuICAgICAgICBsZXQgdmFsID0gaXRlbS52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1BlcmNlbnRhZ2UpIHtcbiAgICAgICAgICB2YWwgPSAoaXRlbS5kMSAtIGl0ZW0uZDApLnRvRml4ZWQoMikgKyAnJSc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbG9yO1xuICAgICAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgICAgIGxldCB2ID0gdmFsO1xuICAgICAgICAgIGlmIChpdGVtLmQxKSB7XG4gICAgICAgICAgICB2ID0gaXRlbS5kMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGdyb3VwLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHtcbiAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgIG5hbWU6IGxhYmVsLFxuICAgICAgICAgIHNlcmllczogZ3JvdXBOYW1lLFxuICAgICAgICAgIG1pbjogaXRlbS5taW4sXG4gICAgICAgICAgbWF4OiBpdGVtLm1heCxcbiAgICAgICAgICBjb2xvclxuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHRzLnB1c2goZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBtb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB4UG9zID0gZXZlbnQucGFnZVggLSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblxuICAgIGNvbnN0IGNsb3Nlc3RJbmRleCA9IHRoaXMuZmluZENsb3Nlc3RQb2ludEluZGV4KHhQb3MpO1xuICAgIGNvbnN0IGNsb3Nlc3RQb2ludCA9IHRoaXMueFNldFtjbG9zZXN0SW5kZXhdO1xuICAgIHRoaXMuYW5jaG9yUG9zID0gdGhpcy54U2NhbGUoY2xvc2VzdFBvaW50KTtcbiAgICB0aGlzLmFuY2hvclBvcyA9IE1hdGgubWF4KDAsIHRoaXMuYW5jaG9yUG9zKTtcbiAgICB0aGlzLmFuY2hvclBvcyA9IE1hdGgubWluKHRoaXMuZGltcy53aWR0aCwgdGhpcy5hbmNob3JQb3MpO1xuXG4gICAgdGhpcy5hbmNob3JWYWx1ZXMgPSB0aGlzLmdldFZhbHVlcyhjbG9zZXN0UG9pbnQpO1xuICAgIGlmICh0aGlzLmFuY2hvclBvcyAhPT0gdGhpcy5sYXN0QW5jaG9yUG9zKSB7XG4gICAgICBjb25zdCBldiA9IGNyZWF0ZU1vdXNlRXZlbnQoJ21vdXNlbGVhdmUnKTtcbiAgICAgIHRoaXMudG9vbHRpcEFuY2hvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgdGhpcy5hbmNob3JPcGFjaXR5ID0gMC43O1xuICAgICAgdGhpcy5ob3Zlci5lbWl0KHtcbiAgICAgICAgdmFsdWU6IGNsb3Nlc3RQb2ludFxuICAgICAgfSk7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKCk7XG5cbiAgICAgIHRoaXMubGFzdEFuY2hvclBvcyA9IHRoaXMuYW5jaG9yUG9zO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRDbG9zZXN0UG9pbnRJbmRleCh4UG9zKSB7XG4gICAgbGV0IG1pbkluZGV4ID0gMDtcbiAgICBsZXQgbWF4SW5kZXggPSB0aGlzLnhTZXQubGVuZ3RoIC0gMTtcbiAgICBsZXQgbWluRGlmZiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgbGV0IGNsb3Nlc3RJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9ICgobWluSW5kZXggKyBtYXhJbmRleCkgLyAyKSB8IDA7XG4gICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IHRoaXMueFNjYWxlKHRoaXMueFNldFtjdXJyZW50SW5kZXhdKTtcblxuICAgICAgY29uc3QgY3VyRGlmZiA9IE1hdGguYWJzKGN1cnJlbnRFbGVtZW50IC0geFBvcyk7XG5cbiAgICAgIGlmIChjdXJEaWZmIDwgbWluRGlmZikge1xuICAgICAgICBtaW5EaWZmID0gY3VyRGlmZjtcbiAgICAgICAgY2xvc2VzdEluZGV4ID0gY3VycmVudEluZGV4O1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQgPCB4UG9zKSB7XG4gICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQgPiB4UG9zKSB7XG4gICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pbkRpZmYgPSAwO1xuICAgICAgICBjbG9zZXN0SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbG9zZXN0SW5kZXg7XG4gIH1cblxuICBzaG93VG9vbHRpcCgpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudCA9IGNyZWF0ZU1vdXNlRXZlbnQoJ21vdXNlZW50ZXInKTtcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGhpZGVUb29sdGlwKCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlTW91c2VFdmVudCgnbW91c2VsZWF2ZScpO1xuICAgIHRoaXMudG9vbHRpcEFuY2hvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDA7XG4gICAgdGhpcy5sYXN0QW5jaG9yUG9zID0gLTE7XG4gIH1cblxuICBnZXRUb29sVGlwVGV4dCh0b29sdGlwSXRlbTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnJztcbiAgICBpZiAodG9vbHRpcEl0ZW0uc2VyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS5zZXJpZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSAnPz8/JztcbiAgICB9XG4gICAgcmVzdWx0ICs9ICc6ICc7XG4gICAgaWYgKHRvb2x0aXBJdGVtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS52YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICAgIH1cbiAgICBpZiAodG9vbHRpcEl0ZW0ubWluICE9PSB1bmRlZmluZWQgfHwgdG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSAnICgnO1xuICAgICAgaWYgKHRvb2x0aXBJdGVtLm1pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdCArPSAn4omlJztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0ubWluLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdCArPSAnIC0gJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gJ+KJpCc7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLm1heC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9ICcpJztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19