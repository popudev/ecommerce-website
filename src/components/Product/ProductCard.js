import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import 'react-lazy-load-image-component/src/effects/blur.css';

import config, { formatMoney } from '~/config';
import { addProductToCart } from '~/services/cartService';

import Button from '~/components/Button';
import ControlQuantity from '~/components/ControlQuantity';
import Skeleton from '~/components/Skeleton';

import ProductImage from '../ProductImage';

import styles from './ProductCard.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ProductCard({ data }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleClick = () => {
    addProductToCart({
      productId: data._id,
      quantity: quantity,
    });
  };

  const imgRef = useRef(null);

  return (
    <div className={cx('wrapper')}>
      <div ref={imgRef} className={cx('image')}>
        <Link to={`${config.routes.detail}/${data._id}`}>
          <ProductImage
            src={data.images}
            afterLoad={() => {
              imgRef.current?.classList.add(cx('doneload'));
            }}
          />
        </Link>

        <div className={cx('control', 'under-image')}>
          <ControlQuantity w50 onQuantityChange={handleQuantityChange} />
          <Button w50 hfull onClick={handleClick}>
            <i className="fa-solid fa-cart-plus"></i>
          </Button>
        </div>
      </div>

      <div className={cx('context')}>
        <p className={cx('title')}>{data.title}</p>
        <div className={cx('info')}>
          <span className={cx('price')}>{formatMoney(data.price)}</span>
          <span className={cx('sale')}>{formatMoney(data.sale)}</span>
        </div>
      </div>

      {/* <div className={cx('control')}>
        <ControlQuantity />
        <Button w50 hfull>
          <i className="fa-solid fa-cart-plus"></i>
        </Button>
      </div> */}
    </div>
  );
}

const Loading = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Skeleton width="100%" height="100%" />
      </div>
      <div className={cx('context_loading')}>
        <Skeleton count={2} width="100%" height={40} />
      </div>
    </div>
  );
};

ProductCard.Loading = Loading;

export default ProductCard;
