import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

import { cookies } from 'next/headers'

 // This function can be marked `async` if using `await` inside
export async function middleware(request,res) {
    console.log("middleware executed");
    
    const cookies = request.cookies.get('jwt')?.value;

    
    

    
    if(cookies === undefined)
    {
        console.log("No cookies");
        if(request.nextUrl.pathname === "/login") return;

        if(request.nextUrl.pathname ==="/register") return;

        return NextResponse.redirect(new URL('/login', request.url));

    }
    else{
        console.log("you have cookies");

        const dataToSend = { 
            cookie: cookies ,
            key2: 'value2'
          };
        const res = await fetch('http://localhost:8080/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(dataToSend),
            });
            if(res.ok)
            {
                
                const data = await res.json();

                console.log(data);
                
                console.log("is valid???????");
                console.log(data.status);
                if(request.nextUrl.pathname === "/login")
                {
                    if(data?.status === undefined || data.status === false)
                    {
                        return;
                    }
                    else{
                        //change it to profile
                        return NextResponse.redirect(new URL('/trip', request.url));
                
                    }
                }
                else if(request.nextUrl.pathname ==="/register")
                {
                    if(data?.status === undefined || data.status === false)
                    {
                        return;
                    }
                    else{
                        //change it to profile
                        return NextResponse.redirect(new URL('/trip', request.url));
                    }
                }
                else{

                    if(data?.status === undefined || data.status === false)
                    {
                        return NextResponse.redirect(new URL('/login', request.url));
                    }
                    else{
                        return;
                    }
                }

            }
            else{
                console.log("Response not ok");
                return NextResponse.redirect(new URL('/login', request.url));
            }
            
            


            

            
            
            

            console.log("path...");
            console.log(request.nextUrl.pathname);

            if(authClient)
            {
                //later trip will be profile

                return NextResponse.redirect(new URL('/trip', request.url))
            }

            return;

        
            

        
        console.log(cookies);

    }
    



  //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/trip",
    "/login",
    "/register",
    
    
  ],
}

//"/profile/:path*"