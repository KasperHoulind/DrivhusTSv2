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
let inputStatus = document.createElement("prut") as HTMLInputElement

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


//Her bliver der lavet 2 PUT funktioner, der ændre vores status til Alram i vores database
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
//Her bliver der lavet 2 PUT funktioner, der ændre vores status til OK i vores database

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

// vi starter med at hente det data vi skal bruge i vores dirvhis collums, altså de 3 første.
axios.get(UrlDrivhus)
  .then(function (response : any){ 
     console.log(response); // der bliver lavet en foreach løkke der hiver elementerne ud der kommer fra api kaldet
     response.data.forEach(drivhus => {
         let row = document.createElement("tr"); // der bliver lavet et table row til hver "sæt" data der kommer ind.
         table.appendChild(row);
         
         //der laves en collum til hvert element der kommer ind
         let drivhus_id = document.createElement("td");
         let drivhus_temp = document.createElement("td");
         let drivhus_humi = document.createElement("td")
         let warningmsg = document.createElement("td")
         let statusmsg = document.createElement("td")
         let buttonthingy = document.createElement('td') // bruges ikke, så den bliver aldrig lavet.
         let setStatusOK =document.createElement('button')

         
         setStatusOK.textContent = "Set"

         //de html elemernet der er defienret i i toppen bliver sat til at være lig de værdier der kommer fra vores api svar.
         drivhus_id.innerText = drivhus.id
         drivhus_temp.innerText = drivhus.temp +" °"
         drivhus_humi.innerText = drivhus.humi +" %"

         //daten bliver sat ind
         row.appendChild(drivhus_id);
         row.appendChild(drivhus_temp);
         row.appendChild(drivhus_humi);
         //row.appendChild(statusbtn);

         

       
            //her blivver de forskellige warrning beskder kladt. der startets med at sætte en condiotn op for hvornår den skal køres/kaldes whatever, det sker i if-statementen der bliver kaldt på const UrlAlarm + 11 fordi den pågældende alram har et id 11 i vores database
         if (drivhus.temp < 20  &&  drivhus.humi > 60 ) {
            axios.get(`${UrlAlarm}` + "11")
            .then(function(response){
                console.log(response)
              let alarm =  response.data as any;

              warningmsg.innerText = alarm[0].warningstype // sætter vores warning collum til at indholde den besked vi henter fra databasen
              statusmsg.innerText =  "Alarm" // når alarmen bliver aktiveret ændrede den teksten i vores status til Alram, dette sker kun "lokalt"
              alarmFunc(11)//her laver vi kaldet der ændre det i databasen

              //der bliver lavet en onclick func der gør at når der trykkes på vores status knap, vil teksten i status blive ændret til OK, og det samme sker i databasen.
              setStatusOK.onclick = () => {
                statusmsg.innerText ="OK"
                setStatusOK.hidden
                alarmFuncOK(11) //database put func.
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
