"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Zoom, Captions } from "yet-another-react-lightbox/plugins";

import { useState } from "react";

export default function LightboxWrapper({imageLinks=[]}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <Lightbox
      plugins={[Zoom, Captions]}
      open={open}
      index={index}
      captions={{ descriptionTextAlign: "center" }}
      carousel={{ preload: 3 }}
      controller={{ closeOnBackdropClick: true }}
      close={() => {}}
      slides={imageLinks}
    />
  );
}
