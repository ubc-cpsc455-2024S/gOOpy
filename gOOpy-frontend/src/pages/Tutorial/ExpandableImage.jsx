import { EXPAND_STYLE } from './ExpandableVideo';

export default function ExpandableImage({ image }) {
    return <img src={image} className={EXPAND_STYLE + ' ' + 'w-3/5'} />;
}
