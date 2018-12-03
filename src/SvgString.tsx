import {Element, xml2js} from 'xml-js';
import memoize from 'lodash/memoize';
import omit from 'lodash/omit';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Svg,
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import {BaseSvgProps} from './types';
import {baseSvgPropTypes} from './types';
import {transformAttributes, transformStyle} from './utils';

export type SvgStringProps = BaseSvgProps & {
    svgXmlData: string;
}
type SvgStringState = {
    svgData: Element | null
}
const parseXml = memoize(xml2js);

export default class SvgString extends PureComponent<SvgStringProps, SvgStringState> {
    static propTypes = {
        ...baseSvgPropTypes,
        svgXmlData: PropTypes.string.isRequired,
    };

    static getDerivedStateFromProps({svgXmlData}: SvgStringProps) {
        return {
            svgData: parseXml(svgXmlData),
        };
    }

    state!: SvgStringState;

    renderElement = (element: Element, key?: number) => {
        const {attributes, name, elements = []} = element;
        const children = elements.map(this.renderElement);
        const props: any = transformAttributes(attributes, key);
        switch (name) {
            case 'svg':
                return (
                    <Svg {...props}
                         {...omit(this.props, 'svgXmlData')}
                         style={[transformStyle(props.style), this.props.style]}>
                        {children}
                    </Svg>
                );
            case 'circle':
                return (
                    <Circle {...props}>{children}</Circle>
                );
            case 'ellipse':
                return (
                    <Ellipse {...props}>{children}</Ellipse>
                );
            case 'g':
                return (
                    <G {...props}>{children}</G>
                );
            case 'text':
                return (
                    <Text {...props}>{children}</Text>
                );
            case 'tspan':
                return (
                    <TSpan {...props}>{children}</TSpan>
                );
            case 'textPath':
                return (
                    <TextPath {...props}>{children}</TextPath>
                );
            case 'path':
                return (
                    <Path {...props}>{children}</Path>
                );
            case 'polygon':
                return (
                    <Polygon {...props}>{children}</Polygon>
                );
            case 'polyline':
                return (
                    <Polyline {...props}>{children}</Polyline>
                );
            case 'line':
                return (
                    <Line {...props}>{children}</Line>
                );
            case 'rect':
                return (
                    <Rect {...props}>{children}</Rect>
                );
            case 'use':
                return (
                    <Use {...props}>{children}</Use>
                );
            case 'image':
                return (
                    <Image {...props}>{children}</Image>
                );
            case 'symbol':
                return (
                    <Symbol {...props}>{children}</Symbol>
                );
            case 'defs':
                return (
                    <Defs {...props}>{children}</Defs>
                );
            case 'linearGradient':
                return (
                    <LinearGradient {...props}>{children}</LinearGradient>
                );
            case 'radialGradient':
                return (
                    <RadialGradient {...props}>{children}</RadialGradient>
                );
            case 'stop':
                return (
                    <Stop {...props}>{children}</Stop>
                );
            case 'clipPath':
                return (
                    <ClipPath {...props}>{children}</ClipPath>
                );
            case 'pattern':
                return (
                    <Pattern {...props}>{children}</Pattern>
                );
            case 'mask':
                return (
                    <Mask {...props}>{children}</Mask>
                );
        }
        return null;
    };

    render() {
        const {svgData} = this.state;
        return svgData && this.renderElement(svgData);
    }
}