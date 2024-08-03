import InlineRoutingIcon from './InlineRoutingIcon';

const inlineIconSize = 'size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14 ';
const GOOPY_ORANGE_LOGO_PATH = '/home/Goopy_Logo_Orange.webm';

export default function MainBanner() {
    return (
        <div className='h-screen bg-sky-blue shadow-xl'>
            <div className='flex flex-row flex-wrap justify-evenly'>
                <div className=''>
                    <div className=''>
                        <h1
                            className='text-4xl drop-shadow-xl
sm:text-5xl sm:pt-20  md:text-6xl md:pt-24 lg:text-7xl lg:pt-24 xl:text-8xl xl:pt-32'
                        >
                            Welcome to:
                        </h1>
                        <h3 className='drop-shadow-xl text-lg sm:text-xl md:text-2xl  lg:text-3xl xl:text-4xl  '>
                            a ray marching 3D scene editor
                        </h3>
                        <video
                            className='text-center mx-auto sm:hidden mask-video'
                            width='45%'
                            muted
                            autoPlay
                            loop
                            playsInline
                            controls={false}
                        >
                            <source
                                src={GOOPY_ORANGE_LOGO_PATH}
                                type='video/webm'
                            />
                        </video>
                    </div>
                    <div className='grid grid-cols-1 justify-items-center pb-4 gap-3 sm:pt-5'>
                        <InlineRoutingIcon
                            icon={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className={inlineIconSize}
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10.5 3.798v5.02a3 3 0 0 1-.879 2.121l-2.377 2.377a9.845 9.845 0 0 1 5.091 1.013 8.315 8.315 0 0 0 5.713.636l.285-.071-3.954-3.955a3 3 0 0 1-.879-2.121v-5.02a23.614 23.614 0 0 0-3 0Zm4.5.138a.75.75 0 0 0 .093-1.495A24.837 24.837 0 0 0 12 2.25a25.048 25.048 0 0 0-3.093.191A.75.75 0 0 0 9 3.936v4.882a1.5 1.5 0 0 1-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0 1 15 8.818V3.936Z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            }
                            pagePath={'/editor'}
                            text={'Create'}
                        />

                        <InlineRoutingIcon
                            icon={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className={inlineIconSize}
                                >
                                    <path d='M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z' />
                                </svg>
                            }
                            pagePath={'/tutorial'}
                            text={'Tutorial'}
                        />
                        <InlineRoutingIcon
                            icon={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className={inlineIconSize}
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z'
                                        clipRule='evenodd'
                                    />
                                    <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z' />
                                </svg>
                            }
                            pagePath={'/user'}
                            text={'Users'}
                        />
                        <InlineRoutingIcon
                            icon={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className={inlineIconSize}
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            }
                            pagePath={'/login'}
                            text={'Login'}
                        />
                    </div>
                </div>
                <video
                    className='hidden sm:block justify-start mask-video'
                    width='40%'
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls={false}
                >
                    <source src={GOOPY_ORANGE_LOGO_PATH} type='video/webm' />
                </video>
            </div>
        </div>
    );
}
