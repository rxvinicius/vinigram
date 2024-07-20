type PageHeaderProps = {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
};

const PageHeader = ({ title, imageSrc, imageAlt }: PageHeaderProps) => (
  <div className="flex-start gap-3 justify-start w-full max-w-5xl">
    {imageSrc && (
      <img
        src={imageSrc}
        alt={imageAlt}
        width={32}
        height={32}
        className="invert-white"
      />
    )}
    <h2 className="page-title">{title}</h2>
  </div>
);

export default PageHeader;
