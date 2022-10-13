import { LazyLoadImage } from 'react-lazy-load-image-component';

import { productDefault } from '~/assets/images';

import styles from './ProductImage.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ProductImage({ imgSrc, className, ...propsOther }) {
  const handleError = (e) => {
    e.target.src = productDefault;
  };

  return (
    <div className={cx('wrapper', className)}>
      <LazyLoadImage
        alt={'product_image'}
        width={'100%'}
        src={imgSrc || productDefault}
        effect="blur"
        onError={handleError}
        {...propsOther}
      />
    </div>
  );
}

export default ProductImage;
