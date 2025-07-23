import { useEffect, useState } from "react";
import { useCallback } from "react";

async function sendHttpRequest(url, config) {
    // defining response
    const response = await fetch(url, config);
    // getting response data as they can include error messages
    const resData = await response.json() 
    // handling errors if response is not okay
    if (!response.ok) {
        throw new Error(
            resData.message || 'Oops something went wrong?'
        )
    }

    return resData;
}

export default function useHttp(url, config, initialData) {
    // using state to store/set data, loading status and errors
    const [ data, setData ] = useState(initialData);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();

    const sendRequest = useCallback(async function sendRequest() {
        // set loading state when async function starts
        setIsLoading(true);
        // begin a try catch to get the data
        try {
            // using the url and config data sent from origin to call the
            // above generic sendHttpRequest function
            // using await otherwise a promise is stored in resData until
            // it is resolved
            const resData = await sendHttpRequest(url, config)
            // setting the date state to the returned data
            setData(resData)
        } catch (error) {
            // setting the error state to the returned error if so
            setError(error.message || 'Oops something went wrong?');
        }
        // setting loading state back to false
        setIsLoading(false);
    // url and config set as dependencies as if they change from a different
    // component calling they will need different arguments to be sent to the
    // sendHttpRequest function
    }, [url, config]); 

    // useEffect here to call sendRequest straight away if the method is GET
    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config])

    // data returned, including a pointer to sendRequest so that it can be
    // called directly
    return {
        data,
        isLoading,
        error,
        sendRequest
    }
}