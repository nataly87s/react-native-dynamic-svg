import PropTypes from 'prop-types';
import {ViewProps, ViewPropTypes} from 'react-native';

export type BaseSvgProps = ViewProps & {
    width?: number;
    height?: number;
};

export const baseSvgPropTypes = {
    ...ViewPropTypes,
    width: PropTypes.number,
    height: PropTypes.number,
};
