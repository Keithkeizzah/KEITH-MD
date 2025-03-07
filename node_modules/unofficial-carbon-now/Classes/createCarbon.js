let fetch = require("node-fetch")


class createCarbon {

    constructor() {
    }
    setCode(code) {
        this.code = code
        return this

    }
    setBackgroundColor(backgroundColor) {
        this.backgroundColor = backgroundColor
        return this
    }
    setShadow(dropShadow, dropShadowBlurRadius, dropShadowOffsetY) {
        this.dropShadow = dropShadow
        this.dropShadowBlurRadius = dropShadowBlurRadius
        this.dropShadowOffsetY = dropShadowOffsetY
        return this
    }
    setExportSize(exportSize) {
        this.exportSize = exportSize
        return this
    }
    setFont(fontFamily, fontSize) {

        this.fontFamily = fontFamily
        this.fontSize = fontSize
        return this
    }
    setLanguage(language) {
        this.language = language
        return this
    }
    setLine(lineHeight, firstLineNumber, lineNumbers) {
        this.lineHeight = lineHeight
        this.firstLineNumber = firstLineNumber
        this.lineNumbers = lineNumbers
        return this
    }
    setPadding(paddingHorizontal, paddingVertical) {
        this.paddingHorizontal = paddingHorizontal
        this.paddingVertical = paddingVertical
        return this
    }
    setPrettify(prettify) {
        this.prettify = prettify
        return this
    }
    setTheme(theme) {
        this.theme = theme
        return this
    }
    setWatermark(watermark) {
        this.watermark = watermark
        return this
    }
    setWidthAdjustment(widthAdjustment) {
        this.widthAdjustment = widthAdjustment
        return this
    }
    setWindow(windowControls, windowTheme) {
        this.windowControls = windowControls
        this.windowTheme = windowTheme
        return this
    }
}
module.exports = { createCarbon }