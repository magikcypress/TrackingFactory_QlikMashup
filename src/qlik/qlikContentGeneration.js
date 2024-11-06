import qlikCallAI from './qlikCallAI.js';

qlikInstance = new qlikCallAI();

  // ==============RealPrompt=========================
  //Ask for a content generation
  let sendPrompt = document.getElementById('generativeSubmit');
  sendPrompt.addEventListener("click", async function () {
      console.log('ask for generation');
      //retrieve values
      let userPrompt= document.getElementById('generativePrompt').value;
      console.log('userprompt is '+userPrompt);
      document.getElementById('loaderAI').style.display = "block";

      try{
          const response = await qlikInstance.generatePrompt(userPrompt);
          console.log(response)

          // Insert qlik-embed tags
          const embedsContainer = document.getElementById('generativeContainerId');
          embedsContainer.innerHTML = ''; // Clear previous results

          colClass = 'col-sm-12'
          document.getElementById('loaderAI').style.display = "none";
          response.embedTags.forEach((tag, index) => {
              const divElement = document.createElement('div');
              divElement.classList.add(colClass);
              const divEmbed = document.createElement('div');
              divEmbed.classList.add('qlik-embed-generate');
              divEmbed.classList.add('p-2');
              divEmbed.innerHTML = tag;
              const qe = divEmbed.getElementsByTagName('qlik-embed')[0];
              qe.setAttribute('id','qe'+index);
              divElement.appendChild(divEmbed);
              embedsContainer.appendChild(divElement);
          });

          const divElement = document.createElement('div');
          divElement.classList.add(colClass);
          const divEmbed = document.createElement('div');
          divEmbed.innerHTML = marked.parse(response.explanatoryText);
          divElement.appendChild(divEmbed);
          embedsContainer.appendChild(divElement);

      } catch (error) {
            console.error('Error:', error);
      }

  });


  // ==============Simulation=========================
  //Ask for a content generation
  let sendButton = document.getElementById('simulatedSubmit');
  sendButton.addEventListener("click", async function () {
      console.log('ask for generation');
      //retrieve values
      let userPrompt= document.getElementById('generativePrompt').value;
      console.log('userprompt is '+userPrompt);

      try{
          const response = await qlikInstance.generateSimulatedPrompt(userPrompt)

          // Insert qlik-embed tags
          const embedsContainer = document.getElementById('generativeContainerId');
          embedsContainer.innerHTML = ''; // Clear previous results

          response.embedTags.forEach((tag, index) => {
              const divElement = document.createElement('div');
              divElement.classList.add('col-sm-12');
              const divEmbed = document.createElement('div');
              divEmbed.classList.add('qlik-embed-generate');
              divEmbed.innerHTML = tag;
              console.log(divEmbed)
              const qe = divEmbed.getElementsByTagName('qlik-embed')[0];
              qe.setAttribute('id','qe'+index);
              console.log(qe);
              divElement.appendChild(divEmbed);
              embedsContainer.appendChild(divElement);
          });

          // add explanation
          const divElement = document.createElement('div');
          divElement.classList.add('col-sm-12');
          const divEmbed = document.createElement('div');
          divEmbed.classList.add('qlik-embed-home-main');
          divEmbed.innerHTML = marked.parse(response.explanatoryText);
          divElement.appendChild(divEmbed);
          embedsContainer.appendChild(divElement);

          //ask for analysis
          // const divRow = document.createElement('div');
          // divRow.classList.add('col-sm-12');
          // const divDataAnalysis = document.createElement('div');
          // divDataAnalysis.classList.add('qlik-embed-home-main');
          // const buttonAskDataAnalysis = document.createElement('button');
          // buttonAskDataAnalysis.classList.add('btn');
          // buttonAskDataAnalysis.classList.add('btn-primary');
          // buttonAskDataAnalysis.innerHTML = 'Send data for analysis';
          // buttonAskDataAnalysis.setAttribute('id','sendDataAnalysis');
          // divDataAnalysis.appendChild(buttonAskDataAnalysis);
          // divRow.appendChild(divDataAnalysis);
          // embedsContainer.appendChild(divRow);

          // let sendPrompt = document.getElementById('sendDataAnalysis');
          // sendPrompt.addEventListener("click", async function () {

          //     const dataExplanation = '';

          //     embedTags.forEach(async (tag, index) => {
          //         const embeddedObject = document.getElementById('qe'+index);
          //         const refApi = await embeddedObject.getRefApi();
          //         const obj = await refApi.getObject();
          //         const objLayout = await obj.getLayout();
          //         dataExplanation = dataExplanation+index` Dataset

          //         `+objLayout.qHyperCube+`

          //         `;
          //         console.log(dataExplanation);
          //     });
          // });


      } catch (error) {
            console.error('Error:', error);
      }

  });
