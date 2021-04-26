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
var sidebar_container_component_1 = require("./sidebar-container.component");
var utils_1 = require("./utils");
var Sidebar = (function () {
    function Sidebar(_container, _ref, platformId) {
        this._container = _container;
        this._ref = _ref;
        this.opened = false;
        this.openedChange = new core_1.EventEmitter();
        this.mode = 'over';
        this.dock = false;
        this.dockedSize = '0px';
        this.position = 'start';
        this.animate = true;
        this.autoCollapseOnInit = true;
        this.trapFocus = false;
        this.autoFocus = true;
        this.showBackdrop = false;
        this.closeOnClickBackdrop = false;
        this.closeOnClickOutside = false;
        this.keyClose = false;
        this.keyCode = 27;
        this.onContentInit = new core_1.EventEmitter();
        this.onOpenStart = new core_1.EventEmitter();
        this.onOpened = new core_1.EventEmitter();
        this.onCloseStart = new core_1.EventEmitter();
        this.onClosed = new core_1.EventEmitter();
        this.onTransitionEnd = new core_1.EventEmitter();
        this.onModeChange = new core_1.EventEmitter();
        this.onPositionChange = new core_1.EventEmitter();
        this._onRerender = new core_1.EventEmitter();
        this._focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]),' +
            'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
        this._tabIndexAttr = '__tabindex__';
        this._tabIndexIndicatorAttr = '__ngsidebar-tabindex__';
        this._clickEvent = 'click';
        this._onClickOutsideAttached = false;
        this._onKeyDownAttached = false;
        this._onResizeAttached = false;
        if (!this._container) {
            throw new Error('<ng-sidebar> must be inside a <ng-sidebar-container>. ' +
                'See https://github.com/arkon/ng-sidebar#usage for more info.');
        }
        this._isBrowser = common_1.isPlatformBrowser(platformId);
        if (this._isBrowser && utils_1.isIOS() && !('onclick' in window)) {
            this._clickEvent = 'touchstart';
        }
        this._normalizePosition();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._onTransitionEnd = this._onTransitionEnd.bind(this);
        this._onFocusTrap = this._onFocusTrap.bind(this);
        this._onClickOutside = this._onClickOutside.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._collapse = this._collapse.bind(this);
    }
    Sidebar.prototype.ngOnInit = function () {
        if (!this._isBrowser) {
            return;
        }
        if (this.animate) {
            this._shouldAnimate = true;
            this.animate = false;
        }
        this._container._addSidebar(this);
        if (this.autoCollapseOnInit) {
            this._collapse();
        }
    };
    Sidebar.prototype.ngAfterContentInit = function () {
        this.onContentInit.emit();
    };
    Sidebar.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this._isBrowser) {
            return;
        }
        if (changes['animate'] && this._shouldAnimate) {
            this._shouldAnimate = changes['animate'].currentValue;
        }
        if (changes['closeOnClickOutside']) {
            if (changes['closeOnClickOutside'].currentValue) {
                this._initCloseClickListener();
            }
            else {
                this._destroyCloseClickListener();
            }
        }
        if (changes['keyClose']) {
            if (changes['keyClose'].currentValue) {
                this._initCloseKeyDownListener();
            }
            else {
                this._destroyCloseKeyDownListener();
            }
        }
        if (changes['position']) {
            this._normalizePosition();
            setTimeout(function () {
                _this.onPositionChange.emit(changes['position'].currentValue);
            });
        }
        if (changes['mode']) {
            setTimeout(function () {
                _this.onModeChange.emit(changes['mode'].currentValue);
            });
        }
        if (changes['dock']) {
            this.triggerRerender();
        }
        if (changes['opened']) {
            if (this._shouldAnimate) {
                this.animate = true;
                this._shouldAnimate = false;
            }
            if (changes['opened'].currentValue) {
                this.open();
            }
            else {
                this.close();
            }
        }
        if (changes['autoCollapseHeight'] || changes['autoCollapseWidth']) {
            this._initCollapseListeners();
        }
    };
    Sidebar.prototype.ngOnDestroy = function () {
        if (!this._isBrowser) {
            return;
        }
        this._destroyCloseListeners();
        this._destroyCollapseListeners();
        this._container._removeSidebar(this);
    };
    Sidebar.prototype.open = function () {
        var _this = this;
        if (!this._isBrowser) {
            return;
        }
        this.opened = true;
        this.openedChange.emit(true);
        this.onOpenStart.emit();
        this._ref.detectChanges();
        setTimeout(function () {
            if (_this.animate && !_this._isModeSlide) {
                _this._elSidebar.nativeElement.addEventListener('transitionend', _this._onTransitionEnd);
            }
            else {
                _this._setFocused();
                _this._initCloseListeners();
                if (_this.opened) {
                    _this.onOpened.emit();
                }
            }
        });
    };
    Sidebar.prototype.close = function () {
        var _this = this;
        if (!this._isBrowser) {
            return;
        }
        this.opened = false;
        this.openedChange.emit(false);
        this.onCloseStart.emit();
        this._ref.detectChanges();
        setTimeout(function () {
            if (_this.animate && !_this._isModeSlide) {
                _this._elSidebar.nativeElement.addEventListener('transitionend', _this._onTransitionEnd);
            }
            else {
                _this._setFocused();
                _this._destroyCloseListeners();
                if (!_this.opened) {
                    _this.onClosed.emit();
                }
            }
        });
    };
    Sidebar.prototype.triggerRerender = function () {
        var _this = this;
        if (!this._isBrowser) {
            return;
        }
        setTimeout(function () {
            _this._onRerender.emit();
        });
    };
    Sidebar.prototype._getStyle = function () {
        var transformStyle = '';
        if (!this.opened) {
            var transformDir = 'translate' + (this._isLeftOrRight ? 'X' : 'Y');
            var translateAmt = (this._isLeftOrTop ? '-' : '') + "100%";
            transformStyle = transformDir + "(" + translateAmt + ")";
            if (this.dock && this._dockedSize > 0 && !(this._isModeSlide && this.opened)) {
                transformStyle += " " + transformDir + "(" + (this._isLeftOrTop ? '+' : '-') + this.dockedSize + ")";
            }
        }
        return {
            webkitTransform: transformStyle,
            transform: transformStyle
        };
    };
    Sidebar.prototype._onTransitionEnd = function (e) {
        if (e.target === this._elSidebar.nativeElement && e.propertyName.endsWith('transform')) {
            this._setFocused();
            if (this.opened) {
                this._initCloseListeners();
                this.onOpened.emit();
            }
            else {
                this._destroyCloseListeners();
                this.onClosed.emit();
            }
            this.onTransitionEnd.emit();
            this._elSidebar.nativeElement.removeEventListener('transitionend', this._onTransitionEnd);
        }
    };
    Object.defineProperty(Sidebar.prototype, "_shouldTrapFocus", {
        get: function () {
            return this.opened && this.trapFocus;
        },
        enumerable: true,
        configurable: true
    });
    Sidebar.prototype._focusFirstItem = function () {
        if (this._focusableElements && this._focusableElements.length > 0) {
            this._focusableElements[0].focus();
        }
    };
    Sidebar.prototype._onFocusTrap = function (e) {
        if (this._shouldTrapFocus && !this._elSidebar.nativeElement.contains(e.target)) {
            this._focusFirstItem();
        }
    };
    Sidebar.prototype._setFocused = function () {
        this._focusableElements = Array.from(this._elSidebar.nativeElement.querySelectorAll(this._focusableElementsString));
        if (this.opened) {
            this._focusedBeforeOpen = document.activeElement;
            for (var _i = 0, _a = this._focusableElements; _i < _a.length; _i++) {
                var el = _a[_i];
                var prevTabIndex = el.getAttribute(this._tabIndexAttr);
                var wasTabIndexSet = el.getAttribute(this._tabIndexIndicatorAttr) !== null;
                if (prevTabIndex !== null) {
                    el.setAttribute('tabindex', prevTabIndex);
                    el.removeAttribute(this._tabIndexAttr);
                }
                else if (wasTabIndexSet) {
                    el.removeAttribute('tabindex');
                    el.removeAttribute(this._tabIndexIndicatorAttr);
                }
            }
            if (this.autoFocus) {
                this._focusFirstItem();
            }
            document.addEventListener('focus', this._onFocusTrap, true);
        }
        else {
            for (var _b = 0, _c = this._focusableElements; _b < _c.length; _b++) {
                var el = _c[_b];
                var existingTabIndex = el.getAttribute('tabindex');
                el.setAttribute('tabindex', '-1');
                el.setAttribute(this._tabIndexIndicatorAttr, '');
                if (existingTabIndex !== null) {
                    el.setAttribute(this._tabIndexAttr, existingTabIndex);
                }
            }
            document.removeEventListener('focus', this._onFocusTrap, true);
            if (this._focusedBeforeOpen && this.autoFocus && this._isModeOver) {
                this._focusedBeforeOpen.focus();
                this._focusedBeforeOpen = null;
            }
        }
    };
    Sidebar.prototype._initCloseListeners = function () {
        this._initCloseClickListener();
        this._initCloseKeyDownListener();
    };
    Sidebar.prototype._initCloseClickListener = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.opened && _this.closeOnClickOutside && !_this._onClickOutsideAttached) {
                document.addEventListener(_this._clickEvent, _this._onClickOutside);
                _this._onClickOutsideAttached = true;
            }
        });
    };
    Sidebar.prototype._initCloseKeyDownListener = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.opened && _this.keyClose && !_this._onKeyDownAttached) {
                document.addEventListener('keydown', _this._onKeyDown);
                _this._onKeyDownAttached = true;
            }
        });
    };
    Sidebar.prototype._destroyCloseListeners = function () {
        this._destroyCloseClickListener();
        this._destroyCloseKeyDownListener();
    };
    Sidebar.prototype._destroyCloseClickListener = function () {
        if (this._onClickOutsideAttached) {
            document.removeEventListener(this._clickEvent, this._onClickOutside);
            this._onClickOutsideAttached = false;
        }
    };
    Sidebar.prototype._destroyCloseKeyDownListener = function () {
        if (this._onKeyDownAttached) {
            document.removeEventListener('keydown', this._onKeyDown);
            this._onKeyDownAttached = false;
        }
    };
    Sidebar.prototype._onClickOutside = function (e) {
        if (this._onClickOutsideAttached && this._elSidebar && !this._elSidebar.nativeElement.contains(e.target)) {
            this.close();
        }
    };
    Sidebar.prototype._onKeyDown = function (e) {
        e = e || window.event;
        if (e.keyCode === this.keyCode) {
            this.close();
        }
    };
    Sidebar.prototype._initCollapseListeners = function () {
        var _this = this;
        if (this.autoCollapseHeight || this.autoCollapseWidth) {
            setTimeout(function () {
                if (!_this._onResizeAttached) {
                    window.addEventListener('resize', _this._collapse);
                    _this._onResizeAttached = true;
                }
            });
        }
    };
    Sidebar.prototype._destroyCollapseListeners = function () {
        if (this._onResizeAttached) {
            window.removeEventListener('resize', this._collapse);
            this._onResizeAttached = false;
        }
    };
    Sidebar.prototype._collapse = function () {
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        if (this.autoCollapseHeight) {
            if (winHeight <= this.autoCollapseHeight && this.opened) {
                this._wasCollapsed = true;
                this.close();
            }
            else if (winHeight > this.autoCollapseHeight && this._wasCollapsed) {
                this.open();
                this._wasCollapsed = false;
            }
        }
        if (this.autoCollapseWidth) {
            if (winWidth <= this.autoCollapseWidth && this.opened) {
                this._wasCollapsed = true;
                this.close();
            }
            else if (winWidth > this.autoCollapseWidth && this._wasCollapsed) {
                this.open();
                this._wasCollapsed = false;
            }
        }
    };
    Object.defineProperty(Sidebar.prototype, "_height", {
        get: function () {
            if (this._elSidebar.nativeElement) {
                return this._isDocked ? this._dockedSize : this._elSidebar.nativeElement.offsetHeight;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_width", {
        get: function () {
            if (this._elSidebar.nativeElement) {
                return this._isDocked ? this._dockedSize : this._elSidebar.nativeElement.offsetWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_dockedSize", {
        get: function () {
            return parseFloat(this.dockedSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isModeOver", {
        get: function () {
            return this.mode === 'over';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isModePush", {
        get: function () {
            return this.mode === 'push';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isModeSlide", {
        get: function () {
            return this.mode === 'slide';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isDocked", {
        get: function () {
            return this.dock && this.dockedSize && !this.opened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isLeftOrTop", {
        get: function () {
            return this.position === 'left' || this.position === 'top';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isLeftOrRight", {
        get: function () {
            return this.position === 'left' || this.position === 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "_isInert", {
        get: function () {
            return !this.opened && !this.dock;
        },
        enumerable: true,
        configurable: true
    });
    Sidebar.prototype._normalizePosition = function () {
        var ltr = utils_1.isLTR();
        if (this.position === 'start') {
            this.position = ltr ? 'left' : 'right';
        }
        else if (this.position === 'end') {
            this.position = ltr ? 'right' : 'left';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "opened", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "openedChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Sidebar.prototype, "mode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "dock", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Sidebar.prototype, "dockedSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Sidebar.prototype, "position", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "animate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Sidebar.prototype, "autoCollapseHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Sidebar.prototype, "autoCollapseWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "autoCollapseOnInit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Sidebar.prototype, "sidebarClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Sidebar.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "trapFocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "showBackdrop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "closeOnClickBackdrop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "closeOnClickOutside", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Sidebar.prototype, "keyClose", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Sidebar.prototype, "keyCode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onContentInit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onOpenStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onOpened", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onCloseStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onClosed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onTransitionEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onModeChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "onPositionChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidebar.prototype, "_onRerender", void 0);
    __decorate([
        core_1.ViewChild('sidebar', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], Sidebar.prototype, "_elSidebar", void 0);
    Sidebar = __decorate([
        core_1.Component({
            selector: 'ng-sidebar',
            template: "\n    <aside #sidebar\n      role=\"complementary\"\n      [attr.aria-hidden]=\"!opened\"\n      [attr.aria-label]=\"ariaLabel\"\n      class=\"ng-sidebar ng-sidebar--{{opened ? 'opened' : 'closed'}} ng-sidebar--{{position}} ng-sidebar--{{mode}}\"\n      [class.ng-sidebar--docked]=\"_isDocked\"\n      [class.ng-sidebar--inert]=\"_isInert\"\n      [class.ng-sidebar--animate]=\"animate\"\n      [ngClass]=\"sidebarClass\"\n      [ngStyle]=\"_getStyle()\">\n      <ng-content></ng-content>\n    </aside>\n  ",
            styles: ["\n    .ng-sidebar {\n      -webkit-overflow-scrolling: touch;\n      overflow: auto;\n      pointer-events: auto;\n      position: absolute;\n      touch-action: auto;\n      will-change: initial;\n      z-index: 2;\n    }\n\n    .ng-sidebar--left {\n      bottom: 0;\n      left: 0;\n      top: 0;\n    }\n\n    .ng-sidebar--right {\n      bottom: 0;\n      right: 0;\n      top: 0;\n    }\n\n    .ng-sidebar--top {\n      left: 0;\n      right: 0;\n      top: 0;\n    }\n\n    .ng-sidebar--bottom {\n      bottom: 0;\n      left: 0;\n      right: 0;\n    }\n\n    .ng-sidebar--inert {\n      pointer-events: none;\n      touch-action: none;\n      will-change: transform;\n    }\n\n    .ng-sidebar--animate {\n      -webkit-transition: -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n      transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n    }\n  "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Optional()),
        __param(2, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [sidebar_container_component_1.SidebarContainer,
            core_1.ChangeDetectorRef,
            Object])
    ], Sidebar);
    return Sidebar;
}());
exports.Sidebar = Sidebar;
