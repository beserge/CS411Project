import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class ScaleLegendComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = `linear-gradient(to ${direction}, ${gradientValues})`;
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
}
ScaleLegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-scale-legend',
                template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{display:flex;flex-direction:column;text-align:center}.chart-legend .scale-legend-wrap{border-radius:5px;display:inline-block;flex:1;margin:0 auto;width:30px}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{height:30px;margin:0 16px;width:auto}"]
            },] }
];
ScaleLegendComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
ScaleLegendComponent.propDecorators = {
    valueRange: [{ type: Input }],
    colors: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    horizontal: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vbGVnZW5kL3NjYWxlLWxlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXdCekQsTUFBTSxPQUFPLG9CQUFvQjtJQVMvQixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSmxDLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFJa0IsQ0FBQztJQUUvQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLHNCQUFzQixTQUFTLEtBQUssY0FBYyxHQUFHLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU07UUFDM0IsZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7WUFyREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7Z0JBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBdkJRLFlBQVk7Ozt5QkF5QmxCLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1zY2FsZS1sZWdlbmQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwic2NhbGUtbGVnZW5kXCJcbiAgICAgIFtjbGFzcy5ob3Jpem9udGFsLWxlZ2VuZF09XCJob3Jpem9udGFsXCJcbiAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG9yaXpvbnRhbCA/IHVuZGVmaW5lZCA6IGhlaWdodFwiXG4gICAgICBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgPHNwYW4+e3sgdmFsdWVSYW5nZVsxXS50b0xvY2FsZVN0cmluZygpIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLXdyYXBcIiBbc3R5bGUuYmFja2dyb3VuZF09XCJncmFkaWVudFwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzBdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vc2NhbGUtbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNjYWxlTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgdmFsdWVSYW5nZTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHdpZHRoO1xuICBASW5wdXQoKSBob3Jpem9udGFsID0gZmFsc2U7XG5cbiAgZ3JhZGllbnQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBncmFkaWVudFZhbHVlcyA9IHRoaXMuZ3JhZGllbnRTdHJpbmcodGhpcy5jb2xvcnMucmFuZ2UoKSwgdGhpcy5jb2xvcnMuZG9tYWluKCkpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuaG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgICB0aGlzLmdyYWRpZW50ID0gYGxpbmVhci1ncmFkaWVudCh0byAke2RpcmVjdGlvbn0sICR7Z3JhZGllbnRWYWx1ZXN9KWA7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBzdHJpbmcgdXNlZCBpbiB0aGUgZ3JhZGllbnQgc3R5bGVzaGVldCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSBjb2xvcnMgYXJyYXkgb2YgY29sb3JzXG4gICAqIEBwYXJhbSBzcGxpdHMgYXJyYXkgb2Ygc3BsaXRzIG9uIGEgc2NhbGUgb2YgKDAsIDEpXG4gICAqL1xuICBncmFkaWVudFN0cmluZyhjb2xvcnMsIHNwbGl0cyk6IHN0cmluZyB7XG4gICAgLy8gYWRkIHRoZSAxMDAlXG4gICAgc3BsaXRzLnB1c2goMSk7XG4gICAgY29uc3QgcGFpcnMgPSBbXTtcbiAgICBjb2xvcnMucmV2ZXJzZSgpLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgIHBhaXJzLnB1c2goYCR7Y30gJHtNYXRoLnJvdW5kKHNwbGl0c1tpXSAqIDEwMCl9JWApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhaXJzLmpvaW4oJywgJyk7XG4gIH1cbn1cbiJdfQ==