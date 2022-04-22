import ourColors from "../inc/ourColors";
import { link } from "@wordpress/icons";
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  PanelRow,
  ColorPalette,
} from "@wordpress/components";
import {
  RichText,
  BlockControls,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
  getColorObjectByColorValue,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useState } from "@wordpress/element";

registerBlockType("ourblocktheme/genericbutton", {
  title: "Generic Button",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
    linkObject: {
      type: "object",
      default: { url: "" },
    },
    colorName: {
      type: "string",
      default: "blue",
    },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent({
  attributes: { size, text, linkObject, colorName },
  setAttributes,
}) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
  function handleTextChange(e) {
    setAttributes({
      text: e,
    });
  }
  const buttonHandler = () => {
    setIsLinkPickerVisible((prev) => !prev);
  };

  const handleLinkChange = (e) => {
    setAttributes({
      linkObject: e,
    });
  };

  const currentColorValue = ourColors.filter((color) => {
    return color.name === colorName;
  })[0].color;

  const handleColorChange = (e) => {
    const { name } = getColorObjectByColorValue(ourColors, e);
    setAttributes({
      colorName: name,
    });
  };

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>
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
      <InspectorControls>
        <PanelBody title="Color" initialOpen={true}>
          <PanelRow>
            <ColorPalette
              colors={ourColors}
              value={currentColorValue}
              onChange={handleColorChange}
              disableCustomColors={true}
              clearable={false}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <RichText
        tagName="a"
        className={`btn btn--${size} btn--${colorName}`}
        value={text}
        onChange={handleTextChange}
        allowedFormats={[]}
      />
      {isLinkPickerVisible && (
        <Popover
          position="middle center"
          onFocusOutside={() => setIsLinkPickerVisible(false)}
        >
          <LinkControl
            settings={[]}
            value={linkObject}
            onChange={handleLinkChange}
          />
          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  );
}

function SaveComponent({ attributes: { size, text, linkObject, colorName } }) {
  return (
    <a className={`btn btn--${size} btn--${colorName}`} href={linkObject.url}>
      {text}
    </a>
  );
}
