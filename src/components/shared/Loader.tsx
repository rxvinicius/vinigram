type LoaderProps = {
  size?: 'small' | 'medium';
};

const getSize = {
  small: 20,
  medium: 24,
};

const Loader = ({ size = 'medium' }: LoaderProps) => (
  <div className="flex-center w-full">
    <img
      src="/assets/icons/loader.svg"
      alt="loader"
      width={getSize[size]}
      height={getSize[size]}
    />
  </div>
);

export default Loader;
