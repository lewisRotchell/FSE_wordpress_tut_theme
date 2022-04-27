wp.blocks.registerBlockType("ourblocktheme/singleprofessor", {
  title: "Single professor",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "Single professor placeholder"
    );
  },
  save: function () {
    return null;
  },
});
