import apiFetch from "@wordpress/api-fetch";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";

registerBlockType("ourblocktheme/slide", {
  title: "Slide",
  supports: {
    align: ["full"],
  },
  attributes: {
    themeimage: {
      type: "string",
    },
    align: {
      type: "string",
      default: "full",
    },
    imgID: {
      type: "number",
    },
    imgURL: { type: "string", default: banner.fallbackimage },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent({
  setAttributes,
  attributes: { imgID, imgURL, themeimage },
}) {
  useEffect(() => {
    if (imgID) {
      async function go() {
        const response = await apiFetch({
          path: `/wp/v2/media/${imgID}`,
          method: "GET",
        });
        setAttributes({
          themeimage: "",
          imgURL: response.media_details.sizes.pageBanner.source_url,
        });
      }
      go();
    }
  }, [imgID]);

  useEffect(() => {
    if (themeimage) {
      setAttributes({ imgURL: `${slide.themeimagepath}${themeimage}` });
    }
  }, []);

  const onFileSelect = (e) => {
    setAttributes({
      imgID: e.id,
    });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={imgID}
                render={({ open }) => {
                  return <Button onClick={open}> Choose Image</Button>;
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div
        className="hero-slider__slide"
        style={{
          backgroundImage: `url('${imgURL}')`,
        }}
      >
        <div className="hero-slider__interior container">
          <div className="hero-slider__overlay t-center">
            <InnerBlocks
              allowedBlocks={[
                "ourblocktheme/genericheading",
                "ourblocktheme/genericbutton",
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SaveComponent() {
  return <InnerBlocks.Content />;
}
