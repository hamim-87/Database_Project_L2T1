
import style from './profile.module.css';
import { Button } from "@/components/ui/button"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
  
  import { Label } from "@/components/ui/label"



  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  import { Input } from "@/components/ui/input"


function ProfileHeader(){
    return (
        <>
            <div className={style.main}>
                    <div className={style.username}>
                        Username:
                    </div>
                    <div className={style.importUser}>
                        
                        Hamim
                    </div>

                    
                    <div className={style.recharge}>
                    <AlertDialog>
                    
                        
                        <Button variant="ghost"><AlertDialogTrigger>Recharge</AlertDialogTrigger></Button>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Don't Have Enough Balance?</AlertDialogTitle>

                                <Tabs defaultValue="account" className="w-[400px]">
                                    <TabsList className="flex w-full">
                                        <TabsTrigger value="account" className="flex-1">Bank</TabsTrigger>
                                        <TabsTrigger value="password" className="flex-1">Mobile</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account">
                                        <Card>
                                        <CardHeader>
                                            <CardTitle>Account</CardTitle>
                                            <CardDescription>
                                            Recharge Your Card Using Your Bank Account.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                            <Label htmlFor="name">Account No:</Label>
                                            <Input id="name"  />
                                            </div>
                                            <div className="space-y-1">
                                            <Label htmlFor="username">Recharge Amount</Label>
                                            <Input id="username"  />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            
                                        </CardFooter>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="password">
                                        <Card>
                                        <CardHeader>
                                            <CardTitle>Mobile Banking</CardTitle>
                                            <CardDescription>
                                            Recharge Your Card Using Your Bkash/Nagad Number.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                            <Label htmlFor="current">Phone No</Label>
                                            <Input id="current" type="password" />
                                            </div>
                                            <div className="space-y-1">
                                            <Label htmlFor="new">Recharge Amount</Label>
                                            <Input id="new" type="password" />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            
                                        </CardFooter>
                                        </Card>
                                    </TabsContent>
                                    </Tabs>


                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>

                    </div>
                    
                    <div className={style.travel}>
                        
                        <Sheet>

                        <Button variant="ghost" ><SheetTrigger>Travel History</SheetTrigger></Button>
                        
                            <SheetContent>
                                <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                
                                <div>hehe</div>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>

                    </div>
            </div>

        </>
    );
}

export default ProfileHeader;



<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
  </Tooltip>
</TooltipProvider>
