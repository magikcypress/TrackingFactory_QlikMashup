(async () => {


    await new Promise(r => setTimeout(r, 2000));

     /** Access to the App Model **/
     const embeddedObject = document.getElementById("qe1");
     const refApi = await embeddedObject.getRefApi();
     const doc = await refApi.getDoc();
     // For checking available Prototypes :
    //  console.log("Doc");
    //  console.log(doc);

     // 1. addbutton listener : ClearAll
     let clearButton = document.getElementById('clearAll');
     clearButton.addEventListener("click", function () {
         console.log("Clear the selections");
         doc.clearAll();
     });

     // 2. Current Selection
     let fillButton = document.getElementById('setTheTeam');
     fillButton.addEventListener("click", async function () {
         console.log("The selections are : ");
         let curSelectionsObject = await doc.getCurrentSelectionObject();
         let curSelections = await curSelectionsObject.getLayout();
         let selections = curSelections.qSelectionObject.qSelections;
         console.log(selections);
         for (let key in selections){
             if (selections[key]['qField']=='Work Shift'){
                 document.getElementById('shiftDrop').value = selections[key]['qSelected'];
             }
             else if (selections[key]['qField']=='Machine Name'){
                document.getElementById('machineDrop').value = selections[key]['qSelected'];
            }
         }
     });

    //Ask Delivery Automation
    let sendButton = document.getElementById('factoryTaskAssignment');
    sendButton.addEventListener("click", async function () {

     //retrieve values
    let machine= document.getElementById('machineDrop').value;
    let shift= document.getElementById('shiftDrop').value;
    let message= document.getElementById('messageInput').value;
    let priority= document.getElementById('priorityDrop').value;

     const res =  await fetch("runFactoryTaskAssignment", {
         method: 'POST'
         ,body: JSON.stringify({ "machine":machine, "shift":shift, "message":message, "priority":priority, 
         })
     }).then((response) =>
                 console.log(response.json())
         ); 
     });


})();