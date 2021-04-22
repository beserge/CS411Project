import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Sidebar } from './sidebar.component';
export declare class SidebarContainer implements AfterContentInit, OnChanges, OnDestroy {
    private _ref;
    animate: boolean;
    allowSidebarBackdropControl: boolean;
    showBackdrop: boolean;
    showBackdropChange: EventEmitter<boolean>;
    onBackdropClicked: EventEmitter<null>;
    contentClass: string;
    backdropClass: string;
    private _sidebars;
    private _isBrowser;
    constructor(_ref: ChangeDetectorRef, platformId: Object);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    _addSidebar(sidebar: Sidebar): void;
    _removeSidebar(sidebar: Sidebar): void;
    _getContentStyle(): CSSStyleDeclaration;
    _onBackdropClicked(): void;
    private _subscribe;
    private _unsubscribe;
    private _onToggle;
    private _markForCheck;
}
