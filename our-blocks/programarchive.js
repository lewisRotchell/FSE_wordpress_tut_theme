wp.blocks.registerBlockType("ourblocktheme/programarchive", {
  title: "program archive",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "program archive placeholder"
    );
  },
  save: function () {
    return null;
  },
});
