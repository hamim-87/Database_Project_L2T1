import Image from "next/image";

import style from '@/app/home.module.css'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function Home() {
  return (
    <>
      <div className={style.header}>
            <div className={style.welcome}>Welcome to MetroInverse</div>
              
            <div className={style.subheader}>Your Convenient Metro Rail Ticketing Solution!</div>
            
      </div>

      <div className={style.bodypic}>
            <div className={style.sidebar}>
                Experience seamless travel with MetroInverse, your one-stop destination for hassle-free metro rail Journey. Whether you're a daily commuter or an occasional traveler, MetroInverse makes your journey effortless and efficient.
            </div>
            <div>
            <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {['1','2','3','4','5','6','7','8'].map((path) => (
          <CarouselItem key={path}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image src={`/${path}.jpg`} alt = 'metro' width='900' height='1200'/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
            </div>
      </div>
      
    </>
  );
}
