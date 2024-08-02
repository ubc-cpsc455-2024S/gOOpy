export default function AboutLeftAligned({ image, title, text }) {
    return (
        <div className='flex flex-row justify-evenly flex-wrap sm:flex-nowrap pt-4 pl-4 pr-4 sm:pt-10 sm:pl-10 sm:pr-10 xl:pr-24 xl:pl-32'>
            <img src={image} className='h-[40%] w-[40%] min-w-48 rounded-3xl' />
            <div className='flex flex-col justify-evenly md:justify-center pt-4 sm:pt-0 sm:pl-10 xl:pl-20'>
                <h1 className='drop-shadow-xl sm:text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl  xl:text-6xl'>
                    {title}
                </h1>
                <p className='pt-2 sm:text-left'>{text}</p>
            </div>
        </div>
    );
}
