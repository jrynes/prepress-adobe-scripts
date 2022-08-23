/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Any number of radio buttons with their disability attached to left checkbox.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {String} text checkbox's text.
 * @param {Array} radioText radio buttons' texts.
 */
function MultiRadioCheckGroup(parent, text, radioTexts) {
  var self = this
  this.check, this.checkOnClick
  this.radios = []

  this.main = parent.hgroup(function(group) {
    self.check = group.checkBox(undefined, text).also(function(check) {
      check.onClick = function() {
        if (self.checkOnClick !== undefined) {
          self.checkOnClick()
        }
        for (var i = 0; i < radioTexts.length; i++) {
          self.radios[i].enabled = check.value
        }
      }
    })

    for (var i = 0; i < radioTexts.length; i++) {
      group.radioButton(undefined, radioTexts[i]).also(function(radio) {
        radio.enabled = false
        if (i === 0) {
          radio.select()
        }
        self.radios.push(radio)
      })
    }
  })

  /**
   * Returns true if checkbox is selected.
   * @returns {Boolean}
   */
  this.isSelected = function() {
    return self.check.value
  }

  /**
   * Returns selected radio button's text, will still return value if checkbox is not selected.
   * @returns {String}
   */
  this.getSelectedRadioText = function() {
    for (var i = 0; i < radioTexts.length; i++) {
      if (self.radios[i].value) {
        return self.radios[i].text
      }
    }
  }
}