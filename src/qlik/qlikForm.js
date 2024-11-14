import qlikCallAutomation from './qlikAutomation.js';

const qlikAutomation = new qlikCallAutomation();

(async () => {
  await new Promise(r => setTimeout(r, 2000));

    /** Access to the App Model **/
    const embeddedObject = document.getElementById("qe1");
    const refApi = await embeddedObject.getRefApi();
    const doc = await refApi.getDoc();
    // For checking available Prototypes :
    //  console.log("Doc");
    console.log(doc);

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
      let priority= document.getElementById('priorityDrop').options[document.getElementById('priorityDrop').selectedIndex].text;
      let type= document.getElementById('typeDrop').options[document.getElementById('typeDrop').selectedIndex].text;

      //  Add Row in the table
      const taskTable = document.getElementById("tasksTableBody");
      // Create a new row element
      var newRow = document.createElement("tr");
      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");
      var cell5 = document.createElement("td");
      var spanType = document.createElement("span");
      var spanPriority = document.createElement("span");

      // Add text to cells
      cell1.innerHTML = message;
      cell2.innerHTML = machine;
      cell3.innerHTML = shift;

      spanPriority.innerHTML = priority;
      spanPriority.classList.add("badge");
      spanPriority.classList.add(document.getElementById('priorityDrop').value);
      cell4.appendChild(spanPriority);

      spanType.innerHTML = type;
      spanType.classList.add("badge");
      spanType.classList.add(document.getElementById('typeDrop').value);
      cell5.appendChild(spanType);

      // Add cells to row
      newRow.appendChild(cell1);
      newRow.appendChild(cell2);
      newRow.appendChild(cell3);
      newRow.appendChild(cell4);
      newRow.appendChild(cell5);

      // Add row to table
      taskTable.appendChild(newRow);
      taskTable.classList.add("table");
      taskTable.classList.add("table-striped");

      try  {
        await qlikAutomation.runFactoryTaskAssignment({ "machine":machine, "shift":shift, "message":message, "priority":priority });
      } catch (error) {
        console.error('Error:', error);
      }


    });

  }
)();
