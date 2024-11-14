
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const AiKey = process.env.AI_KEY;
const AiUri = process.env.AI_URI;
const AiModel = process.env.AI_MODEL;

//=====  Generative call  ===============================================================

export default class qlikCallAI {

  constructor() { console.log('constructor . .. '); }

  async generatePrompt(userPrompt) {

    console.log('The prompt of the user : '+userPrompt);

    const promptAssistant =`
    You will be a natural language assitant which generate code that will be integrated in a web page.
    This code will represent charts, data vizualization or dashboard.
    The questions asked to you by the end users should be answered by one or multiple charts.
    If the question is not relevant regarding the instructions, simply answer "I don't understand, please rephrase your question."

      # Output
      Your output will be in 2 parts :
      ## First, A code created with the following structure where "analyticsAppId", "analyticsType", "analyticsDimension" and "analyticsMeasure" are the content you can modify.
    This code is generating a data visualization :

      <qlik-embed
        ui='analytics/chart'
        app-id='analyticsAppId'
        type='analyticsType'
        dimensions='["[analyticsDimension]"]'
        measures='["[analyticsMeasure]"]'
      >
      </qlik-embed>

    ### How to setup :
      - The minimum and maximum of single value for each analyticsDimension and analyticsMeasure are given in the chart descriptions below.
    - Multiple values for analyticsDimension and analyticsMeasure can be added depending on the chosen analyticsType. Each value must be placed within square brackets and double quotes as "[ ]" and separated by commas within the single quotes. For example:
    - Example with 1 value:	  dimensions='["[Machine Age]"]'
    - Example with 2 values:  measures='["[Avg Cycle Time]", "[N. Parts Produced]"]'
    - analyticsAppId is the identifier of the qlik application defining at the first prompt of the user

      Full Example :
      <qlik-embed
        ui='analytics/chart'
        app-id='96d75270-ebef-4e94-93c5-2f9ea68c3958'
        type='scatterplot'
        dimensions='["[Machine Name]"]'
        measures='["[N. Parts Produced],[N. Scrap Parts],[% Failure risk (Predictive maintenance)]"]'
      >
      </qlik-embed>

      ## Secondly, an explaination of your answer.
      This explanation must contain explanation on your choices about the dimensions, measures and charts.
      Do not include : The application id
      The user is the one given the question (at the end of this prompt) and not the full prompt.

      # How to setup the code :
      ## analyticsMeasure options
      Below the analyticsDimension. First row is the header. Value to use and instructions on how to use them are given :
      |Value to use             |When and how to use it                                                |Important Instruction 				   |
      |-------------------------|----------------------------------------------------------------------|-----------------------------------------|
      |Machine Name             |This is the way to identify a specific machine                        |										   |
      |Machine Age              |This is the age of the machines                                       |                                         |
      |Work Shift               |The shift of the team working 24 on 24                                |                                         |
      |Production Month Year    |The month and Year of the Production                                  |                                         |
      |Vendor                   |Vendors of the machine                                                |                                         |
      |Date Of Production       |The date of production (day).										 |Do not cross with Production Month Year  |

      ## analyticsMeasure options
      Below the table of analyticsMeasure. First row is the header. Value to use and instructions on how to use them are given :
      |Value to use                            |When and how to use it                                                                                                                                                                   |Units      |Important Instruction																 |
      |----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------|
      | % Scrap                                | This is the percentage of scrap for the whole production.                                                                                                                               | Percentage|                                                                                     |
      | N. Scrap Parts                         | This measure present the number of scrap. A scrap is a produced part with an issue.                                                                                                     | Integer   |                                                                                     |
      | N. Parts Produced                      | This is the number of Parts produced                                                                                                                                                    | Integer   |                                                                                     |
      | % Failure risk (Predictive maintenance)| The percentage risk of failure calulated by machine Learning. This is useful to identify risk on some machine.                       												   | Percentage| Never use this measure in a kpi. Mandatory to use with the dimension 'Machine Name' |


      ## Charts description
    Below the analyticsType for the analysis type allowed. First row is the header. Value to use and instructions on how to use them are given :
      |Value to use    |description                  |Minimum number of measure |Maximum number of measure      |Minimum number of dimension  |Maximum number of dimension|when to use it                                                                                                                                                                                                    |Important Instruction																 |
      |----------------|-----------------------------|--------------------------|-------------------------------|-----------------------------|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
      |barchart        |Bar chart                    |1                         |2 if only one dimension        |1                            |2 if only one dimension    |the bar chart is also useful when you want to compare values side by side, for example sales compared to forecast for different years, and when the measures are calculated using the same unit.                  |The measures' units must be the same with multiple measure                           |
      |boxplot         |Box plot                     |1                         |1                              |1                            |2                          |The box plot is suitable for comparing range and distribution for groups of numerical data.                                                                                                                       |                                                                                     |
      |distributionplot|Distribution plot            |1                         |1                              |1                            |2                          |The distribution plot is suitable for comparing range and distribution for groups of numerical data.                                                                                                              |                                                                                     |
      |linechart       |Line chart                   |1                         |4 if only one dimension        |1                            |2 if only one measure      |The line chart is primarily suitable when you want to visualize trends and movements over time, where the dimension values are evenly spaced, such as months, quarters, or fiscal years. 						   |The measures' units must be the same with multiple measure                           |
      |piechart        |Pie chart                    |1                         |1                              |1                            |1                          |The primary use of a pie chart is to compare a certain sector to the total.                                                                                                                                       |                                                                                     |
      |table           |Table                        |0                         |4                              |0                            |4                          |Use a table, when you want to view detailed data and precise values rather than visualizations of values. Tables are good when you want to compare individual values.                                             |                                                                                     |
      |treemap         |Treemap                      |1                         |1                              |1                            |2                          |Use a treemap when you have a large amount data that you need to get an overview of. Treemaps should primarily be used with values that can be aggregated.                                                        |                                                                                     |
      |scatterplot     |Scatter plot                 |2                         |3                              |1                            |1                          |The scatter plot helps you find potential relationships between values, and to find outliers in data sets. The scatter plot is useful when you want to show data where each instance has at least two metrics     |                                                                                     |
      |kpi             |Simple kpi without dimension |1                         |2                              |0                            |0                          |Use KPIs to get an overview of performance values without dimension                                                                                                                                               |                                                                                     |
      Note it is mandatory to propose charts with the right number of measures and dimensions

      # The application id is 96d75270-ebef-4e94-93c5-2f9ea68c3958
    ## Functional context
    The Qlik application contains data relative to the production in a factory. The users can be interested by following the production for each machines of the factory, the trend of the prodcution, the potential issues or scrap.
    However, we cannot anticipate all of their questions.
    Once the code produced the user is able to filter to focus on some data.
    You have not access to the data for security purpose. Propose to the user to explore and filter by himself.
    Help him to properly use charts to answer to their questions.
    If you have any ideas you can suggest to him some questions to continue their data exploration.
    `;

    var prompt2Send = promptAssistant+`
    # The question of the user to answer is :
    `+userPrompt;

    // console.log(prompt2Send);

      // send the promt
      try {
          const response = await fetch(`${AiUri}`, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${AiKey}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  model: `${AiModel}`,
                  messages: [{ role: 'user', content: prompt2Send }]
              })
          });

          const data = await response.json();
          console.log(data);
          const assistantResponse = data.choices[0].message.content;
          console.log(assistantResponse);

          // Extraire les balises qlik-embed et le texte explicatif
          const embedTags = assistantResponse.match(/<qlik-embed[\s\S]*?<\/qlik-embed>/g) || [];
          const explanatoryText = assistantResponse.replace(/<qlik-embed[\s\S]*?<\/qlik-embed>/g, '').trim();

          console.log(explanatoryText)
          console.log(embedTags)

          return { embedTags, explanatoryText }
      } catch (error) {
        console.error(`Erreur lors de l'appel à l'API d'IA: ${error.message}`);
        response.status(500).json({ error: 'Prompt generation Error.' });
      }
  };

  generateSimulatedPrompt(userPrompt) {
    // Traitement de la requête et génération du prompt

    console.log("simulation, here we don't use :"+userPrompt);

    //answer simulation
    try {
          const assistantResponse = `
          Voici la description de votre tableau de bord.
          <qlik-embed
              ui="analytics/chart"
              app-id="96d75270-ebef-4e94-93c5-2f9ea68c3958"
              type="kpi"
              dimensions='[]'
              measures='["[N. Parts Produced]", "[Avg Cycle Time]"]'
          ></qlik-embed>
          <qlik-embed
              ui="analytics/chart"
              app-id="96d75270-ebef-4e94-93c5-2f9ea68c3958"
              type="barchart"
              dimensions='["[Machine Name]"]'
              measures='["[% Scrap]"]'
          ></qlik-embed>
          <qlik-embed
              ui="analytics/chart"
              app-id="96d75270-ebef-4e94-93c5-2f9ea68c3958"
              type="linechart"
              dimensions='["Production Month Year"]'
              measures='["[N. Parts Produced]"]'
          ></qlik-embed>
          <qlik-embed
              ui="analytics/chart"
              app-id="96d75270-ebef-4e94-93c5-2f9ea68c3958"
              type="scatterplot"
              dimensions='["[Machine Name]"]'
              measures='["[Avg Cycle Time]", "[N. Parts Produced]"]'
          >
          </qlik-embed>


          Explication

          Types de visualisations : J'ai choisi plusieurs types de visualisations pour donner une vue d'ensemble de l'activité :
              Bar chart : Utilisé pour afficher le nombre de pièces produites et le pourcentage de rebut par rapport à l'année de production.
              Line chart : Utilisé pour analyser le temps de cycle moyen selon les équipes de travail.
              Pie chart : Permet d'afficher la part de chaque machine dans la production totale.
              Table : Fournit un tableau détaillé avec plusieurs dimensions et mesures, permettant de comparer l'âge des machines, le temps de cycle moyen, le pourcentage de rebut et le nombre de pièces produites.
          `;

          // Extraire les balises qlik-embed et le texte explicatif
          const embedTags = assistantResponse.match(/<qlik-embed[\s\S]*?<\/qlik-embed>/g) || [];
          const explanatoryText = assistantResponse.replace(/<qlik-embed[\s\S]*?<\/qlik-embed>/g, '').trim();

          return { embedTags, explanatoryText }

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la génération du prompt.' });
    }
  }
}

