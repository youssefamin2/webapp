//const baseURL="http://api.openweathermap.org/data/2.5weather?zip= "
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip='
const apikey='&appid=b5d53d063fb333f3dfba8e8be6f18cd0&units=metric'
const uidata=()=>{
    const zipcode=document.getElementById('zip').value
    const feeling=document.getElementById('feelings').value
    const date1=new Date();
    const date=`${date1.getMonth() + 1}/${date1.getDate()}/${date1.getFullYear()}`;
    return{zipcode,feeling,date}
}
const getTemparature=async(zipcode)=>{
    const res=await fetch(baseURL  + zipcode + apikey);
 const data= await res.json();
 const temp=data.main.temp;
 return temp
}
const toserver=async(temp,feeling,date)=>{
    await fetch('/savaData',{
        method:"POST",
        headers:{'content-Type':'application/json'}, 
        body: JSON.stringify({temp,feeling,date}) 
    })

}
const fromserver=async()=>{
    const res=await fetch('/getData')
const data=await res.json()
return data
}
const updatelabel=({temp,feeling,date})=>{
    document.getElementById("temp").innerHTML=temp
document.getElementById("date").innerHTML=date

document.getElementById("content").innerHTML=feeling

}


const performAction = async ()=>{
    try {
        //get zipcode and felling and get data
   const{zipcode,feeling,date}=uidata()
   //get temp by api

const temp=await getTemparature(zipcode)

//send temparature and feeling and date to backend
await toserver(temp,feeling,date)


//get data from backend
const data=await fromserver()
//updatelaabel
updatelabel(data)
        
    } catch (error) {
        console.log(error)
    }
    

 
}


document.getElementById('generate').addEventListener('click',performAction);

