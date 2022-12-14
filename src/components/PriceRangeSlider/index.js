import { useState, useCallback, memo } from 'react';

import classNames from 'classnames/bind';
import styles from './PriceRangeSlider.module.scss';
import { useDebounce, useDidUpdate } from '~/hooks';

const cx = classNames.bind(styles);

function PriceRangeSlider({ min, max, onPriceChange, onResetPrice }) {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const [resetPrice, setResetPrice] = useState(false);

  console.log('re-render price range', resetPrice);

  onResetPrice.current = () => {
    setResetPrice(true);
  };

  const debouncedValueMin = useDebounce(minPrice, 500);
  const debouncedValueMax = useDebounce(maxPrice, 500);

  const calcPercent = useCallback(
    (value, rev = false) => {
      const deviant = max - min;
      if (!rev) {
        return ((value - min) * 100) / deviant;
      }
      return min + (deviant * value) / 100;
    },
    [min, max],
  );

  const style = {
    left: calcPercent(minPrice) + '%',
    width: calcPercent(maxPrice) - calcPercent(minPrice) + '%',
  };

  const handleInputMin = (e) => {
    const value = calcPercent(e.target.value, true);
    if (calcPercent(maxPrice) - e.target.value < 10) return;
    setMinPrice(value);
  };

  const handleInputMax = (e) => {
    const value = calcPercent(e.target.value, true);
    if (e.target.value - calcPercent(minPrice) < 10) return;
    setMaxPrice(value);
  };

  useDidUpdate(() => {
    if (!resetPrice) onPriceChange([debouncedValueMin, debouncedValueMax]);
    else setResetPrice(false);
  }, [debouncedValueMax, debouncedValueMin, onPriceChange]);

  useDidUpdate(() => {
    if (resetPrice) {
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [resetPrice]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('price_range')}>
        <span>Min</span>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number && number !== 0) {
              setMinPrice('');
            } else if (number >= min && number <= maxPrice) {
              setMinPrice(number);
            } else {
              setMinPrice(min);
            }
          }}
          onBlur={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number) setMinPrice(min);
          }}
        />
        <span>-</span>
        <span>Max</span>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number) {
              setMaxPrice('');
            } else if (number <= max && number >= minPrice) {
              setMaxPrice(number);
            } else {
              setMaxPrice(max);
            }
          }}
          onBlur={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number) setMaxPrice(max);
          }}
        />
      </div>
      <div className={cx('input_range')}>
        <div className={cx('slider-thumb')} style={style}></div>
        <input value={calcPercent(minPrice)} type="range" className={cx('slider')} onChange={handleInputMin} />
        <input value={calcPercent(maxPrice)} type="range" className={cx('slider')} onChange={handleInputMax} />
      </div>
    </div>
  );
}

export default memo(PriceRangeSlider);
