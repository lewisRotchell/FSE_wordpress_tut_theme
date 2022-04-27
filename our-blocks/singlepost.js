wp.blocks.registerBlockType("ourblocktheme/singlepost", {
  title: "Single post",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "Single post placeholder"
    );
  },
  save: function () {
    return null;
  },
});
