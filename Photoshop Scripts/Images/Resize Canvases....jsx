/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

// Increase canvas size and create new guide layout separating content
// and bleed area.

#target Photoshop
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Canvases')
var widthEdit, heightEdit, anchorGroup

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Canvas', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips("Canvases' new width")
            group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
            widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2), function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips("Canvases' new height")
            group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
            heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2), VALIDATE_UNITS)
        })
    })
    topGroup.vpanel('Anchor', function(panel) {
        anchorGroup = new AnchorGroup(panel, true)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = new UnitValue(widthEdit.text)
    var height = new UnitValue(heightEdit.text)
    var anchor = anchorGroup.getAnchorPosition()
    for (var i = 0; i < app.documents.length; i++) {
        var document = app.documents[i]
        app.activeDocument = document
        document.resizeCanvas(width, height, anchor)
    }
})
dialog.show()