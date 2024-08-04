export const EXPAND_STYLE =
    'mx-auto transition ease-in-out hover:translate-y-1 sm:hover:translate-y-6 md:hover:translate-y-10 lg:hover:translate-y-16 xl:hover:translate-y-24 hover:scale-150 delay-150 duration-300 shadow hover:shadow-2xl';
export default function ExpandableVideo({ source }) {
    return (
        <video
            className={EXPAND_STYLE}
            width='60%'
            muted
            onMouseOver={(event) => event.target.play()}
            onMouseOut={(event) => event.target.pause()}
            loop
            playsInline
            controls={false}
        >
            <source src={source} type='video/webm' />
        </video>
    );
}
