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

registerBlockType("ourblocktheme/banner", {
  title: "Banner",
  supports: {
    align: ["full"],
  },
  attributes: {
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

function EditComponent({ setAttributes, attributes: { imgID, imgURL } }) {
  useEffect(() => {
    if (imgID) {
      async function go() {
        const response = await apiFetch({
          path: `/wp/v2/media/${imgID}`,
          method: "GET",
        });
        setAttributes({
          imgURL: response.media_details.sizes.pageBanner.source_url,
        });
      }
      go();
    }
  }, [imgID]);

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
      <div className="page-banner">
        <div
          className="page-banner__bg-image"
          style={{
            backgroundImage: `url('${imgURL}')`,
          }}
        ></div>
        <div className="page-banner__content container t-center c-white">
          <InnerBlocks
            allowedBlocks={[
              "ourblocktheme/genericheading",
              "ourblocktheme/genericbutton",
            ]}
          />
        </div>
      </div>
    </>
  );
}

function SaveComponent() {
  return <InnerBlocks.Content />;
}
