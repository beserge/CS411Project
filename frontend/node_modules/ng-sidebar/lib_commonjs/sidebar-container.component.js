"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var SidebarContainer = (function () {
    function SidebarContainer(_ref, platformId) {
        this._ref = _ref;
        this.animate = true;
        this.allowSidebarBackdropControl = true;
        this.showBackdrop = false;
        this.showBackdropChange = new core_1.EventEmitter();
        this.onBackdropClicked = new core_1.EventEmitter();
        this._sidebars = [];
        this._isBrowser = common_1.isPlatformBrowser(platformId);
    }
    SidebarContainer.prototype.ngAfterContentInit = function () {
        if (!this._isBrowser) {
            return;
        }
        this._onToggle();
    };
    SidebarContainer.prototype.ngOnChanges = function (changes) {
        if (!this._isBrowser) {
            return;
        }
        if (changes['showBackdrop']) {
            this.showBackdropChange.emit(changes['showBackdrop'].currentValue);
        }
    };
    SidebarContainer.prototype.ngOnDestroy = function () {
        if (!this._isBrowser) {
            return;
        }
        this._unsubscribe();
    };
    SidebarContainer.prototype._addSidebar = function (sidebar) {
        this._sidebars.push(sidebar);
        this._subscribe(sidebar);
    };
    SidebarContainer.prototype._removeSidebar = function (sidebar) {
        var index = this._sidebars.indexOf(sidebar);
        if (index !== -1) {
            this._sidebars.splice(index, 1);
        }
    };
    SidebarContainer.prototype._getContentStyle = function () {
        var left = 0, right = 0, top = 0, bottom = 0;
        var transformStyle = '';
        var heightStyle = '';
        var widthStyle = '';
        for (var _i = 0, _a = this._sidebars; _i < _a.length; _i++) {
            var sidebar = _a[_i];
            if (sidebar._isModeSlide) {
                if (sidebar.opened) {
                    var transformDir = sidebar._isLeftOrRight ? 'X' : 'Y';
                    var transformAmt = "" + (sidebar._isLeftOrTop ? '' : '-') + (sidebar._isLeftOrRight ? sidebar._width : sidebar._height);
                    transformStyle = "translate" + transformDir + "(" + transformAmt + "px)";
                }
            }
            if ((sidebar._isModePush && sidebar.opened) || sidebar.dock) {
                var paddingAmt = 0;
                if (sidebar._isModeSlide && sidebar.opened) {
                    if (sidebar._isLeftOrRight) {
                        widthStyle = '100%';
                    }
                    else {
                        heightStyle = '100%';
                    }
                }
                else {
                    if (sidebar._isDocked || (sidebar._isModeOver && sidebar.dock)) {
                        paddingAmt = sidebar._dockedSize;
                    }
                    else {
                        paddingAmt = sidebar._isLeftOrRight ? sidebar._width : sidebar._height;
                    }
                }
                switch (sidebar.position) {
                    case 'left':
                        left = Math.max(left, paddingAmt);
                        break;
                    case 'right':
                        right = Math.max(right, paddingAmt);
                        break;
                    case 'top':
                        top = Math.max(top, paddingAmt);
                        break;
                    case 'bottom':
                        bottom = Math.max(bottom, paddingAmt);
                        break;
                }
            }
        }
        return {
            padding: top + "px " + right + "px " + bottom + "px " + left + "px",
            webkitTransform: transformStyle,
            transform: transformStyle,
            height: heightStyle,
            width: widthStyle
        };
    };
    SidebarContainer.prototype._onBackdropClicked = function () {
        var backdropClicked = false;
        for (var _i = 0, _a = this._sidebars; _i < _a.length; _i++) {
            var sidebar = _a[_i];
            if (sidebar.opened && sidebar.showBackdrop && sidebar.closeOnClickBackdrop) {
                sidebar.close();
                backdropClicked = true;
            }
        }
        if (backdropClicked) {
            this.onBackdropClicked.emit();
        }
    };
    SidebarContainer.prototype._subscribe = function (sidebar) {
        var _this = this;
        sidebar.onOpenStart.subscribe(function () { return _this._onToggle(); });
        sidebar.onOpened.subscribe(function () { return _this._markForCheck(); });
        sidebar.onCloseStart.subscribe(function () { return _this._onToggle(); });
        sidebar.onClosed.subscribe(function () { return _this._markForCheck(); });
        sidebar.onModeChange.subscribe(function () { return _this._markForCheck(); });
        sidebar.onPositionChange.subscribe(function () { return _this._markForCheck(); });
        sidebar._onRerender.subscribe(function () { return _this._markForCheck(); });
    };
    SidebarContainer.prototype._unsubscribe = function () {
        for (var _i = 0, _a = this._sidebars; _i < _a.length; _i++) {
            var sidebar = _a[_i];
            sidebar.onOpenStart.unsubscribe();
            sidebar.onOpened.unsubscribe();
            sidebar.onCloseStart.unsubscribe();
            sidebar.onClosed.unsubscribe();
            sidebar.onModeChange.unsubscribe();
            sidebar.onPositionChange.unsubscribe();
            sidebar._onRerender.unsubscribe();
        }
    };
    SidebarContainer.prototype._onToggle = function () {
        var _this = this;
        if (this._sidebars.length > 0 && this.allowSidebarBackdropControl) {
            var hasOpen = this._sidebars.some(function (sidebar) { return sidebar.opened && sidebar.showBackdrop; });
            this.showBackdrop = hasOpen;
            this.showBackdropChange.emit(hasOpen);
        }
        setTimeout(function () {
            _this._markForCheck();
        });
    };
    SidebarContainer.prototype._markForCheck = function () {
        this._ref.markForCheck();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SidebarContainer.prototype, "animate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SidebarContainer.prototype, "allowSidebarBackdropControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SidebarContainer.prototype, "showBackdrop", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SidebarContainer.prototype, "showBackdropChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SidebarContainer.prototype, "onBackdropClicked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SidebarContainer.prototype, "contentClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SidebarContainer.prototype, "backdropClass", void 0);
    SidebarContainer = __decorate([
        core_1.Component({
            selector: 'ng-sidebar-container',
            template: "\n    <div *ngIf=\"showBackdrop\"\n      aria-hidden=\"true\"\n      class=\"ng-sidebar__backdrop\"\n      [ngClass]=\"backdropClass\"\n      (click)=\"_onBackdropClicked()\"></div>\n\n    <ng-content select=\"ng-sidebar,[ng-sidebar]\"></ng-content>\n\n    <div class=\"ng-sidebar__content\"\n      [class.ng-sidebar__content--animate]=\"animate\"\n      [ngClass]=\"contentClass\"\n      [ngStyle]=\"_getContentStyle()\">\n      <ng-content select=\"[ng-sidebar-content]\"></ng-content>\n    </div>\n  ",
            styles: ["\n    :host {\n      box-sizing: border-box;\n      display: block;\n      position: relative;\n      height: 100%;\n      width: 100%;\n      overflow: hidden;\n    }\n\n    .ng-sidebar__backdrop {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background: #000;\n      opacity: 0.75;\n      pointer-events: auto;\n      z-index: 1;\n    }\n\n    .ng-sidebar__content {\n      -webkit-overflow-scrolling: touch;\n      overflow: auto;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n    }\n\n    .ng-sidebar__content--animate {\n      -webkit-transition: -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1), padding 0.3s cubic-bezier(0, 0, 0.3, 1);\n      transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1), padding 0.3s cubic-bezier(0, 0, 0.3, 1);\n    }\n  "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(1, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            Object])
    ], SidebarContainer);
    return SidebarContainer;
}());
exports.SidebarContainer = SidebarContainer;
