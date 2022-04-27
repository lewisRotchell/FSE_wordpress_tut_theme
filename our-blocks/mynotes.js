wp.blocks.registerBlockType("ourblocktheme/mynotes", {
  title: "my notes archive",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "my notes archive placeholder"
    );
  },
  save: function () {
    return null;
  },
});
