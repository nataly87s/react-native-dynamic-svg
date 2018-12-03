import React, {Component} from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash/memoize';
import omit from 'lodash/omit';
import SvgString from './SvgString';
import {BaseSvgProps, baseSvgPropTypes} from './types';

export type SvgUriProps = BaseSvgProps & {
    uri: string;
}
type SvgUriState = {
    svgXmlData: string | null
}

const fetchSvgXmlData = memoize(async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    return await response.text();
});

export default class SvgUri extends Component<SvgUriProps, SvgUriState> {
    static propTypes = {
        ...baseSvgPropTypes,
        uri: PropTypes.string.isRequired,
    };

    state = {
        svgXmlData: null,
    };

    private _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        await this.loadSource();
    }

    async componentDidUpdate(prevProps: SvgUriProps) {
        if (prevProps.uri !== this.props.uri) {
            await this.loadSource();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async loadSource() {
        const {uri} = this.props;
        let svgXmlData: string | null = null;

        try {
            svgXmlData = await fetchSvgXmlData(uri);
        } catch (err) {
            console.error('Failed to fetch svg', err);
            svgXmlData = null;
        }

        if (!this._isMounted || uri !== this.props.uri) {
            return;
        }

        this.setState({svgXmlData});
    }

    render() {
        const {svgXmlData} = this.state;
        if (!svgXmlData) {
            return null;
        }

        return <SvgString svgXmlData={svgXmlData} {...omit(this.props, 'uri')}/>;
    }
}
