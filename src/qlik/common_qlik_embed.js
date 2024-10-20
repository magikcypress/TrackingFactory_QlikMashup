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

})();
