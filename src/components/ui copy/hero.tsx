import { HeroProps } from '../utils/types';

export default function Hero({ title, description, heroElement }: { title?: string, description?: string, heroElement: HeroProps['element'] }) {
  return (
    <div className='relative'>
      {heroElement}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center
">
        <h1 className="mx-auto text-white font-bold text-3xl mb-5">{title}</h1>
        <p className="mx-auto text-white font-light text-[16px] full-width max-w-[500px]">{description}</p>
      </div>
    </div>
  );
}
