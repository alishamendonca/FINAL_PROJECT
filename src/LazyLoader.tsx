import { Suspense } from "react";

const LazyLoader=(Component:any)=>(props:any)=>
    ( <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
</Suspense>);
   


export default LazyLoader