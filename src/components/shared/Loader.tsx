type LoaderProps = {
  size?: 'small' | undefined;
};

const Loader = ({ size }: LoaderProps) => {
  const getSize = size === 'small' ? 20 : 24;

  return (
    <div className="flex-center w-full">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={getSize}
        height={getSize}
      />
    </div>
  );
};

export default Loader;
