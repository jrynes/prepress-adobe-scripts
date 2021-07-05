/*
<javascriptresource>
<category>2</category>
</javascriptresource>
*/

#target Photoshop
#include '.lib/core.js'

var dialog = new Dialog('About', 'center')
dialog.image(undefined, getResource(R.png.logo))
dialog.staticText(undefined, 'Prepress Adobe Scripts for Photoshop')

dialog.setNegativeButton('Close')
dialog.setNeutralButton(20, 'Visit GitHub', function() {
    openURL('https://github.com/hendraanggrian/prepress-adobe-scripts')
})
dialog.show()