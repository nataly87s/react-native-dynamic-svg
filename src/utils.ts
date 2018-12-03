import {Attributes} from 'xml-js';

const toCamelCase = (str: string) => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

const removePixelsFromValue = (value: string) => value.replace('px', '');

export const transformStyle = (style: string) => {
    if (typeof style !== 'string') {
        return style;
    }

    const result: {[key: string]: any} = {};

    style.split(';').forEach(attr => {
        const [key, value] = attr.split(':');
        if (!key) {
            return;
        }
        result[toCamelCase(key)] = value && removePixelsFromValue(value);
    });

    return result;
};

export const transformAttributes = (attributes: Attributes = {}, key?: number) => {
    const result: {[key: string]: any} = {key};

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'xmlns') {
            return;
        }
        result[toCamelCase(key)] = typeof value === 'string' ? removePixelsFromValue(value) : value;
    });

    return result;
};
