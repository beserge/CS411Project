"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLTR() {
    var dir = 'ltr';
    if (typeof window !== 'undefined') {
        if (window.getComputedStyle) {
            dir = window.getComputedStyle(document.body, null).getPropertyValue('direction');
        }
        else {
            dir = document.body.currentStyle.direction;
        }
    }
    return dir === 'ltr';
}
exports.isLTR = isLTR;
function isIOS() {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    return false;
}
exports.isIOS = isIOS;
