import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import { Button } from "@/components/ui/button"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  
import ProfileHeader from "@/components/profileheader/profileheader"

import HistoryCard from "../../components/historycard/historycard"

import BarChart from "../../components/barchart/barchart"

const data = [
  {
    "country": "AD",
    "Day1": 175,
    "Day1 Color": "hsl(250, 70%, 50%)",
    
  },
  {
    "country": "AE",
    "Day2": 184,
    "hot dogColor": "hsl(254, 70%, 50%)",
    
  },
  {
    "country": "AF",
    "Day3": 101,
    "hot dogColor": "hsl(256, 70%, 50%)",
    
  },
  {
    "country": "AI",
    "Day4": 198,
    "friesColor": "hsl(222, 70%, 50%)",
    
  },
  {
    "country": "AL",
    "Day5": 146,
    "donutColor": "hsl(122, 70%, 50%)"
  },
  {
    "country": "AM",
    "Day6": 32,
    "hot dogColor": "hsl(331, 70%, 50%)",
   
  },
  {
    "country": "AG",
    "Day7": 186,
    "hot dogColor": "hsl(170, 70%, 50%)",
    
  }
]

import style from "./test.module.css";
  
export default function homePage(){
    return(
        <>
          <div className={style.main}>
          <div>main test</div>
          

          <BarChart data = {data} />

          </div>
            
         

        </>
    );
}