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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidebar_component_1 = require("./sidebar.component");
var CloseSidebar = (function () {
    function CloseSidebar(_sidebar) {
        this._sidebar = _sidebar;
    }
    CloseSidebar.prototype._onClick = function () {
        if (this._sidebar) {
            this._sidebar.close();
        }
    };
    CloseSidebar = __decorate([
        core_1.Directive({
            selector: '[closeSidebar]',
            host: {
                '(click)': '_onClick()'
            }
        }),
        __metadata("design:paramtypes", [sidebar_component_1.Sidebar])
    ], CloseSidebar);
    return CloseSidebar;
}());
exports.CloseSidebar = CloseSidebar;
