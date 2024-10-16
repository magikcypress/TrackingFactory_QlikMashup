(async () => {


    await new Promise(r => setTimeout(r, 2000));

     /** Access to the App Model **/
     const embeddedObject = document.getElementById("qeData");
     const refApi = await embeddedObject.getRefApi();
     const doc = await refApi.getDoc();
     // For checking available Prototypes :


     const obj = await refApi.getObject();

    //  let objLayout = await obj.getLayout();
    //  console.log("objLayout");
    //  console.log(objLayout);
    //  console.log(objLayout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
    //  console.log(objLayout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

    //Set Text with KPI
    let dText = document.getElementById('predictiveText');

    // For initial load
    objLayout = await obj.getLayout();
    let machine = objLayout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
    let value = objLayout.qHyperCube.qDataPages[0].qMatrix[0][1].qText;
    dText.innerHTML = 'On your current scope <span class="rounded" style="background-color:#F7C17B"> '+machine+' </span> has a <span class="rounded" style="background-color:#F7C17B"> '+value+' </span> risk of failure.';

    // Register an event listener for change events
    obj.on('changed', async () => {
        objLayout = await obj.getLayout();
        
        let machine = objLayout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
        let value = objLayout.qHyperCube.qDataPages[0].qMatrix[0][1].qText;
        dText.innerHTML = 'On your current scope <span class="rounded" style="background-color:#F7C17B"> '+machine+' </span> has a <span class="rounded" style="background-color:#F7C17B"> '+value+' </span> risk of failure.';
  
    });


})();