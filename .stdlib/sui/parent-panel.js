/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @param {String} text tips to display.
 */
Panel.prototype.tooltips = function(text) { Internals.setTooltips(this, text) }

/**
 * Add horizontal parent to group.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Group.prototype.hpanel = function(text, configuration) {
  return _panel(this, "row", text, configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Panel.prototype.hpanel = function(text, configuration) {
  return _panel(this, "row", text, configuration)
}

/**
 * Add vertical parent to group.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Group.prototype.vpanel = function(text, configuration) {
  return _panel(this, "column", text, configuration)
}

/**
 * Add vertical parent to panel.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Panel.prototype.vpanel = function(text, configuration) {
  return _panel(this, "column", text, configuration)
}

/**
 * Add stack parent to group.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Group.prototype.spanel = function(text, configuration) {
  return _panel(this, "stack", text, configuration)
}

/**
 * Add stack parent to panel.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Panel.prototype.spanel = function(text, configuration) {
  return _panel(this, "stack", text, configuration)
}

function _panel(root, orientation, text, configuration) {
  var parent = root.add("panel", undefined, text)
  parent.orientation = orientation
  if (root.helpTips !== undefined) {
    Internals.setTooltips(parent, root.helpTips)
  }
  if (text !== undefined) {
    // default margin is [15, 10, 15, 10], but this margin is unsufficient when title is present
    parent.margins = [15, 15, 15, 10]
  }
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}