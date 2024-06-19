import { Link } from 'react-router-dom';

type IHomeLink = {
  imageWidth?: number;
  imageHeight?: number;
};

const HomeLink = ({ imageWidth = 1030, imageHeight = 3250 }: IHomeLink) => (
  <Link to="/" className="flex gap-3 items-center">
    <img
      src="/assets/images/logo.svg"
      alt="logo"
      width={imageWidth}
      height={imageHeight}
    />
  </Link>
);

export default HomeLink;
