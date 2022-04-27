wp.blocks.registerBlockType("ourblocktheme/blogindex", {
  title: "Blog index",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "Blog index placeholder"
    );
  },
  save: function () {
    return null;
  },
});
