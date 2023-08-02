
const Config ={
    apikeyusers: import.meta.env.VITE_APP_USERS ,
    apikeycartitems: import.meta.env.VITE_APP_CARTITEMS,
    apikeyorders: import.meta.env.VITE_APP_ORDERS,
    // Rozarpay
    razorpaykey: import.meta.env.VITE_APP_RAZORPAY_KEY, 
   
    // firebase
    firebaseapikey : import.meta.env.VITE_APP_FIREBASE_APIKEY,
    firebaseauthdomain : import.meta.env.VITE_APP_FIREBASE_AUTHDOMAIN,
    firebaseprojectid : import.meta.env.VITE_APP_FIREBASE_PROJECTID,
    firebasestoragebucket: import.meta.env.VITE_APP_FIREBASE_STORAGEBUCKET,
    firebasemessagesenderid : import.meta.env.VITE_APP_FIREBASE_MESSAGINGSENDERID,
    firebaseappid: import.meta.env.VITE_APP_FIREBASE_APPID,
    firebasemeasurementid : import.meta.env.VITE_APP_FIREBASE_MEASUREMENTID
}; 

export default Config