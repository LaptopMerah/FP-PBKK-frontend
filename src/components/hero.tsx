'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className='container w-full items-center justify-center h-[90vh]'>
      <div className='grid place-items-center lg:max-w-screen-xl h-full self-center gap-8 mx-auto py-20 md:py-32'>
        <div className='text-center space-y-8'>
          <Badge variant='outline' className='text-sm py-2'>
            <span className='mr-2 text-primary'>
              <Badge>PBKK</Badge>
            </span>
            <span> Framework-based Programming </span>
          </Badge>

          <div className='max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold'>
            <h1>
              Experience the
              <span className='text-transparent px-2 bg-gradient-to-r from-[#F26B0F] to-primary bg-clip-text'>
                Event Management
              </span>
              landing page
            </h1>
          </div>

          <p className='max-w-screen-sm mx-auto text-xl text-muted-foreground'>
            Simplify the event search process with ease and professionalism. We
            are here to help you create unforgettable moments with our
            comprehensive and reliable event management solutions.
          </p>

          <div className='flex gap-4 items-center justify-center'>
            <Button className='w-5/6 md:w-1/4 font-bold group/arrow' asChild>
              <Link href='/event'>
                <ArrowLeft className='size-5 mr-2 group-hover/arrow:-translate-x-1 transition-transform' />
                See The Event
              </Link>
            </Button>

            <Button className='w-5/6 md:w-1/4 font-bold group/arrow' asChild>
              <Link href='/participant'>
                See The Participant
                <ArrowRight className='size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#F26B0F]/60 to-transparent z-[-1]'></div>
    </section>
  );
};
