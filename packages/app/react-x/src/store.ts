import {atom, selector} from 'recoil';


export const fontSizeState = atom<number>({
    key: 'fontSizeState',
    default: 12,
});


export const fontSizeLabelState = selector<string>({
    key: 'fontSizeLabel',
    get: ({get}) => {
        const fontSize = get(fontSizeState);
        return `${fontSize}px`;
    }
});

