import {drivhusint} from "./interface"
import 'bootstrap/dist/css/bootstrap.min.css';
let axios = require('axios') //npm i @types/node bliver brugt for at hente require

/*Drivhus Cont GET/GETALL
Alarm Cont GET+PUT(STATUS)*/
const UrlAlarm = "https://drivhus13.azurewebsites.net/api/AlarmData/"
const UrlDrivhus = "https://drivhus13.azurewebsites.net/api/drivhusdata/"

let table: HTMLTableElement = <HTMLTableElement>document.getElementById("drivtable")
let inputID = document.createElement("input") as HTMLInputElement
let inputTemp = document.createElement("input") as HTMLInputElement
let inputHumi = document.createElement("input") as HTMLInputElement
let inputWarrningtype = document.createElement("input") as HTMLInputElement
let inputStatus = document.createElement("input") as HTMLInputElement

let statusbtn = document.createElement("button") as HTMLButtonElement

inputID.placeholder ="DrivhusID"
inputTemp.placeholder="temp"
inputHumi.placeholder="humi"
inputWarrningtype.placeholder="Warning Type"
inputStatus.placeholder="Default Status"

statusbtn.textContent="Upload ny alarm"

document.body.appendChild(inputWarrningtype)
document.body.appendChild(inputStatus)

document.body.appendChild(statusbtn)

function alarmFunc(id:Number):any {
  axios.put(`${UrlAlarm}`+id,{

    id: id,
    status: status = String("Alarm")

   })
   .then(function (response) {
    //altid kørt
  })
  .catch(function (error) {
    // fejl
  console.log(error)
  });

 }

 function alarmFuncOK(id:Number):any {
  axios.put(`${UrlAlarm}`+id,{

    id: id,
    status: status = String("OK")

   })
   .then(function (response) {
    //altid kørt
  })
  .catch(function (error) {
    // fejl
  console.log(error)
  });

 }


axios.get(UrlDrivhus)
  .then(function (response : any){ 
     console.log(response);
     response.data.forEach(drivhus => {
         let row = document.createElement("tr");
         table.appendChild(row);

         let drivhus_id = document.createElement("td");
         let drivhus_temp = document.createElement("td");
         let drivhus_humi = document.createElement("td")
         let warningmsg = document.createElement("td")
         let statusmsg = document.createElement("td")
         let buttonthingy = document.createElement('td')
         let setStatusOK =document.createElement('button')

         
         setStatusOK.textContent = "Set"

         drivhus_id.innerText = drivhus.id
         drivhus_temp.innerText = drivhus.temp +" °"
         drivhus_humi.innerText = drivhus.humi +" %"
        
         row.appendChild(drivhus_id);
         row.appendChild(drivhus_temp);
         row.appendChild(drivhus_humi);
         //row.appendChild(statusbtn);

         

       

         if (drivhus.temp < 20  &&  drivhus.humi > 60 ) {
            axios.get(`${UrlAlarm}` + "11")
            .then(function(response){
                console.log(response)
              let alarm =  response.data as any;
              warningmsg.innerText = alarm[0].warningstype
              statusmsg.innerText =  "Alarm"
              alarmFunc(11)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(11)
            }
             
     
              row.appendChild(warningmsg)
              row.appendChild(statusmsg)
              row.appendChild(setStatusOK)
            })            
             
         }
         else if (drivhus.temp < 20  &&  drivhus.humi < 50 ) {
            axios.get(`${UrlAlarm}` + "10")
            .then(function(response){
                console.log(response)
              let alarm =  response.data as any;
              warningmsg.innerText = alarm[0].warningstype
              statusmsg.innerText =  "Alarm"
              alarmFunc(10)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(10)
            }
             
     
              row.appendChild(warningmsg)
              row.appendChild(statusmsg)
              row.appendChild(setStatusOK)
            })            
             
         }
         else if (drivhus.temp >60  &&  drivhus.humi < 50 ) {
            axios.get(`${UrlAlarm}` + "9")
            .then(function(response){
                console.log(response)
              let alarm =  response.data as any;
              warningmsg.innerText = alarm[0].warningstype
              statusmsg.innerText =  "Alarm"
              alarmFunc(9)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(9)
            }
             
     
              row.appendChild(warningmsg)
              row.appendChild(statusmsg)
              row.appendChild(setStatusOK)
            })            
             
         }
         else if (drivhus.temp >60  &&  drivhus.humi > 60 ) {
            axios.get(`${UrlAlarm}` + "8")
            .then(function(response){
                console.log(response)
              let alarm =  response.data as any;
              warningmsg.innerText = alarm[0].warningstype
              statusmsg.innerText =  "Alarm"
              alarmFunc(8)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(8)
            }
             
     
              row.appendChild(warningmsg)
              row.appendChild(statusmsg)
              row.appendChild(setStatusOK)
            })            
             
         }
         else if ( drivhus.temp < 20) {
            axios.get(`${UrlAlarm}` + "2")
            .then(function(response){
                console.log(response)
              let alarm =  response.data as any;
              warningmsg.innerText = alarm[0].warningstype
              statusmsg.innerText =  "Alarm"
              console.log(alarm)
              console.log(alarm.warningstype)
              console.log(alarm.status)
              console.log(warningmsg)
              console.log(statusmsg)
              alarmFunc(2)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(2)
            }
        
              row.appendChild(warningmsg)
              row.appendChild(statusmsg)
              row.appendChild(setStatusOK)
            })            
                
            }
        
        
            else if (drivhus.temp >60 ) {
               axios.get(`${UrlAlarm}`+ "1")
               .then(function(response){
                   console.log(response)
                 let alarm =  response.data as any;
                 warningmsg.innerText = alarm[0].warningstype
                 statusmsg.innerText =  "Alarm"
                 alarmFunc(1)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(1)
            }
                
        
                 row.appendChild(warningmsg)
                 row.appendChild(statusmsg)
                 row.appendChild(setStatusOK)
               })            
                
            }

            else if (drivhus.humi <40 ) {
                axios.get(`${UrlAlarm}` + "3")
                .then(function(response){
                    console.log(response)
                  let alarm =  response.data as any;
                  warningmsg.innerText = alarm[0].warningstype
                  statusmsg.innerText =  "Alarm"
                  alarmFunc(3)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(3)
            }
                 
         
                  row.appendChild(warningmsg)
                  row.appendChild(statusmsg)
                  row.appendChild(setStatusOK)
                })            
                 
             }

             else if (drivhus.humi >60 ) {
                axios.get(`${UrlAlarm}` + "4")
                .then(function(response){
                    console.log(response)
                  let alarm =  response.data as any;
                  warningmsg.innerText = alarm[0].warningstype
                  statusmsg.innerText =  "Alarm"
                  alarmFunc(4)
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(4)
            }
                 
         
                  row.appendChild(warningmsg)
                  row.appendChild(statusmsg)
                  row.appendChild(setStatusOK)
                })            
                 
             }
             else{
                 statusmsg.innerText = "OK",
                 row.appendChild(warningmsg)
                 row.appendChild(statusmsg)
             }            
        });        

    });
    statusbtn.onclick = () => {
      
      let Warningstype = String(inputWarrningtype.value)
      let Status = String(inputStatus.value)
      
      axios.post(UrlAlarm, {
        warningstype: Warningstype,
        status: Status
        
      })
      .then(function (response) {
        //altid kørt
      })
      .catch(function (error) {
        // fejl
      console.log(error)
      });
    }
