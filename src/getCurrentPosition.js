let appId = "122d64769961b0641fad88d5cba170b2";
navigator.geolocation.getCurrentPosition(success, error); 
let position = {};
function success(pos){
    
    position.latitude = pos.coords.latitude;
    position.longitude = pos.coords.longitude;
}
function error(){
    console.log('Error, coords undefined!!');
}
export default position;