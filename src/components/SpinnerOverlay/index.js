import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Spinner from '../Spinner';
import styles from './styles.scss';

export default function SpinnerOverlay({
  className,
}) {
  return (
    <div className={classnames(styles.root, className)} >
      <div className={styles.container} >
        <Spinner />
      </div>
    </div>
  );
}

SpinnerOverlay.propTypes = {
  className: PropTypes.string,
};

SpinnerOverlay.defaultProps = {
  className: undefined,
};