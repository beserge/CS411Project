import { OnChanges, SimpleChanges } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class PieLabelComponent implements OnChanges {
    platformId: any;
    data: any;
    radius: any;
    label: any;
    color: any;
    max: any;
    value: any;
    explodeSlices: any;
    animations: boolean;
    labelTrim: boolean;
    labelTrimSize: number;
    trimLabel: (label: string, max?: number) => string;
    line: string;
    styleTransform: string;
    attrTransform: string;
    textTransition: string;
    constructor(platformId: any);
    ngOnChanges(changes: SimpleChanges): void;
    setTransforms(): void;
    update(): void;
    get textX(): number;
    get textY(): number;
    textAnchor(): any;
    midAngle(d: any): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PieLabelComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PieLabelComponent, "g[ngx-charts-pie-label]", never, { "animations": "animations"; "labelTrim": "labelTrim"; "labelTrimSize": "labelTrimSize"; "data": "data"; "radius": "radius"; "label": "label"; "color": "color"; "max": "max"; "value": "value"; "explodeSlices": "explodeSlices"; }, {}, never, never>;
}

//# sourceMappingURL=pie-label.component.d.ts.map