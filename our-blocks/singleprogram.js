wp.blocks.registerBlockType("ourblocktheme/singleprogram", {
  title: "single program",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "single program placeholder"
    );
  },
  save: function () {
    return null;
  },
});
