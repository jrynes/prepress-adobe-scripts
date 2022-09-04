// TODO: test string file

initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("image", function() {
  var child = root.image([100, 50], undefined, { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals("value", child.properties.key)
})
