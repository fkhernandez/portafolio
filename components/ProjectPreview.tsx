import Image from "next/image";
import type { Project } from "@/data/portfolio";

type ProjectPreviewProps = {
  project: Project;
  sizes?: string;
};

export function ProjectPreview({
  project,
  sizes = "(min-width: 1024px) 34rem, (min-width: 768px) 44vw, 90vw",
}: ProjectPreviewProps) {
  const mainImage = project.previewImages[0];
  const secondaryImage = project.previewImages[1];

  if (mainImage) {
    return (
      <div className={`preview preview-image ${secondaryImage ? "has-inset" : ""}`}>
        <div className="preview-image-frame">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            sizes={sizes}
            unoptimized
            className="preview-image-main"
          />

          {secondaryImage ? (
            <div className="preview-image-inset">
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                sizes="(min-width: 1024px) 12rem, 42vw"
                unoptimized
                className="preview-image-main"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`preview preview-${project.variant}`}
      role="img"
      aria-label={`${project.title} interface preview`}
    >
      <div className="preview-browser">
        <div className="preview-topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-grid">
          <div className="preview-sidebar" />
          <div className="preview-main">
            <div className="preview-line w-7/12" />
            <div className="preview-line w-10/12" />
            <div className="preview-line w-5/12" />
            <div className="preview-panels">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
