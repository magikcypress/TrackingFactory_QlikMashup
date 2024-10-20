(async () => {

    await new Promise(r => setTimeout(r, 2000));

     /** Access to the App Model **/
     const embeddedObject = document.getElementById("onthefly");
     const refApi = await embeddedObject.getRefApi();
     const doc = await refApi.getDoc();

     /** Access to the code example tag **/
     const codeExample = document.getElementById("ontheflyCode");

     //const doc = await refApi.getDoc();
     // For checking available Prototypes :
     // console.log("Doc");
     // console.log(doc);

     // 1. addbutton listener : ClearAll
     let clearButton = document.getElementById('clearAll');
     clearButton.addEventListener("click", function () {
         console.log("Clear the selections");
         doc.clearAll();
     });

    //2. On the fly chart
    //add the sheet references to a dropdown list
    let ddim = document.getElementById('dimDrop');
    let dmeasure = document.getElementById('measureDrop');
    let dchart = document.getElementById('chartDrop');

    //add a listener to change the object-id property in the qlik-embed element
    ddim.addEventListener("change", function() {
    if (ddim.selectedIndex > 0)
    {
        let selOption = ddim.options[ddim.selectedIndex];
        console.log(selOption.value);
        embeddedObject.setAttribute('dimensions', '["['+selOption.value+']"]');
        let code = embeddedObject.outerHTML.substring(1, embeddedObject.outerHTML.indexOf('>'));
        codeExample.innerHTML = '&lt;'+code+'&gt;&lt;/qlik-embed&gt;'
       //codeExample.innerHTML = code;
    }
    });

    //add a listener to change the object-id property in the qlik-embed element
    dmeasure.addEventListener("change", function() {
    if (dmeasure.selectedIndex > 0)
    {
        let selOption = dmeasure.options[dmeasure.selectedIndex];
        console.log(selOption.value);
        // temp='["['+selOption.value+']"]'
        embeddedObject.setAttribute('measures', '["['+selOption.value+']"]');
        let code = embeddedObject.outerHTML.substring(1, embeddedObject.outerHTML.indexOf('>'));
        codeExample.innerHTML = '&lt;'+code+'&gt;&lt;/qlik-embed&gt;'
    }
    });

    dchart.addEventListener("change", function() {
    if (dchart.selectedIndex > 0)
    {
        let selOption = dchart.options[dchart.selectedIndex];
        console.log(selOption.value);
        // temp='["['+selOption.value+']"]'
        embeddedObject.setAttribute('type', selOption.value);
        let code = embeddedObject.outerHTML.substring(1, embeddedObject.outerHTML.indexOf('>'));
        codeExample.innerHTML = '&lt;'+code+'&gt;&lt;/qlik-embed&gt;'
    }
    });


})();
