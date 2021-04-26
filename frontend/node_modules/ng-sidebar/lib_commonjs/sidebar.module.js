"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sidebar_container_component_1 = require("./sidebar-container.component");
var sidebar_component_1 = require("./sidebar.component");
var close_directive_1 = require("./close.directive");
var SidebarModule = (function () {
    function SidebarModule() {
    }
    SidebarModule_1 = SidebarModule;
    SidebarModule.forRoot = function () {
        return {
            ngModule: SidebarModule_1
        };
    };
    var SidebarModule_1;
    SidebarModule = SidebarModule_1 = __decorate([
        core_1.NgModule({
            declarations: [sidebar_container_component_1.SidebarContainer, sidebar_component_1.Sidebar, close_directive_1.CloseSidebar],
            imports: [common_1.CommonModule],
            exports: [sidebar_container_component_1.SidebarContainer, sidebar_component_1.Sidebar, close_directive_1.CloseSidebar]
        })
    ], SidebarModule);
    return SidebarModule;
}());
exports.SidebarModule = SidebarModule;
