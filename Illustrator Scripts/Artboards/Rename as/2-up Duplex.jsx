#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

new TwoUpDuplexPager(document).forEachArtboard(function() { })