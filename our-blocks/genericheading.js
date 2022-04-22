import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { RichText, BlockControls } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("ourblocktheme/genericheading", {
  title: "Generic Heading",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent({ attributes: { size, text }, setAttributes }) {
  function handleTextChange(e) {
    setAttributes({
      text: e,
    });
  }
  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={size === "large"}
            onClick={() => setAttributes({ size: "large" })}
          >
            Large
          </ToolbarButton>
          <ToolbarButton
            isPressed={size === "medium"}
            onClick={() => setAttributes({ size: "medium" })}
          >
            Medium
          </ToolbarButton>
          <ToolbarButton
            isPressed={size === "small"}
            onClick={() => setAttributes({ size: "small" })}
          >
            Small
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <RichText
        tagName="h1"
        className={`headline headline--${size}`}
        value={text}
        onChange={handleTextChange}
        allowedFormats={["core/bold", "core/italic"]}
      />
    </>
  );
}

function SaveComponent({ attributes: { size, text } }) {
  function createTagName() {
    switch (size) {
      case "large":
        return "h1";
      case "medium":
        return "h2";
      case "small":
        return "h3";
      default:
        return "h1";
    }
  }
  return (
    <RichText.Content
      tagName={createTagName()}
      value={text}
      className={`headline headline--${size}`}
    />
  );
}
