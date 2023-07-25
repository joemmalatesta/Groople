if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("../sw.ts").then(registration => {
        console.log("ServiceWorker Registered");
        console.log(registration)
    }).catch(error => {
        console.log(`ServiceWorker registration failed error: ${error}`)
    })
}