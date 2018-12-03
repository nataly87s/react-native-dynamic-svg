import React from 'react';
import PropTypes from 'prop-types';
import {Image, ImageSourcePropType} from 'react-native';
import SvgUri from './SvgUri';
import SvgString from './SvgString';
import {BaseSvgProps, baseSvgPropTypes} from './types';

export type DynamicSvgProps = BaseSvgProps & {
    source?: ImageSourcePropType | null;
    svgXmlData?: string | null;
}

const imageSourcePropTypes = PropTypes.oneOfType([
    PropTypes.shape({
        uri: PropTypes.string,
        headers: PropTypes.objectOf(PropTypes.string),
    }),
    // Opaque type returned by require('./image.jpg')
    PropTypes.number,
]);

const DynamicSvg = ({source, svgXmlData, ...props}: DynamicSvgProps) => {
    if (svgXmlData) {
        return <SvgString svgXmlData={svgXmlData} {...props}/>;
    }
    if (source) {
        return <SvgUri uri={Image.resolveAssetSource(source).uri} {...props}/>;
    }
    return null;
};

DynamicSvg.propTypes = {
    ...baseSvgPropTypes,
    source: imageSourcePropTypes,
    svgXmlData: PropTypes.string,
};

export default DynamicSvg;
