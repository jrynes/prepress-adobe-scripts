﻿#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var SIZE_INPUT = [110, 21]
var SIZE_CHECK = [15, 15]

var dialog = new Dialog("Add Trim Marks", "add-trim-marks/")
var offsetEdit, lengthEdit, weightEdit, colorList
var topLeftCheck, topRightCheck, leftTopCheck, rightTopCheck, leftBottomCheck, rightBottomCheck, bottomLeftCheck, bottomRightCheck // single checks
var topCheck, rightCheck, bottomCheck, leftCheck // multiple checks
var multipleTargetMultiRadioCheckGroup
var config = configs.resolve("objects/add_trim_marks")

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Trim Marks", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Distance between art and trim marks")
        group.staticText(undefined, "Offset:").also(JUSTIFY_RIGHT)
        offsetEdit = group.editText(SIZE_INPUT, config.getString("offset", "2.5 mm")).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Size of trim marks")
        group.staticText(undefined, "Length:").also(JUSTIFY_RIGHT)
        lengthEdit = group.editText(SIZE_INPUT, config.getString("length", "2.5 mm")).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Thickness of trim marks")
        group.staticText(undefined, "Weight:").also(JUSTIFY_RIGHT)
        weightEdit = group.editText(SIZE_INPUT, config.getString("weight", "0.3 pt")).also(VALIDATE_UNITS) // the same value used in `Object > Create Trim Marks`
      })
      panel.hgroup(function(group) {
        group.tooltips("Color of trim marks")
        group.staticText(undefined, "Color:").also(JUSTIFY_RIGHT)
        colorList = group.dropDownList(SIZE_INPUT, COLORS).also(function(it) {
          it.selectText(config.getString("color", "Registration"))
        })
      })
    })
    topGroup.vpanel("Locations", function(panel) {
      panel.hgroup(function(group) {
        group.staticText(SIZE_CHECK)
        topLeftCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Top left")
        })
        topCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Top")
          it.visible = false
        })
        topRightCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Top right")
        })
        group.staticText(SIZE_CHECK)
      })
      panel.hgroup(function(group) {
        leftTopCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Left top")
        })
        group.image(SIZE_CHECK, "ic_arrow_topleft")
        group.image(SIZE_CHECK, "ic_arrow_top")
        group.image(SIZE_CHECK, "ic_arrow_topright")
        rightTopCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Right top")
        })
      })
      panel.hgroup(function(group) {
        leftCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Left")
          it.visible = false
        })
        group.image(SIZE_CHECK, "ic_arrow_left")
        group.image(SIZE_CHECK, "ic_arrow_center")
        group.image(SIZE_CHECK, "ic_arrow_right")
        rightCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Right")
          it.visible = false
        })
      })
      panel.hgroup(function(group) {
        leftBottomCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Left bottom")
        })
        group.image(SIZE_CHECK, "ic_arrow_bottomleft")
        group.image(SIZE_CHECK, "ic_arrow_bottom")
        group.image(SIZE_CHECK, "ic_arrow_bottomright")
        rightBottomCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Right bottom")
        })
      })
      panel.hgroup(function(group) {
        group.staticText(SIZE_CHECK)
        bottomLeftCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Bottom left")
        })
        bottomCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Bottom")
          it.visible = false
        })
        bottomRightCheck = group.checkBox(SIZE_CHECK).also(function(it) {
          it.select()
          it.tooltip("Bottom right")
        })
        group.staticText(SIZE_CHECK)
      })
    })
  })
  multipleTargetMultiRadioCheckGroup = new MultiRadioCheckGroup(main, "Multiple Target", ["Default", "Recursive"]).also(function(it) {
    it.main.tooltips("When activated, trim marks will be added to each item")
    it.checkOnClick = function() {
      topLeftCheck.visible = !it.isSelected()
      topRightCheck.visible = !it.isSelected()
      leftTopCheck.visible = !it.isSelected()
      rightTopCheck.visible = !it.isSelected()
      leftBottomCheck.visible = !it.isSelected()
      rightBottomCheck.visible = !it.isSelected()
      bottomLeftCheck.visible = !it.isSelected()
      bottomRightCheck.visible = !it.isSelected()
      leftCheck.visible = it.isSelected()
      topCheck.visible = it.isSelected()
      rightCheck.visible = it.isSelected()
      bottomCheck.visible = it.isSelected()
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var offset = parseUnits(offsetEdit.text)
  var length = parseUnits(lengthEdit.text)
  var weight = parseUnits(weightEdit.text)
  var color = parseColor(colorList.selection.text)
  var maxBounds = Items.getMaxBounds(selection)
  multipleTargetMultiRadioCheckGroup.isSelected()
    ? processMultiple(offset, length, weight, color, maxBounds)
    : processSingle(offset, length, weight, color, maxBounds)

  config.setString("offset", offsetEdit.text)
  config.setString("length", lengthEdit.text)
  config.setString("weight", weightEdit.text)
  config.setString("color", colorList.selection.text)
})
dialog.show()

function processSingle(offset, length, weight, color, maxBounds) {
  var paths = []
  if (topLeftCheck.value) {
    paths.push(createTrimMark(
      weight, color, "TOP",
      maxBounds.getLeft(),
      maxBounds.getTop() + offset,
      maxBounds.getLeft(),
      maxBounds.getTop() + offset + length
    ))
  }
  if (topRightCheck.value) {
    paths.push(createTrimMark(
      weight, color, "TOP",
      maxBounds.getRight(),
      maxBounds.getTop() + offset,
      maxBounds.getRight(),
      maxBounds.getTop() + offset + length
    ))
  }
  if (rightTopCheck.value) {
    paths.push(createTrimMark(
      weight, color, "RIGHT",
      maxBounds.getRight() + offset,
      maxBounds.getTop(),
      maxBounds.getRight() + offset + length,
      maxBounds.getTop()
    ))
  }
  if (rightBottomCheck.value) {
    paths.push(createTrimMark(
      weight, color, "RIGHT",
      maxBounds.getRight() + offset,
      maxBounds.getBottom(),
      maxBounds.getRight() + offset + length,
      maxBounds.getBottom()
    ))
  }
  if (bottomRightCheck.value) {
    paths.push(createTrimMark(
      weight, color, "BOTTOM",
      maxBounds.getRight(),
      maxBounds.getBottom() - offset,
      maxBounds.getRight(),
      maxBounds.getBottom() - offset - length
    ))
  }
  if (bottomLeftCheck.value) {
    paths.push(createTrimMark(
      weight, color, "BOTTOM",
      maxBounds.getLeft(),
      maxBounds.getBottom() - offset,
      maxBounds.getLeft(),
      maxBounds.getBottom() - offset - length
    ))
  }
  if (leftBottomCheck.value) {
    paths.push(createTrimMark(
      weight, color, "LEFT",
      maxBounds.getLeft() - offset,
      maxBounds.getBottom(),
      maxBounds.getLeft() - offset - length,
      maxBounds.getBottom()
    ))
  }
  if (leftTopCheck.value) {
    paths.push(createTrimMark(
      weight, color, "LEFT",
      maxBounds.getLeft() - offset,
      maxBounds.getTop(),
      maxBounds.getLeft() - offset - length,
      maxBounds.getTop()
    ))
  }
  return paths
}

function processMultiple(offset, length, weight, color, maxBounds) {
  var paths = []
  var action = function(item) {
    var clippingItem = Items.getClippingItem(item)
    var width = clippingItem.width
    var height = clippingItem.height
    var itemStartX = clippingItem.position.getLeft()
    var itemStartY = clippingItem.position.getTop()
    var itemEndX = itemStartX + width
    var itemEndY = itemStartY - height
    if (topCheck.value) {
      paths.push([
        "TOP",
        itemStartX,
        maxBounds.getTop() + offset,
        itemStartX,
        maxBounds.getTop() + offset + length
      ])
      paths.push([
        "TOP",
        itemEndX,
        maxBounds.getTop() + offset,
        itemEndX,
        maxBounds.getTop() + offset + length
      ])
    }
    if (rightCheck.value) {
      paths.push([
        "RIGHT",
        maxBounds.getRight() + offset,
        itemStartY,
        maxBounds.getRight() + offset + length,
        itemStartY
      ])
      paths.push([
        "RIGHT",
        maxBounds.getRight() + offset,
        itemEndY,
        maxBounds.getRight() + offset + length,
        itemEndY
      ])
    }
    if (bottomCheck.value) {
      paths.push([
        "BOTTOM",
        itemEndX,
        maxBounds.getBottom() - offset,
        itemEndX,
        maxBounds.getBottom() - offset - length
      ])
      paths.push([
        "BOTTOM",
        itemStartX,
        maxBounds.getBottom() - offset,
        itemStartX,
        maxBounds.getBottom() - offset - length
      ])
    }
    if (leftCheck.value) {
      paths.push([
        "LEFT",
        maxBounds.getLeft() - offset,
        itemEndY,
        maxBounds.getLeft() - offset - length,
        itemEndY
      ])
      paths.push([
        "LEFT",
        maxBounds.getLeft() - offset,
        itemStartY,
        maxBounds.getLeft() - offset - length,
        itemStartY
      ])
    }
  }
  if (multipleTargetMultiRadioCheckGroup.getSelectedRadioText() === "Recursive") {
    Collections.forEachItem(selection, action)
  } else {
    Collections.forEach(selection, action)
  }
  var distinctPaths = []
  Collections.forEach(paths, function(path) {
    if (!containsPathBounds(distinctPaths, path)) {
      distinctPaths.push(path)
    }
  })
  return Collections.map(distinctPaths, function(it) {
    return createTrimMark(weight, color, it[0], it[1], it[2], it[3], it[4])
  })
}

function containsPathBounds(collection, element) {
  var i = collection.length
  while (i--) {
    var _element = collection[i]
    if (isEqualRounded(_element[1], element[1]) &&
      isEqualRounded(_element[2], element[2]) &&
      isEqualRounded(_element[3], element[3]) &&
      isEqualRounded(_element[4], element[4])) {
      return true
    }
  }
  return false
}

function createTrimMark(weight, color, suffixName, fromX, fromY, toX, toY) {
  println("%d. From [%d, %d] to [%d, %d].", suffixName, fromX, fromY, toX, toY)
  var path = layer.pathItems.add()
  path.name = "Trim" + suffixName
  path.filled = false
  path.strokeDashes = []
  path.strokeColor = color
  path.strokeWidth = weight
  path.setEntirePath([[fromX, fromY], [toX, toY]])
  return path
}
