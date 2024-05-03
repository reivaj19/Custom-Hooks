import { useEffect, useState } from "react"

const localCache = {};

export const useFech = ( url ) => {

    const [state, setstate] = useState({
        data: null,
        isloading: true,
        hasError: false,
        error: null,
    });

    useEffect(() => {

      getFech();
    
      
    }, [url]);

    const setLoadingState = () => {

      setstate({
        data: null,
        isloading: true,
        hasError: false,
        error: null,
      });
    }

    const getFech = async() =>{
      if(localCache[url]){
        console.log('usando cache');
        setstate({
          data: localCache[url],
          isloading: false,
          hasError:false,
          error:null,
        });
        return;
      }
      setLoadingState();

      const resp = await fetch(url);

      await new Promise( resolve => setTimeout(resolve, 1500 ));

      if( !resp.ok ){
        setstate({
          data: null,
          isloading:false,
          hasError:true,
          error: {
            code: resp.status,
            message: resp.statusText,
          }
        });
        return;
      }

      const data = await resp.json();
      setstate({
        data:data,
        isloading:false,
        hasError:false,
        error:null,
      })
      

      localCache[url] = data;

    }
    

  return {

    data: state.data,
    isloading: state.isloading,
    hasError: state.hasError,
  }

}
